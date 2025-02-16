import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/books/create"
        element={isAuthenticated ? <CreateBook /> : <Navigate to="/login" />}
      />
      <Route
        path="/books/details/:id"
        element={isAuthenticated ? <ShowBook /> : <Navigate to="/login" />}
      />
      <Route
        path="/books/edit/:id"
        element={isAuthenticated ? <EditBook /> : <Navigate to="/login" />}
      />
      <Route
        path="/books/delete/:id"
        element={isAuthenticated ? <DeleteBook /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;