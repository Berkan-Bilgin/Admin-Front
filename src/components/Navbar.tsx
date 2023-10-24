import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const { logout } = useLogout();
  const {
    state: { user },
  } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Home Page
          </Typography>
          {user ? (
            <>
              <Typography variant="body1" style={{ marginRight: 15 }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleClick}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
