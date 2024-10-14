
const config = {
    backendUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://api.yourproductiondomain.com'
        : 'http://localhost:5000',
  };
  
  export default config;
  