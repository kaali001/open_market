<h1 align="center">🛍️ open_market</h1>

  ![image](https://github.com/user-attachments/assets/bf0163ac-0f3b-4d4e-bf2d-c2a94e7c787b)

## About the Project
**open_martket** is an online bidding platform where users can bid on products in real-time. It provides an engaging auction experience with a beautiful and modern user interface, responsive across all devices. The platform supports user authentication, OTP verification, and secure payment handling through Razorpay.

The system is built to manage real-time updates, including live bidding, countdown timers, and transaction handling upon a successful bid. With an admin dashboard for managing users, transactions, and other key statistics, U-Mart offers both users and admins a robust marketplace experience.

---

## Features

- 🔒 **Secure Authentication**: Includes signup with OTP verification and a password reset option.
- ⏳ **Real-time Bidding**: Users can place live bids on products, with a countdown timer for each auction.
- 📦 **Product Listings**: Display detailed product information like images, descriptions, categories, and stock availability.
- 📊 **Admin Dashboard**: A full-featured admin panel to manage users, transactions, and other platform activities.
- 🖼️ **Responsive UI**: Designed using React.js and styled-components, the platform is fully responsive.
- 💳 **Payment Gateway**: Integrated Razorpay payment gateway to add user balance for bidding.
- 📬 **Email Integration**: Emails for OTP verification, bid status, and password resets.

---

## Tech Stack

- **Frontend**: React.js, Styled-components, WebSocket (for real-time bidding updates)
- **Backend**: Node.js, Express.js, MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt, and OTP verification via NodeMailer
- **Payments**: Razorpay API for handling balance management
- **Real-time Communication**: Socket.IO for live updates during bidding
- **Deployment**: Docker for containerization, CI/CD with GitHub Actions

---

## Project Structure

```bash
U-Mart/
├── backend/               # Node.js backend
│   ├── config/            # Configuration files (MongoDB, Razorpay, etc.)
│   ├── controllers/       # API logic for handling requests
│   ├── models/            # Mongoose schemas for data models
│   ├── routes/            # API route definitions
│   └── utils/             # Utility functions
├── frontend/              # React.js frontend
│   ├── components/        # Reusable UI components
│   ├── pages/             # Pages like ProductList, SingleProduct, Profile, etc.
│   ├── services/          # API handlers & WebSocket services
│   └── styles/            # Global and component-specific styles
└── README.md              # Project documentation
```

# 🛠️ Getting Started
To get started with U-Mart locally, follow these steps.

## Prerequisites
Node.js: v14 or higher
MongoDB: Local or cloud instance (e.g., MongoDB Atlas)
Razorpay Account: For handling payments


# Installation

1. Clone the Repository

   ```
        git clone https://github.com/kaali001/open_market.git
        cd open_market
   ```
   
3. Backend Setup

   -  Navigate to the backend directory:

      ```
       cd backend
      ```

   -  Install the dependencies:

       ```
       npm install
       ```

   -  Create a .env file in the backend directory as given in `backend/example.env` and provide all credentials:

      ```
       MONGO_URI=your-mongodb-connection-string
       JWT_SECRET=your-jwt-secret
       RAZORPAY_API_KEY=your-razorpay-api-key
       RAZORPAY_API_SECRET=your-razorpay-api-secret

      ```

   -  Start the backend server:

      ```
       npm run dev
      ```

5. Frontend Setup

    - Navigate to the frontend directory:

      ```
       npm start

      ```
    
    - Install dependencies:

      ```
       cd frontend

      ```
    
    - Create a .env file in the frontend directory and add:

      ```
       REACT_APP_API_URL=http://localhost:5000


      ```
    
    - Start the React development server:

      ```
       npm start

      ```

# 📚 API Documentation
 ## User API
   - POST /api/auth/signup: Register a new user with OTP verification.
   - POST /api/auth/login: Authenticate a user and receive a token.
   - POST /api/auth/forgot-password: Request password reset.

 ## Bidding API
   - POST /api/products/bid: Place a bid on a product.
   - GET /api/products/:id: Get product and current bidding details.
    
 ## Admin API
   - GET /api/admin/dashboard: Retrieve platform stats and graphs.
   - GET /api/admin/users: Manage users.
   - GET /api/admin/transactions: View transaction records.


# 📋 Features in Future Releases
  - Seller Dashboard: Add a delivery system to directly sell the products at doorstep.
  - Outbid Notifications: Notify users when their bid has been outbid.
  - AI-powered Recommendations: Suggest products based on user preferences.


# 🤝 Contributions

We welcome contributions! Please follow these steps:

 - Fork the project.
 - Create your feature branch: (git checkout -b feature/new-feature)
 - Commit your changes: (git commit -m 'Add new feature')
 - Push to the branch: (git push origin feature/new-feature)
 - Open a pull request.


