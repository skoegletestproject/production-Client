import Layout from "../Layout/Layout";
import { useStore } from "../Store/Store";

export default function Admin() {
  const {
    fetchUserProfile,
    updateUserProfile,
    fetchDevicesByCustomerId,
    deleteDeviceByDeviceString,
    addDevicesToCustomer, 
    deleteMultipleDevices,
    AddUser,
    deleteCustomer,
    fetchCustomers
} = useStore();

  return (
    <Layout>
      <h1>admin</h1>
    </Layout>
  );
}
