import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose, { mongo } from 'mongoose';
import { Book } from './models/bookModel.js'; 
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());  

app.get('/', (request, response) => {
    console.log('request');
    return response.status(200).send('Hello World');
});


app.use("/books", booksRoute);


mongoose.connect(mongoDBURL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
}).catch((error) => {
    console.log('Error connecting to MongoDB');
    console.log(error);
});