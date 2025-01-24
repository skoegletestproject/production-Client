import React, { useState, useEffect } from "react";
import Footor from "./Footor";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from "./Menu";

export default function Layout({ children, titlename }) {
  const [isMobile, setIsMobile] = useState(false);

  const layoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const layoutContentStyle = {
    flex: 1,
    padding: "20px", // Adjust padding as needed
  };

  const footorStyle = {
    backgroundColor: "#f8f9fa", // Adjust as needed
    textAlign: "center",
    padding: "10px 0",
    position: "relative",
    width: "100%",
  };

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

  return (
    <div style={layoutContainerStyle}>
      <Navbar />
      <ToastContainer />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{titlename}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <main style={layoutContentStyle}>{children}</main>

      {/* Show Menu for mobile/tablet, and Footer for desktop */}
      {isMobile ? <Menu /> : <Footor style={footorStyle} />}
    </div>
  );
}
