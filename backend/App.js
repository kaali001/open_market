
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("express").Router();

const userRoutes = require("./routes/users");
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
    methods: ["GET", "POST","HEAD","PUT","PATCH","DELETE"]
  }
});

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);

// Bidding Logic
const activeBids = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinProductRoom", async (productId) => {
    socket.join(productId);
    
    // Send the current bid status to the newly joined client
    if (activeBids[productId]) {
      const timeLeft = Math.max(activeBids[productId].endTime - Date.now(), 0);
      socket.emit("newBid", {
        highestBid: activeBids[productId].highestBid,
        highestBidder: activeBids[productId].highestBidder,
        remainingTime: timeLeft,
        createdAt: activeBids[productId].createdAt
      });
    }
  });

  socket.on("placeBid", async ({ productId, userId, bidAmount }) => {
    console.log("Bid received:", { productId, userId, bidAmount });

    const product = await Product.findById(productId);

    if (!product) {
      return socket.emit("error", "Product not found");
    }

    const currentTime = new Date();

    // Initialize bid if it doesn't exist
    if (!activeBids[productId]) {
      if (bidAmount <= product.price) {
        return socket.emit("error", "Bid amount must be higher than the starting price.");
      }

      activeBids[productId] = {
        highestBid: bidAmount,
        highestBidder: userId,
        createdAt: currentTime, 
        endTime: Date.now() + 120000, 
        timeout: setTimeout(async () => {
          await processBiddingEnd(productId, product.userID);
        }, 120000)
      };
    } else {
      // Validate that the new bid is higher than the current highest bid
      if (bidAmount <= activeBids[productId].highestBid) {
        return socket.emit("error", "Bid amount must be higher than the current highest bid.");
      }

      // Updating the bid and reset the timer
      clearTimeout(activeBids[productId].timeout);
      activeBids[productId].highestBid = bidAmount;
      activeBids[productId].highestBidder = userId;
      activeBids[productId].createdAt = currentTime; 
      activeBids[productId].endTime = Date.now() + 120000; 
      activeBids[productId].timeout = setTimeout(async () => {
        await processBiddingEnd(productId, product.userID);
      }, 120000);
    }


    const timeLeft = Math.max(activeBids[productId].endTime - Date.now(), 0);


    // Broadcasting the new bid to all clients in the room
    io.to(productId).emit("newBid", {
      highestBid: activeBids[productId].highestBid,
      highestBidder: activeBids[productId].highestBidder,
      remainingTime: timeLeft,
      createdAt: activeBids[productId].createdAt 
   
    });
  });

  const processBiddingEnd = async (productId, sellerId) => {
    const transaction = new Transaction({
      buyerID: activeBids[productId].highestBidder,
      sellerID: sellerId,
      productID: productId,
      amount: activeBids[productId].highestBid
    });

    await transaction.save();
    io.to(productId).emit("biddingEnded", transaction);

    delete activeBids[productId];
  };

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
