import React, { useState } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment, CircularProgress, Typography, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStore } from '../Store/Store';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { toast } from 'react-toastify';

export default function Signup() {
  const { signup } = useStore();
  const navigate = useNavigate();  // Initialize useNavigate
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone number is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    if (!formData.confirmPassword) tempErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        // Call signup API function
        const response = await signup(formData);

        if (response?.valid) {
          // Show success message
          toast.success(`User registered successfully with Email: ${response.message}`);

          // Redirect to Login page after 2 seconds
          setTimeout(() => {
            navigate('/login');  // Use navigate instead of history.push
          }, 2000);
        }
      } catch (error) {
        toast.error('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f1f1f1', // Light background color
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1877f2', marginBottom: 2 }}>
        GeoCam
        </Typography>

        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          sx={{ marginBottom: 2 }}
        />
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
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          type="tel"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
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
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPassword} edge="end">
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            marginTop: 2,
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#1877f2',
            '&:hover': { backgroundColor: '#155c8a' },
          }}
        >
          {loading ? 'Submitting...' : 'Sign Up'}
        </Button>

        {/* <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#1877f2' }}>
            <a href="/login">Already have an account? Login here</a>
          </Typography>
        </Box> */}
      </Paper>
    </Box>
  );
}
