import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'normalize.css';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { EventContextProvider } from './context/EventContext.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <EventContextProvider>
          <App />
        </EventContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </QueryClientProvider>,
);
