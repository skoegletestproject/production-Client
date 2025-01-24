import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import Layout from "./Layout/Layout";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <Layout>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f8f9fa"
    >
      <Typography variant="h3" color="textPrimary" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Redirecting to the Home Page...
      </Typography>
      <CircularProgress sx={{ marginTop: 2 }} />
    </Box>
    </Layout>
  );
};

export default NotFoundPage;
