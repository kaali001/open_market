
const config = {
    backendUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://open-market-server.onrender.com'
        : 'http://localhost:5000',
  };
  
  export default config;
  