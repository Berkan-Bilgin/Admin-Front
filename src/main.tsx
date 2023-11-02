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
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <SnackbarProvider>
          <AuthContextProvider>
            <EventContextProvider>
              <App />
            </EventContextProvider>
          </AuthContextProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </QueryClientProvider>,
);
