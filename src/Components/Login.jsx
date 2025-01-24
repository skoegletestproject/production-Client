import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment, CircularProgress, Typography, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStore } from '../Store/Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const { login, setisAdmin, setisLogin } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    devicedetails: 'Not',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getDeviceDetails = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const battery = await navigator.getBattery();
            const batteryLevel = (battery.level * 100).toFixed(0);
            const browserInfo = navigator.userAgent;
            const deviceInfo = `${navigator.platform} - ${browserInfo}`;
            const ipResponse = await fetch('https://api.ipify.org/?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            const devicedetails = `Latitude: ${latitude}, Longitude: ${longitude}, Battery: ${batteryLevel}%, IP: ${ipAddress}, Device: ${deviceInfo}`;
            setFormData((prevState) => ({
              ...prevState,
              devicedetails,
            }));
          },
          (error) => {
            console.error("Error getting geolocation: ", error);
            toast.error("Unable to fetch location");
          }
        );
      } catch (error) {
        console.error("Error fetching device details: ", error);
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
    const tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const response = await login(formData);

        if (response?.valid) {
          setisLogin(response.valid);
          setisAdmin(response.isAdmin);
          localStorage.setItem("isAdmin", response.isAdmin);
          localStorage.setItem("isLogin", response.valid);
          localStorage.setItem("token", response.token);

          toast.success('Welcome back!');
          window.location.reload()
          setTimeout(() => {
            
            navigate('/');
          }, 2000);
        } else {
          toast.error('Invalid email or password.');
        }
      } catch (error) {
        toast.error('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        backgroundColor: '#f4f6f8',
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 420,
          padding: 4,
          borderRadius: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: 3,
            color: '#333',
          }}
        >
          Welcome Back
        </Typography>

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ marginBottom: 2 }}
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
                <IconButton onClick={handleTogglePassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            padding: 1.5,
            fontSize: '1rem',
            backgroundColor: '#00796b',
            '&:hover': { backgroundColor: '#004d40' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>

        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: 'center',
            color: '#555',
          }}
        >
          Forgot your password?{' '}
          <a href="/#" style={{ color: '#00796b', textDecoration: 'none' }}>
            Reset it here
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
