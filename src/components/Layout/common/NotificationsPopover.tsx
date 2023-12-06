import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mockNotifications } from '../../../mock/notifications';

const NotificationsPopover = () => {
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleNotificationsOpen = (event: any) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleNotificationsOpen} style={{ marginRight: 32 }} color="inherit">
        <NotificationsIcon />
      </IconButton>
      <Menu anchorEl={notificationsAnchorEl} keepMounted open={Boolean(notificationsAnchorEl)} onClose={handleNotificationsClose}>
        {mockNotifications.map((notification) => (
          <MenuItem key={notification.id}>{notification.message}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NotificationsPopover;
