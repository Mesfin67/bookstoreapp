import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import BookRouter from './routes/book.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // If you're using cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors()); // Enable preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookstore', BookRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Book store API!');
});

app.listen(PORT, async () => {
  console.log(`Book Store API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;