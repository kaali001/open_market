import React from "react";

// this gives the functionality for routes.
import { BrowserRouter,Routes,Route } from "react-router-dom";

// importing routes for our each pages.
import Home from "./Home";
import About from "./About";
// import Products from "./Products";
import SingleProduct from "./SingleProduct"; 
import Contact from "./Contact";
import Login from "./Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Signup from "./Signup";
import OtpComponent from "./components/Otp";
import ErrorPage from "./ErrorPage";
import Voov from "./Voov";
import ProductForm from "./ProductForm";
// importing our global defined style
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import UserProfilePage from "./UserProfile";
import Admin from "./AdminPage";
import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {

  const user = localStorage.getItem("token")  //taking data saved in localStorage
  
  

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      green:"rgb(54, 156, 54)",
      black: "#212529",
      helper: "#8490ff",
      bg: "#131921",
      nav:"#131921",
      services:"#37475A",
      trusted:"#232f3e",
      footer_bg: "#131A22",
      
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };


  return (
    
    <ThemeProvider theme={theme}>  {/* so that every component can be able to use common theme */}

      <BrowserRouter>
        <GlobalStyle />
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Voov />} />
          {user&&<Route path="/product-form" element={<ProductForm/>} />}
          {user&&<Route path="/user-profile" element={<UserProfilePage/>} />}
        
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          
          <Route path="/aboutproduct/:id" element={<SingleProduct />} /> {/*// shows the product details page. */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpComponent/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
