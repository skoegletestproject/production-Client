import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStore } from '../Store/Store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from 'react-toastify';

export default function Login() {
  const { login,setisAdmin,setisLogin } = useStore();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    devicedetails: 'Not', // Device details
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get device details on component mount
 
  useEffect(() => {
    const getDeviceDetails = async () => {
      try {
        // Get geolocation coordinates
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Get battery status
            const battery = await navigator.getBattery();
            const batteryLevel = (battery.level * 100).toFixed(0); // Battery percentage

            // Get browser information
            const browserInfo = navigator.userAgent;
            const deviceInfo = {
              isMobile: /Mobi|Android/i.test(browserInfo),
              isDesktop: !/Mobi|Android/i.test(browserInfo),
              browser: browserInfo.match(/(Chrome|Firefox|Safari|Edge)/i) ? RegExp.$1 : "Unknown",
              deviceDetails: `${navigator.platform} - ${navigator.userAgent}`,
            };

            // Fetch address using OpenCageData API
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`);
            const data = await response.json();

            const address = data.results && data.results[0] ? data.results[0].formatted : 'Address not found';

            // Fetch IP address using ipify API
            const ipResponse = await fetch('https://api.ipify.org/?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            // Construct the device details
            const devicedetails = `{lat:${latitude}, long:${longitude}, currentBattery:${batteryLevel}%, browser:${deviceInfo.browser}, device:${deviceInfo.deviceDetails}, ip:${ipAddress}, address:${address}}`;

            // Update form data with device details
            setFormData((prevState) => ({
              ...prevState,
              devicedetails: devicedetails,
            }));
          },
          (error) => {
            console.error("Error getting geolocation: ", error);
            toast.error("Error getting device location");
          }
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error("Error fetching device details");
      }
    };

    getDeviceDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    if (!formData.devicedetails) tempErrors.devicedetails = 'Device details are required'; // Validate device details

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {

        const response = await login(formData);

        if (response && response?.valid) {
          // console.log(response)
          setisLogin(response?.valid)
          setisAdmin(response?.isAdmin)
          localStorage.setItem("isAdmin",response?.isAdmin)
          localStorage.setItem("isLogin",response?.valid)
          localStorage.setItem('token', response.token);

          toast.success('Login successful!');

         setTimeout(() => {
            navigate('/'); // Redirect to home page
          }, 2000);
        } else {
          toast.error('Invalid credentials. Please try again.');
        }
      } catch (error) {
        toast.error('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <h1>Login</h1>

      <TextField
        label="Email"
        name="email"
        variant="outlined"
        type="email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Device Details"
        name="devicedetails"
        variant="outlined"
        fullWidth
        value={formData.devicedetails}
        onChange={handleChange}
        disabled
        style={{display:"none"}}
        error={!!errors.devicedetails}
        helperText={errors.devicedetails}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? 'Submitting...' : 'Login'}
      </Button>
    </Box>
  );
}
