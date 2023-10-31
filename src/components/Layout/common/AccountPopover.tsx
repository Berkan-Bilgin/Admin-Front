import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';

interface User {
  token: string;
  email: string;
}

interface AccountPopoverProps {
  user: User;
  onLogout: () => void;
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    console.log('user ne', user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    if (onLogout) {
      onLogout();
    }
    handleMenuClose();
  };

  return (
    <div>
      <IconButton style={{ marginRight: 16 }} color="inherit" onClick={handleMenuOpen}>
        <Avatar>{user && user.email.charAt(0).toUpperCase()}</Avatar>
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
    </div>
  );
};

export default AccountPopover;
