import axios  from "axios";

const BASE_URL = 'http://localhost:12000';

const baseURL = "http://localhost:12000/api";

//divece token collection
export async function fetchDevicesByCustomerId(custommerId) {
  try {
    const response = await axios.get(`${BASE_URL}/api/devices/users/admin/custommer/${custommerId}`);
    console.log('Fetched Devices:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error.response?.data || error.message);
  }
}

export async function deleteDeviceByDeviceString(deviceString) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/devices/users/admin/custommer/${deviceString}`);
    console.log('Deleted Device:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting device:', error.response?.data || error.message);
  }
}


//physicalusers devices
export async function deleteMultipleDevices(custommerId, devices) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/user/devices/deleteuser/${custommerId}`, {
      headers: { 'Content-Type': 'application/json' },
      data: { devices },
    });
    console.log('Deleted Multiple Devices:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting multiple devices:', error.response?.data || error.message);
  }
}
export async function addDevicesToCustomer(custommerId, devices) {
    try {
      const response = await axios.put(`${BASE_URL}/api/user/devices/addDevices/${custommerId}`, { devices }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Added Devices:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding devices:', error.response?.data || error.message);
    }
  }
  
export async function AddUser(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Signed Up User:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error.response?.data || error.message);
  }
}



export const fetchCustomers = async (custommerId) => {
    try {
      const response = await axios.get(`${baseURL}/devices/users/admin/custommer/${custommerId}`);
      console.log("Fetched customers:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error.response?.data || error.message);
      throw error;
    }
  };



  export const deleteCustomer = async (custommerId) => {
    try {
      const response = await axios.delete(`${baseURL}/device/admin/custommer/${custommerId}`);
      console.log("Deleted customer:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting customer:", error.response?.data || error.message);
      throw error;
    }
  };
  