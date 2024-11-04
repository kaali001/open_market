import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import { Button } from '../styles/Button';
import useAuth from '../hooks/useAuth';
import config from '../config';

const Nav = styled.nav`
  .navbar-lists {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
    padding: 0 2rem;
    overflow: hidden;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.white};
        transition: color 0.3s linear;
      }
      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  .profile-pic-container { 
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
      border: 2px solid green;  
    }

    .profile-popup { 
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      display: none;
      flex-direction: column;
      width: 10rem;
    }

    &:hover .profile-popup {
      display: flex;
    }

    .popup-item {
      padding: 10px;
      text-align: center;
      font-size: 1.2rem;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.colors.helper};
        color: #fff;
      }
    }
  }

  /* Toggle button */
  .toggle-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
    z-index: 1000; /* Ensure it is above other elements */

    .toggle-icon {
      color: ${({ theme }) => theme.colors.white};

    }
  }
    

  /* Cart icon styling */
  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      height: 3.5rem;
    }

    .cart-total--item {
      width: 1.4rem;
      height: 1.4rem;
      font-size:1rem;
      position: absolute;
      background-color: ${({ theme }) => theme.colors.helper};
      color: #fff;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -10%;
      left: 60%;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .toggle-btn {
      display: inline-block;
      z-index: 9999;

      .toggle-icon {
        font-size: 3.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }
    .active .toggle-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 10%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }
    .active .close-outline {
      display: inline-block;
    }

    .navbar-lists {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.95); /* Slightly transparent */
      font-size: 2.5rem;
      color: black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      transition: transform 0.3s ease, visibility 0.3s ease;
    }

    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      .navbar-link {
        font-size: 3.2rem;
        color: black;
      }
    }
  }
`;
const Navbar = () => {
  const { authenticated, isAdmin } = useAuth();
  const [menuIcon, setMenuIcon] = useState(false); 
  const navigate = useNavigate(); 
  const isLoggedin = window.localStorage.getItem("isLoggedIn");

  const logoutUser = () => {
    window.localStorage.clear();
    navigate("/"); 
  };

  const adminLogoutUser = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        window.localStorage.clear();
        navigate("/"); 
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Nav>
      <div className={menuIcon ? 'navbar active' : 'navbar'}>
        <ul className='navbar-lists'>
          <li>
            <NavLink to="/" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>About</NavLink>
          </li>
          <li>
            <NavLink to="/products" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>Products</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <img className='cart-trolley' src='/images/cart.png' alt='cart' />
              <span className='cart-total--item'>0</span>
            </NavLink>
          </li>

          {isLoggedin === "true" ? (
            <li className='profile-pic-container'>
              <img src='/images/avatar.svg' alt='Profile' />
              <div className='profile-popup'>
                <div className='popup-item' onClick={() => {
                    authenticated && isAdmin ? (navigate('/admin')) : (
                    navigate('/user-profile'))}
                  }>Account</div>
                <div className='popup-item' onClick={() => {
                  if (authenticated && isAdmin) {
                    adminLogoutUser();
                  } else {
                    logoutUser();
                  }
                }}>Logout</div>
              </div>
            </li>
          ) : (
            <li>
              <NavLink to={"/login"}>
                <Button>Login</Button>
              </NavLink>
            </li>
          )}
        </ul>
        <div className='toggle-btn'>
          {menuIcon ? (
            <img
              className="toggle-icon close-outline"
              src="/images/cross.png"
              onClick={() => setMenuIcon(false)}
              alt="Close"
            />
          ) : (
            <img
              className="toggle-icon"
              src="/images/toggle.png"
              onClick={() => setMenuIcon(true)}
              alt="Menu"
            />
          )}
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
