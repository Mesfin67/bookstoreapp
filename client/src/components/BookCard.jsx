import React, { useState } from 'react';

const BookCard = ({ book, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: book.title,
    author: book.author,
    publishYear: book.publishYear,
  });
  const [showDetails, setShowDetails] = useState(false);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(book._id, editData);
    setIsEditing(false);
  };

  return (
    <div className="card mb-3">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="card-body">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              name="author"
              value={editData.author}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control form-control-sm"
              name="publishYear"
              value={editData.publishYear}
              onChange={handleEditChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-sm me-2">Save</button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text mb-1"><strong>Author:</strong> {book.author}</p>
          <p className="card-text mb-1"><strong>Publish Year:</strong> {book.publishYear}</p>
          {showDetails && (
            <p className="card-text">
              <strong>ID:</strong> {book._id}<br />
              <strong>Created At:</strong> {new Date(book.createdAt).toLocaleString()}
            </p>
          )}
          <div>
            <button className="btn btn-secondary btn-sm me-2" onClick={() => setIsEditing(true)}>Update</button>
            <button className="btn btn-secondary btn-sm me-2" onClick={() => onDelete(book._id)}>Delete</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide Details" : "Detail"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
