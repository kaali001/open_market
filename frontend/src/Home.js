

import HeroSection from './components/HeroSection';
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import Footer from './components/Footer';

const Home = () => {

    const data ={
        name:"Bid Smart, Sell Fast: Your Auction Destination on Open Market",
    };
  return (
        <>
         <HeroSection myData={data}/>
         <Services />
         <Trusted />
         <Footer/>
        </>
  

  );
};

// const Wrapper = styled.section`
//     height: 100vh;
//     background-color: ${({ theme }) => theme.colors.bg};
    
// `;
export default Home;