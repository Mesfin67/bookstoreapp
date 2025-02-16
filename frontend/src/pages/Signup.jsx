import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.post('https://bookstoreapp-beta.vercel.app/auth/signup', {
        username,
        email,
        password,
      });
      enqueueSnackbar("Signup successful", { variant: "success" });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup"); 
      enqueueSnackbar(error.response?.data?.message || "Error during signup", { variant: "error" });
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
          Join community of book lovers. Sign up to explore, create and manage your favorite books
        </p>
      </div>
      <div className="d-flex flex-column border border-primary rounded p-4 mx-auto" style={{ maxWidth: "600px" }}>
        {error && <div className="alert alert-danger small">{error}</div>} {Error}
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
          <label className="h6 mr-4 text-secondary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="btn btn-secondary p-1 m-2 small" onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
        <p className="text-center small">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
