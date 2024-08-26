const mongoose = require('mongoose');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("express").Router();

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const Product = require("./models/product");
const Transaction = require("./models/transaction");

dotenv.config({ path: './config.env' });
require('./Db/conn');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to match your frontend's URL
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

// Bidding Logic
const activeBids = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinProductRoom", (productId) => {
    socket.join(productId);
  });

  socket.on("placeBid", async ({ productId, userId, bidAmount }) => {
    console.log("Bid received:", { productId, userId, bidAmount });

    try {
      // Convert productId to ObjectId if it's not already
      const objectId = new mongoose.Types.ObjectId(productId);

      // Initialize bid if it doesn't exist
      if (!activeBids[objectId]) {
        activeBids[objectId] = {
          highestBid: bidAmount,
          highestBidder: userId,
          timeout: setTimeout(async () => {
            // Handle transaction on timeout
            const product = await Product.findById(objectId);
            console.log("product detail",product);
            const transaction = new Transaction({
              buyerID: activeBids[objectId].highestBidder,
              sellerID: product.userID,
              productID: objectId,
              amount: activeBids[objectId].highestBid
            });

            await transaction.save();
            io.to(objectId).emit("biddingEnded", transaction);

            delete activeBids[objectId]; // Clean up the bid
          }, 10000)
        };
      } else {
        // Update bid if already exists
        clearTimeout(activeBids[objectId].timeout);
        activeBids[objectId].highestBid = bidAmount;
        activeBids[objectId].highestBidder = userId;
        activeBids[objectId].timeout = setTimeout(async () => {
          // Handle transaction on timeout
          const product = await Product.findById(objectId);
          const transaction = new Transaction({
            buyerID: activeBids[objectId].highestBidder,
            sellerID: product.userID,
            productID: objectId,
            amount: activeBids[objectId].highestBid
          });

          await transaction.save();
          io.to(objectId).emit("biddingEnded", transaction);

          delete activeBids[objectId]; // Clean up the bid
        }, 10000);
      }

      io.to(objectId).emit("newBid", {
        highestBid: activeBids[objectId].highestBid,
        highestBidder: activeBids[objectId].highestBidder
      });
    } catch (error) {
      console.error("Error handling bid:", error);
      io.to(socket.id).emit("bidError", "Failed to process the bid. Please try again.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Ensure socket leaves any joined rooms
    socket.rooms.forEach(room => {
      socket.leave(room);
    });
  });
});

server.listen(port, function () {
  console.log(`Listening to port at ${port}`);
});
