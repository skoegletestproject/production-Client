import axios from 'axios';


const BASE_URL = `http://localhost:12000/api/user/profile?token=${localStorage?.getItem("token")}`;


export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(BASE_URL,{
        withCredentials:true
    });
    console.log('User Profile:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};


export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(BASE_URL, profileData);
    console.log('Updated Profile:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error.response?.data || error.message);
    throw error;
  }
};

