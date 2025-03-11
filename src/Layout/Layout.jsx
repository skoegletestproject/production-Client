import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Footor from "./Footor";
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

  const layoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#f1f1f1",
  };

  const layoutContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    marginTop: "60px", 
    marginBottom: isMobile ? "60px" : "0",
  };

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    backgroundColor: "#00796b",
  };

  // const menuStyle = {
  //   position: "fixed",
  //   bottom: 0,
  //   left: 0,
  //   width: "100%",
  //   zIndex: 1000,
  //   backgroundColor: "#00796b",
  // };

  const footorStyle = {
    backgroundColor: "#00796b",
    textAlign: "center",
    padding: "10px 0",
    width: "100%",
    marginTop: "auto",
    color: "#fff",
  };

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
        <div >
          <Menu />
        </div>
      ) : (
        <Footor style={footorStyle} />
      )}
    </div>
  );
}
