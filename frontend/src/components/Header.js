import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img className='logo' src='./images/logo.png' alt='logo_image' />
        
      </NavLink>

      <h2 className='header-title'>Market</h2>
      <Nav/>

    </MainHeader>
  );
};

const MainHeader =styled.header`
   padding: 0 0.8rem;
   height: 10rem;
   background-color: ${({theme}) => theme.colors.bg};
   display: flex;
   justify-content: space-between;
   align-items:center;
   position:relative;

  .header-title{
    height:6rem;
    margin-left:-25rem;
    font-weight:bold;
    color: rgb(54, 156, 54);
  }
   .logo{
    height:8rem;
   }




`;


export default Header;