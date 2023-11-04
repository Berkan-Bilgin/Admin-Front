import React from 'react';
import { Typography, Box } from '@mui/material';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  style?: React.CSSProperties;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, style }) => {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} style={style}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
};

export default TabPanel;
