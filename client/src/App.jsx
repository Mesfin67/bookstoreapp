import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBooks from './pages/MyBooks';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for existing login token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setUser({ email, token });
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('email', userData.email);
    setUser({ email: userData.email, token: userData.token });
    navigate('/mybooks');
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mybooks" element={user ? <MyBooks user={user} /> : <Login handleLogin={handleLogin} />} />
          <Route path="*" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
