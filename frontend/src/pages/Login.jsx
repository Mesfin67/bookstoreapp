import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("form submitted", formData)
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error("Email and password are required");
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/sign-in", 
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      // Store token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      enqueueSnackbar("Login successful, go to home", { variant: "success" });
      window.location.href = "/";
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "An error occurred during login";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h1 className="h3">Welcome to the Bookstore!</h1>
        <p className="small text-muted">
          Discover world of books. Log in to explore, create and manage your favorite books
        </p>
      </div>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="d-flex flex-column border border-primary rounded p-4 mx-auto" style={{ maxWidth: "600px" }}>
          {error && <div className="alert alert-danger small">{error}</div>}
          
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
              autoComplete="current-password"
              required
              minLength="6"
            />
          </div>
          
          <button 
            type="submit"
            className="btn btn-secondary p-1 m-2 small" 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <p className="text-center small">
            New User?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;