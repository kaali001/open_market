import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Header = () => {
  return (
    <MainHeader>

      <div className='brand-content'>
        <NavLink to="/">
          <img className='logo' src='./images/logo.png' alt='logo_image' />
        </NavLink>
        <h2 className='header-title'>Market</h2>
      </div>

      <Nav/>
      
    </MainHeader>
  );
};

const MainHeader =styled.header`
   padding: 0 0 0 0.2rem;
   height: 8rem;
   background-color: ${({theme}) => theme.colors.nav};
   display: flex;
   justify-content: space-between;
   align-items:center;
  //  position:fixed;
  //  width:100vh;


   .brand-content{
    display: flex;
    //  padding: 0 50px 0 1px;
   }
  .header-title{
    height:6rem;
    // margin-left:-45rem;
    position:relative;
    font-weight:bold;
    color: white;
  }
   .logo{
    height:6rem;
   }




`;


export default Header;