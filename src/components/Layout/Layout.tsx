import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Typography, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import LanguagePopover from './common/LanguagePopover';
import NotificationsPopover from './common/NotificationsPopover';
import AccountPopover from './common/AccountPopover';
import UserMenu from './common/UserMenu';

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

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          {user && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <ChevronRightIcon />
            </IconButton>
          )}

          <Typography style={{ flexGrow: 1, marginLeft: drawerOpen ? drawerWidth : 0 }} variant="h6">
            Eventoria
          </Typography>

          {user ? (
            <>
              <LanguagePopover />
              <NotificationsPopover />
              <AccountPopover user={user} onLogout={handleClick} />
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      {user && <UserMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />}

      <main style={{ marginLeft: drawerOpen ? drawerWidth : 0 }}>{children}</main>
    </div>
  );
};

export default Layout;
