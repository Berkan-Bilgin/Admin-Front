import { Button, TextField, Box } from '@mui/material';
import './login.css';
import Login from '/login.jpeg';

function LoginScreen() {
  return (
    <Box className="form">
      <img src={Login} />

      <div className="login-text">
        <h1>LOGIN</h1>
      </div>1
      <TextField placeholder="Username..." variant="outlined" className="custom-textfield" />
      <TextField placeholder="Password..." variant="outlined" className="custom-textfield" type="password" />
      <div className="buttonContainer">
        <Button className="custom-bg">Login</Button>
        <Button className="custom-bg">Sign Up</Button>
      </div>
    </Box>
  );
}

export default LoginScreen;