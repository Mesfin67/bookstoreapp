import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", { email, password });
      // Redirect to login with success message
      navigate("/login", { state: { message: res.data.message } });
    } catch (err) {
      setError(err.response?.data?.message || "Error during signup");
    }
  };

  return (
    <div className="centered-form">
      <h3 className="text-center mb-3">Sign Up</h3>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label small">Confirm Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-sm w-100">Sign Up</button>
      </form>
      <p className="text-center mt-2 small">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
