import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Button, Typography, Container, TextField } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signup(email, password);
    console.log(email, password);
  };

  return (
    <div className="signup-form">
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" className="signup-form_title">
            Sign Up
          </Typography>
          <TextField className="signup-form_email" label="Email" variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)} value={email} />
          <TextField className="signup-form_password" label="Password" variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)} value={password} />
          <Button className="signup-form_submit" variant="contained" color="primary" fullWidth disabled={isLoading} type="submit">
            Sign Up
          </Button>
          {error && <div>{error}</div>}
        </form>
      </Container>
    </div>
  );
};

export default Signup;
