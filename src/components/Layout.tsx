import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Typography, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <ChevronRightIcon />
          </IconButton>
          <Typography style={{ marginLeft: drawerOpen ? 120 : 0 }} variant="h6">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

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

      <main style={{ marginLeft: drawerOpen ? drawerWidth : 0, marginTop: 64 }}>{children}</main>
    </div>
  );
};

export default Layout;
