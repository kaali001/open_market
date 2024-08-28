

import HeroSection from './components/HeroSection';
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import Footer from './components/Footer';

const Home = () => {

    const data ={
        name:"Welcome to The Open Market",
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