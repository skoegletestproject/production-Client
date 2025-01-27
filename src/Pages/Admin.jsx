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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon

export default function Admin() {
  const [swapsession, setSwapsession] = useState("checkyourdevices");
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message state
  const { fetchDevicesByCustomerId, deleteDeviceByDeviceString } = useStore();

  useEffect(() => {
    async function fetchDevices() {
      setLoading(true); // Start loading before the API request
      try {
        const result = await fetchDevicesByCustomerId();
        setDevices(result || []);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false); // Stop loading once API request completes
      }
    }
    fetchDevices();
  }, [fetchDevicesByCustomerId]);

  const handleSessionChange = (event, newValue) => {
    setLoading(true); // Start loading when session is being changed
    setTimeout(() => {
      setSwapsession(newValue);
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  };

  const handleDeleteDevice = async (deviceString) => {
    setLoading(true); // Show loader before deletion request
    try {
      const deletedDevice = await deleteDeviceByDeviceString(deviceString);
      if (deletedDevice) {
        setDevices(devices.filter(device => device.deviceString !== deviceString)); // Remove deleted device from state
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
      setLoading(false); // Stop loader after response
    }
  };

  const renderDeviceDetails = () => {
    return (
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device._id}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                position: "relative",
              }}
            >
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

              {/* Delete Button */}
              <IconButton
                onClick={() => handleDeleteDevice(device.deviceString)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "#d32f2f",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderProfile = () => {
    return <AdminProfile />;
  };

  return (
    <div style={{ padding: "20px" }}>
     {/* Show loader for API requests */}
      {/* {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (  */}
        <>
          {/* Tabs for session switching */}
          <Tabs
            value={swapsession}
            onChange={handleSessionChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="session tabs"
          >
            <Tab label="Check Your Devices" value="checkyourdevices" />
            <Tab label="Profile" value="profile" />
            {/* Add more tabs here in the future */}
          </Tabs>

          {swapsession === "checkyourdevices" && renderDeviceDetails()}
          {swapsession === "profile" && renderProfile()}
        </>
      {/* )} */}

      {/* Snackbar for showing delete message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
