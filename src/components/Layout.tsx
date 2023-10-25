import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Typography, CssBaseline, Divider, Avatar, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import TranslateIcon from '@mui/icons-material/Translate';
import ReactCountryFlag from 'react-country-flag';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    state: { user },
  } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    console.log(`Dil ${lang} olarak değiştirildi.`);
    handleLanguageMenuClose();
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {user && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <ChevronRightIcon />
            </IconButton>
          )}

          <Typography style={{ flexGrow: 1 }} variant="h6">
            Admin Panel
          </Typography>

          {user ? (
            <>
              {' '}
              <IconButton style={{ marginRight: 32 }} color="inherit" onClick={handleLanguageMenuOpen}>
                <TranslateIcon />
              </IconButton>
              <Menu
                anchorEl={languageAnchorEl}
                keepMounted
                open={Boolean(languageAnchorEl)}
                onClose={handleLanguageMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => changeLanguage('tr')}>
                  <ReactCountryFlag countryCode="TR" svg style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                  Türkçe
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('en')}>
                  <ReactCountryFlag countryCode="GB" svg style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                  English
                </MenuItem>
              </Menu>
              <IconButton style={{ marginRight: 32 }} color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton style={{ marginRight: 16 }} color="inherit" onClick={handleMenuOpen}>
                <Avatar>{user && user.email.charAt(0).toUpperCase()}</Avatar> {/* Kullanıcının ilk harfini gösterir */}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      {user && (
        <Drawer
          variant="persistent"
          open={drawerOpen}
          PaperProps={{
            style: {
              width: drawerWidth,
              backgroundColor: '#2c3e50', // Arka plan rengi
              color: '#ecf0f1', // Yazı rengi
            },
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6">Menu</Typography>
          </div>
          <Divider style={{ backgroundColor: '#34495e' }} />
          <List>
            <ListItem button component={Link} to="/" style={{ '&:hover': { backgroundColor: '#34495e' } }}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/users" style={{ '&:hover': { backgroundColor: '#34495e' } }}>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/settings" style={{ '&:hover': { backgroundColor: '#34495e' } }}>
              <ListItemText primary="Settings" />
            </ListItem>
            {/* Diğer menü öğeleri */}
          </List>
        </Drawer>
      )}

      <main style={{ marginLeft: drawerOpen ? drawerWidth : 0, marginTop: 64 }}>{children}</main>
    </div>
  );
};

export default Layout;
