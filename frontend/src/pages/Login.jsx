import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during login");
      enqueueSnackbar(error.response?.data?.message || "Invalid credentials", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h1 className="h3">Welcome to the Bookstore!</h1>
        <p className="small text-muted">
          Discover world of books. Log in to explore, create and manage your favorite book
        </p>
      </div>
      <div className="d-flex flex-column border border-primary rounded p-4 mx-auto" style={{ maxWidth: "600px" }}>
        {error && <div className="alert alert-danger small">{error}</div>} 
        <div className="my-4">
          <label className="h6 mr-4 text-secondary">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control border border-secondary px-2 py-1 w-100 small"
          />
        </div>
        <div className="my-4">
          <label className="h6 mr-4 text-secondary">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control border border-secondary px-2 py-1 w-100 small"
          />
        </div>
        <button className="btn btn-secondary p-1 m-2 small" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center small">
          New User?{" "}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;