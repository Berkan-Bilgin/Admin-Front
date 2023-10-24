import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const {
    state: { user },
  } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
