import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const MyBooks = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [newBookData, setNewBookData] = useState({ title: '', author: '', publishYear: '' });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = user.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/books", config);
      setBooks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching books");
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNewBookChange = (e) => {
    setNewBookData({ ...newBookData, [e.target.name]: e.target.value });
  };

  const onNewBookSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:4000/api/books", {
        title: newBookData.title,
        author: newBookData.author,
        publishYear: newBookData.publishYear
      }, config);
      setBooks([...books, res.data]);
      setNewBookData({ title: '', author: '', publishYear: '' });
      setMessage("Book added successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding book");
    }
  };

  const onDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/${id}`, config);
      setBooks(books.filter(book => book._id !== id));
      setMessage("Book deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting book");
    }
  };

  const onEditBook = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/books/${id}`, updatedData, config);
      const updatedBooks = books.map(book => book._id === id ? res.data : book);
      setBooks(updatedBooks);
      setMessage("Book updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating book");
    }
  };

  return (
    <div>
      <h3 className="mb-3">My Books</h3>
      {message && <div className="alert alert-success alert-sm">{message}</div>}
      {error && <div className="alert alert-danger alert-sm">{error}</div>}
      
      <form onSubmit={onNewBookSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              name="title"
              className="form-control form-control-sm"
              placeholder="Title"
              value={newBookData.title}
              onChange={onNewBookChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="author"
              className="form-control form-control-sm"
              placeholder="Author"
              value={newBookData.author}
              onChange={onNewBookChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="publishYear"
              min="1"
              className="form-control form-control-sm"
              placeholder="Year"
              value={newBookData.publishYear}
              onChange={onNewBookChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-secondary btn-sm w-100">Add Book</button>
          </div>
        </div>
      </form>

      <div>
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={onDeleteBook}
            onEdit={onEditBook}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
