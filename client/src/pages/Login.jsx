import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMsg(location.state.message);
    }
  }, [location]);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    try {
      const res = await axios.post("https://bookstoreapp-backend-lnyc.onrender.com/api/auth/login", { email, password });
      handleLogin({ token: res.data.token, email: res.data.email });
      navigate("/mybooks");
    } catch (err) {
      setError(err.response?.data?.message || "Error during login");
    }
  };

  return (
    <div className="centered-form">
      <h3 className="text-center mb-3">Login</h3>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label small">Email</label>
          <input
            type="email"
            className="form-control form-control-sm"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label small">Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-sm w-100">Login</button>
      </form>
      <p className="text-center mt-2 small">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
