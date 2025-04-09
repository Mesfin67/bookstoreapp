import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
``
  const handleChange = (e) => {
    console.log("form submitted", formData)
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting:", formData);
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/sign-up',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log("backend response", response)
      //based on the backend response, if the data.isVerified=false, redirect to the verify-email-info
      //Redirect to login or verification info page
      navigate('/verify-email-info');
      
    } catch (error) {
      console.error("Signup Errorrrrrr:", error.response?.data); // Log detailed error
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h1 className="h3">Welcome to the Bookstore!</h1>
        <p className="small text-muted">
          Join community of book lovers. Sign up to explore, create and manage your favorite books
        </p>
      </div>
      <form onSubmit={handleSubmit} id="signup-form">
        <div className="d-flex flex-column border border-primary rounded p-4 mx-auto" style={{ maxWidth: "600px" }}>
          {error && <div className="alert alert-danger small">{error}</div>}
          
          <div className="my-4">
            <label className="h6 mr-4 text-secondary" htmlFor="username">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control border border-secondary px-2 py-1 w-100 small" 
              id="username" 
              autoComplete="name"
              required
            />
          </div>
          
          <div className="my-4">
            <label className="h6 mr-4 text-secondary" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control border border-secondary px-2 py-1 w-100 small" 
              id="email" 
              autoComplete="email"
              required
            />
          </div>
          
          <div className="my-4">
            <label className="h6 mr-4 text-secondary" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control border border-secondary px-2 py-1 w-100 small" 
              id="password" 
              autoComplete="new-password"
              required
              minLength="6"
            />
            <small className="text-muted">Password must be at least 6 characters</small>
          </div>
          
          <button 
            type="submit"
            className="btn btn-secondary p-1 m-2 small" 
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          
          <p className="text-center small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;