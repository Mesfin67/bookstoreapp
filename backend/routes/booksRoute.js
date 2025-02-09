import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();



// save book to database
router.post('/', async (request, response) => {
   try{
    if (!request.body.title || !request.body.author || !request.body.PublishYear) {
        return response.status(400).send('Missing required fields');
    }
    const newBook = new Book({
        title: request.body.title,
        author: request.body.author,
        PublishYear: request.body.PublishYear
});
   const book = await Book.create(newBook);
   response.status(201).send(book);
   } catch(error){
       console.log(error.message);
       response.status(500).send('message: error.message');
   }

});

router.get('/', async (request, response) => {
     try {
    const books = await Book.find({});
    return response.status(200).json({
        count: books.length,
        data: books
    });
} catch (error) {
    console.log(error.message);
    response.status(500).send('message: error.message');
    
}
});

// route to get book from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ book });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route to update book in database by id
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.PublishYear) {
            return response.status(400).send('Missing required fields');
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book updated successfully', book: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete a book from database by id

router.delete('/:id', async (request, response) => {

    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ message: 'Book deleted successfully' });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        
    }
});

export default router;