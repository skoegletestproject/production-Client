import React, { useState, useEffect } from "react";
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
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Mobile or tablet screen
      } else {
        setIsMobile(false); // Desktop screen
      }
    };

    handleResize(); // Check size on initial load
    window.addEventListener("resize", handleResize); // Update on window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
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
