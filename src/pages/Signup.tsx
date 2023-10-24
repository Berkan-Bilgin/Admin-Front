import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

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
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label htmlFor="">Email: </label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label htmlFor="">Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;
