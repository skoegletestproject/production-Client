import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useStore } from '../Store/Store';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAdmin, isLogin, setisLogin, logout } = useStore();

  function LogotManage() {
    localStorage.clear();
    setisLogin(false);
    logout();
    console.clear()
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00796b' }}> {/* Green background */}
      <Container>
        <Toolbar disableGutters>
          {/* For Mobile and Tablet (Logo in Center) */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Skoegle
              </Link>
            </Typography>
          </Box>

          {/* Display Menu Links Only for Larger Screens */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'flex-end' : 'flex-start' }}>
            {!isMobile && (
              <>
                {!isLogin && (
                  <>
                    <Button component={Link} to="/login" color="inherit">
                      Login
                    </Button>
                    <Button component={Link} to="/signup" color="inherit">
                      Sign Up
                    </Button>
                  </>
                )}
                {isLogin && (
                  <>
                    {isAdmin ? (
                      <Button component={Link} to="/mbpannel/admin" color="inherit">
                        Admin
                      </Button>
                    ) : (
                      <Button component={Link} to="/profile" color="inherit">
                        Profile
                      </Button>
                    )}
                    <Button component={Link} to="/" color="inherit">
                      Home
                    </Button>
                    <Button component={Link} onClick={LogotManage} to="/login" color="inherit">
                      Logout
                    </Button>
                  </>
                )}

              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
