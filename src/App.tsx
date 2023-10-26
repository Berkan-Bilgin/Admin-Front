import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout/Layout';
import { useAuthContext } from './hooks/useAuthContext';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';
import Settings from './pages/Settings';

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
            <Route path="/create-event" element={user ? <CreateEvent /> : <Navigate to="/" />}></Route>
            <Route path="/events" element={user ? <Events /> : <Navigate to="/" />}></Route>
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
