
const config = {
    backendUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://open-market-server.vercel.app/'
        : 'https://open-market-server.vercel.app',
  };
  
  export default config;
  