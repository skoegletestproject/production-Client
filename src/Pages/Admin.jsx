import { useEffect, useState } from "react";
import AdminProfile from "../Components/AdminProfile";
import { useStore } from "../Store/Store";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
  Box,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Admin() {
  const [swapsession, setSwapsession] = useState("profile");
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { fetchDevicesByCustomerId, deleteDeviceByDeviceString, fetchCustomers, deleteCustomer, AddUser } = useStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    custommerId: localStorage.getItem("custommerid"), // Assuming the customerId is stored in localStorage
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state

  useEffect(() => {
    async function fetchDevices() {
      setLoading(true);
      try {
        const result = await fetchDevicesByCustomerId();
        setDevices(result || []);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDevices();
  }, [fetchDevicesByCustomerId]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const result = await fetchCustomers();
        setUsers(result || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [fetchCustomers]);

  const handleSessionChange = (event, newValue) => {
    setLoading(true);
    setTimeout(() => {
      setSwapsession(newValue);
      setLoading(false);
    }, 2000);
  };

  const handleDeleteDevice = async (deviceString) => {
    setLoading(true);
    try {
      const deletedDevice = await deleteDeviceByDeviceString(deviceString);
      if (deletedDevice) {
        setDevices(devices.filter(device => device.deviceString !== deviceString));
        setSnackbarMessage("Device deleted successfully!");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Failed to delete device!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Error deleting device!");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (customerId) => {
    setLoading(true);
    try {
      const deletedUser = await deleteCustomer(customerId);
      if (deletedUser) {
        setUsers(users.filter(user => user.customerId !== customerId));
        setSnackbarMessage("User deleted successfully!");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Failed to delete user!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Error deleting user!");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format";
    if (!/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    setIsSubmitting(true);
    if (!validateForm()) {
      setSnackbarMessage("Please fix the validation errors.");
      setOpenSnackbar(true);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await AddUser(formData);
      if (response?.valid === false) {
        setSnackbarMessage(response.message || "Failed to add user!");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("User added successfully under the same customer ID!");
        setOpenSnackbar(true);
        // Optionally, reset the form or update the users list here
      }
    } catch (error) {
      setSnackbarMessage("Error adding user!");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    position: "relative",
  };

  const renderDeviceDetails = () => (
    <Grid container spacing={3}>
      {devices.map((device) => (
        <Grid item xs={12} sm={6} md={4} key={device._id}>
          <Card variant="outlined" sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                Device ID: {device.deviceString}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Customer ID: {device.custommerId}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Email: {device.email}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Details: {device.devicedetails}
              </Typography>
            </CardContent>
            <IconButton onClick={() => handleDeleteDevice(device.deviceString)} sx={{ position: "absolute", top: 10, right: 10, color: "#d32f2f" }}>
              <DeleteIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderUsers = () => (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={10} key={user._id}>
          <Card variant="outlined" sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                Name: {user.firstName + " " + user.lastName}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Email: {user.email}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Password: {user.password}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                Customer ID: {user.custommerId}
              </Typography>
            </CardContent>
            <IconButton onClick={() => handleDeleteUser(user.custommerId)} sx={{ position: "absolute", top: 10, right: 10, color: "#d32f2f" }}>
              <DeleteIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderAddUserForm = () => (
    <Box sx={{ marginTop: "20px", maxWidth: 500, margin: "auto", borderRadius: 2, boxShadow: 2, padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
        <img
          src="https://www.w3schools.com/w3images/avatar2.png" // Replace with a dynamic image URL if needed
          alt="profile"
          style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #1976d2" }}
        />
      </Box>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        name="firstName"
        value={formData.firstName}
        onChange={handleFormChange}
        sx={{ marginBottom: "10px" }}
        error={!!formErrors.firstName}
        helperText={formErrors.firstName}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        name="lastName"
        value={formData.lastName}
        onChange={handleFormChange}
        sx={{ marginBottom: "10px" }}
        error={!!formErrors.lastName}
        helperText={formErrors.lastName}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleFormChange}
        sx={{ marginBottom: "10px" }}
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleFormChange}
        sx={{ marginBottom: "10px" }}
        error={!!formErrors.phoneNumber}
        helperText={formErrors.phoneNumber}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        name="password"
        value={formData.password}
        onChange={handleFormChange}
        sx={{ marginBottom: "10px" }}
        error={!!formErrors.password}
        helperText={formErrors.password}
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleFormChange}
        sx={{ marginBottom: "20px" }}
        error={!!formErrors.confirmPassword}
        helperText={formErrors.confirmPassword}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddUser}
        disabled={isSubmitting}
        sx={{ padding: "10px", fontWeight: "bold", borderRadius: 3 }}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Add User"}
      </Button>
    </Box>
  );

  return (
    <div style={{ padding: "20px" }}>
      <Tabs value={swapsession}  onChange={handleSessionChange} variant="scrollable" scrollButtons="auto" aria-label="session tabs" >
        <Tab label="Login Devices" value="checkyourdevices" />
        <Tab label="Profile" value="profile" />
        <Tab label="User Management" value="usermanagement" />
        <Tab label="Add User" value="adduser" />
      </Tabs>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <IconButton onClick={() => handleSessionChange(null, "checkyourdevices")}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={() => handleSessionChange(null, "adduser")}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      {swapsession === "checkyourdevices" && renderDeviceDetails()}
      {swapsession === "profile" && <AdminProfile />}
      {swapsession === "usermanagement" && renderUsers()}
      {swapsession === "adduser" && renderAddUserForm()}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
