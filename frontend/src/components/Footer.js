

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { FaDiscord, FaInstagram,FaRoute,FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
const Footer = () => {
  return (
    <>
      <Wrapper>
        
        {/* footer section */}

        <footer>
          <div className="container grid grid-three-column">

            <div className="footer-about">
               <div class="col-lg-3 col-md-6">
                    <h3 class="mb-4">Get In Touch</h3>
                    <p className="footer-about-p"><FaRoute className="icon"/>123 Street, Raibareli,India</p>
                    <p className="footer-about-p"><FaPhoneAlt className="icon"/>    +9182365236</p>
                    <p className="footer-about-p"><BsEnvelope className="icon"/>    info@openmarket.com</p>
                </div>
            </div>

            <div className="footer-subscribe">
               <div class="col-lg-3 col-md-6">
                    <h3 class="mb-4">Quick Links</h3>
                    <NavLink to="/about"> <p className="footer-about-p">About us</p></NavLink>
                    <NavLink to="/contact"> <p className="footer-about-p">Contact us</p></NavLink>
                    <NavLink to="/services"> <p className="footer-about-p">Our Services</p></NavLink>
                    <NavLink to="/terms&condition"> <p className="footer-about-p">Terms & condition</p></NavLink>
                   
                </div>
            </div>

            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="footer-social--icons">
                <div>
                  <FaDiscord className="icons" />
                </div>
                <div>
                  <FaInstagram className="icons" />
                </div>
                <div>
                  
                    <FaYoutube className="icons" />
                  
                </div>
              </div>
            </div>

            
        </div>

          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-two-column ">
              <p>
                @{new Date().getFullYear()}Open Market. All Rights Reserved
              </p>
              <div>
                <p>Made with ❤ by Satyendra </p>
               
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};



const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 6rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }

    .footer-about .icon{
        margin-right:2rem;
    }
    .footer-about-p{
        margin-bottom:2rem;
        margin-left:1rem;
        text-decoration:underline;
    }

  }

  .footer-bottom--section {
    padding-top: 9rem;

    height:2rem;
    

    hr {
      margin-bottom: 3rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 2rem;
    }
  }
`;

export default Footer;