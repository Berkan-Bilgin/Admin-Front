import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const UserMenu = ({ drawerOpen, toggleDrawer }) => {
  const listItemStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    marginBottom: '8px',
    backgroundColor: '#ccc', // Hafif koyu bir arka plan rengi
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#dfe6e9', // Hover durumunda daha koyu bir renk
      transform: 'scale(1.05)', // Hafif bir büyütme efekti
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Hafif bir gölge efekti
    },
  };

  const listItemTextStyle = {
    color: '#ecf0f1', // Açık renkli metin
    fontWeight: '500', // Orta kalınlıkta metin
    fontSize: '1.1em', // Biraz daha büyük metin boyutu
  };
  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
        {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <Drawer
        variant="persistent"
        open={drawerOpen}
        PaperProps={{
          style: {
            width: 240,
            backgroundColor: '#f1f1f1',
            color: '#ecf0f1',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: '#f1f1f1' }} />
        <List sx={{ padding: '16px' }}>
          {[
            { label: 'Dashboard', path: '/' },
            { label: 'Create Event', path: '/create-event' },
            { label: 'Events', path: '/events' },
            { label: 'Settings', path: '/settings' },
          ].map((item) => (
            <ListItem key={item.label} component={Link} to={item.path} sx={listItemStyle}>
              <ListItemText secondary={item.label} sx={listItemTextStyle} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default UserMenu;
