import axios from "axios"
const BASE_URL = 'http://localhost:12000/api/auth';


export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error.response?.data || error.message);
    throw error;
  }
};


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials, {
    withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};


export const verifyUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/verif?token=${localStorage?.getItem("token")}`,{
      withCredentials:true
    });
    return response.data;
    
  } catch (error) {
    console.error('Error during user verification:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/logout?token=${localStorage.getItem("token")}`,{
      withCredentials:true
    });
    return response.data;
    localStorage.clear()
  } catch (error) {
    console.error('Error during logout:', error.response?.data || error.message);
    throw error;
  }
};
