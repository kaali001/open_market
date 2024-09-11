import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/check-auth', { withCredentials: true });

        setAuthenticated(response.data.authenticated);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        setAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, []);

  return { authenticated, isAdmin, loading }; 
};

export default useAuth;
