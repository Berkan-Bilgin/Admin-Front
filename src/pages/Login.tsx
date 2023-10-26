import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Button, TextField, Typography, Container } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(email, password);
    console.log(email, password);
  };

  return (
    <div className="login-form">
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" className="login-form_title">
            Log in
          </Typography>
          <TextField className="login-form_email" label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField className="login-form_password" type="password" label="Password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="login-form_submit" variant="contained" color="primary" fullWidth disabled={isLoading} type="submit">
            Log in
          </Button>
          {error && <div>{error}</div>}
        </form>
      </Container>
    </div>
  );
};

export default Login;
