import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

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
    <form className="Login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label htmlFor="">Email: </label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label htmlFor="">Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button disabled={isLoading}>Log in</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
