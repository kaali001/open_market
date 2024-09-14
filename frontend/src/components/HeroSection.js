import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = ({ myData }) => {
  const { name } = myData;
  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
           
            <h2>{name}</h2>
            <p>
              Open Market is a leading online bidding platform where buyers and sellers connect
              in real-time auctions. Whether you're looking to find a great deal or sell
              your unique items to a competitive audience, Open Market offers a seamless and
              secure environment to place your bids. Explore various categories, bid on
              your favorite products, and experience the excitement of winning your next
              great purchase. Join us and be a part of the bidding revolution.
            </p>

            <NavLink to="/products">
              <Button>Explore Now</Button>
            </NavLink>
          </div>

          {/* Home page image */}
          <div className="hero-section-image">
            <figure>
              <img src="./images/pngegg.png" className="img-style" alt="Bidding Platform" />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;
  background-image: url("./images/bckg-img.jpg");
  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
      font-size: 1.2rem;
      color: #007bff;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }

  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection;
