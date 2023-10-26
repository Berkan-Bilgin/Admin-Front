import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'normalize.css';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { EventContextProvider } from './context/EventContext.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AuthContextProvider>
  </ThemeProvider>,
);
