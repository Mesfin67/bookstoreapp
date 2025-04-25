const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// @route   GET /api/books/
// @desc    Get all books created by the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/books/:id
// @desc    Get details of a single book (including created date)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/books/
// @desc    Create a new book
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      publishYear,
      user: req.user.id
    });
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book (if it belongs to the user)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    let book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.publishYear = publishYear || book.publishYear;
    book = await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book (if it belongs to the user)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
