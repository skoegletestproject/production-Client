import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Footor from "./Footor";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./Menu";

export default function Layout({ children, titlename }) {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true); // State to control loading screen

  useEffect(() => {
    // API Call
    const fetchData = async () => {
      try {
        const response = await fetch("https://production-server-we1m.onrender.com/ping");
        const data = await response.json();
        if (data.message) {
          setLoading(false); // Hide flash screen after successful API response
        }
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false); // Hide flash screen even if API fails
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile or tablet screen
    };

    handleResize(); // Check size on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  };

  const layoutContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    marginTop: "60px", // Offset for fixed Navbar
    marginBottom: isMobile ? "60px" : "0", // Offset for fixed Menu on mobile
  };

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  };

  const menuStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  };

  const footorStyle = {
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "10px 0",
    width: "100%",
    marginTop: "auto",
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#1a73e8",
          color: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Skoegle
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <div style={layoutContainerStyle}>
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <ToastContainer />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{titlename}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <main style={layoutContentStyle}>{children}</main>
      {isMobile ? (
        <div style={menuStyle}>
          <Menu />
        </div>
      ) : (
        <Footor style={footorStyle} />
      )}
    </div>
  );
}
