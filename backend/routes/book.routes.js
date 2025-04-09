import { Router } from 'express';
// import authorize from '../middlewares/auth.middleware.js'
// import {
//   createBook,
// } from '../controllers/book.controller.js'

const BookRouter = Router();

BookRouter.get('/', (req, res) => res.send({ title: 'GET all' }));

BookRouter.get('/:id', (req, res) => res.send({ title: 'GET details' }));

// BookRouter.post('/', authorize, createBook);

BookRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE' }));

BookRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE' }));


export default BookRouter;