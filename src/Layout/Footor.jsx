import React from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          textAlign: 'center',
          backgroundColor: theme => theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} skoegle. All rights reserved.
        </Typography>
      </Box>
    );
  };
export default Footer