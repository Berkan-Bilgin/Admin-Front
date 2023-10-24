import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { EventContextProvider } from './context/EventContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <EventContextProvider>
      <App />
    </EventContextProvider>
  </AuthContextProvider>,
);
