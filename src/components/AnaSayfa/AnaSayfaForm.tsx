import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Menu, MenuItem, CssBaseline, List, ListItem, ListItemText } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', overflowX: 'hidden', backgroundColor: '#cff4d2' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#56c596', top: 0, left: 0, right: 0, color: '#fff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BM ETKİNLİK
          </Typography>
          <TextField placeholder="Search..." sx={{ width: '450px', backgroundColor: '#fff', right: '550px' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Typography variant="body1" sx={{ marginRight: '50px' }}>
              Büşra Çoğul
            </Typography>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Ayarlar</MenuItem>
              <MenuItem onClick={handleClose}>Çıkış</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#56c596', width: '250px', marginTop: '100px', height: '100vh', overflow: 'auto' }}>
        <List>
          <ListItem button>
            <ListItemText primary="Menü Öğe 1" primaryTypographyProps={{ style: { color: 'white' } }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Menü Öğe 2" primaryTypographyProps={{ style: { color: 'white' } }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Menü Öğe 3" primaryTypographyProps={{ style: { color: 'white' } }} />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Navbar;
