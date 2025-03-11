import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Home, Login, PersonAdd, ExitToApp, Visibility, AccountCircle, SupervisorAccount } from '@mui/icons-material';
import { useLocation, Link } from 'react-router-dom';
import { useStore } from '../Store/Store';

const Menu = () => {
  const { isAdmin, isLogin, setisLogin } = useStore();
  const location = useLocation();

  const handleLogout = () => {
    console.log("logout");
    setisLogin(false);
    localStorage.clear();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "white",
        paddingBottom: "env(safe-area-inset-bottom, 50px)", // Prevents overlap with navigation buttons
        minHeight: "90px", // Ensures enough height
        boxShadow: "0px -2px 10px rgba(0,0,0,0.1)", // UI improvement
      }}
    >
      <BottomNavigation showLabels>
        {isLogin && (
          <>
            <BottomNavigationAction
              label="Home"
              icon={<Home />}
              component={Link}
              to="/"
              sx={{ color: isActive('/') ? 'primary.main' : 'inherit' }}
            />
            <BottomNavigationAction
              label="Live Preview"
              icon={<Visibility />}
              component={Link}
              to="/track"
              sx={{ color: isActive('/track') ? 'primary.main' : 'inherit' }}
            />
            
            {!isAdmin && (
              <BottomNavigationAction
                label="Profile"
                icon={<AccountCircle />}
                component={Link}
                to="/profile"
                sx={{ color: isActive('/profile') ? 'primary.main' : 'inherit' }}
              />
            )}

            {isAdmin && (
              <BottomNavigationAction
                label="Admin"
                icon={<SupervisorAccount />}
                component={Link}
                to="/mbpannel/admin"
                sx={{ color: isActive('/mbpannel/admin') ? 'primary.main' : 'inherit' }}
              />
            )}
          </>
        )}

        {!isLogin ? (
          <>
            <BottomNavigationAction
              label="Login"
              icon={<Login />}
              component={Link}
              to="/login"
              sx={{ color: isActive('/login') ? 'primary.main' : 'inherit' }}
            />
            <BottomNavigationAction
              label="Signup"
              icon={<PersonAdd />}
              component={Link}
              to="/signup"
              sx={{ color: isActive('/signup') ? 'primary.main' : 'inherit' }}
            />
          </>
        ) : (
          <BottomNavigationAction
            label="Logout"
            to="/login"
            component={Link}
            icon={<ExitToApp />}
            onClick={handleLogout}
            sx={{ color: 'error.main' }}
          />
        )}
      </BottomNavigation>
    </Box>
  );
};

export default Menu;
