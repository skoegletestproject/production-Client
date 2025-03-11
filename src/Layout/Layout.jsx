import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Footor from "./Footor"; // Assuming "Footer" is misspelled
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./Menu";

export default function Layout({ children, titlename }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check size on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh", 
        backgroundColor: "#f1f1f1" 
      }}
    >
      {/* ✅ Navbar (Fixed at Top) */}
      <Box 
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "#00796b",
        }}
      >
        <Navbar />
      </Box>

      {/* ✅ Helmet (SEO) */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{titlename}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {/* ✅ Toast Notifications */}
      <ToastContainer />

      {/* ✅ Main Content */}
      <Box 
        component="main" 
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          mt: "60px",
          mb: isMobile ? "60px" : "0",
        }}
      >
        {children}
      </Box>

      {/* ✅ Footer (Desktop) & Menu (Mobile) */}
      {isMobile ? (
        <Box 
          sx={{ 
            position: "fixed", 
            bottom: 0, 
            left: 0, 
            width: "100%", 
            zIndex: 1000, 
            backgroundColor: "#00796b",
            paddingBottom: "env(safe-area-inset-bottom, 10px)", // Prevents overlap
            boxShadow: "0px -2px 10px rgba(0,0,0,0.1)", // Adds a small shadow for better UI
          }}
        >
          <Menu />
        </Box>
      ) : (
        <Box 
          sx={{ 
            backgroundColor: "#00796b", 
            textAlign: "center", 
            padding: "10px 0", 
            width: "100%", 
            color: "#fff",
            mt: "auto",
          }}
        >
          <Footor /> 
        </Box>
      )}
    </Box>
  );
}
