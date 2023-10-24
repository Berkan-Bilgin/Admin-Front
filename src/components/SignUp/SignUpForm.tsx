import { Button, TextField, Box, Container } from '@mui/material';
import './../LogIn/login.css';
import signUp from '/signUp.jpeg';

function SignUpScreen() {
  return (
    <Box className="form">
      <img src={signUp} />

      <div className="login-text">
        <h1>Sign Up</h1>
      </div>
      <TextField placeholder="Name..." variant="outlined" className="custom-textfield" />
      <TextField placeholder="E-mail" variant="outlined" className="custom-textfield" type="email" />
      <TextField placeholder="Password..." variant="outlined" className="custom-textfield" type="password" />
      <div className="buttonContainer">
        <Button className="custom-bg">Login</Button>
        <Button className="custom-bg">Sign Up</Button>
      </div>
    </Box>
  );
}

export default SignUpScreen;