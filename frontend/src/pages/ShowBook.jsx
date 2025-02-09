import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='h5 my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='d-flex flex-column border border-info rounded w-fit p-4'>
          <div className='my-4'>
            <span className='h6 mr-4 text-secondary'>Id</span>
            <span className='small'>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='h6 mr-4 text-secondary'>Title</span>
            <span className='small'>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='h6 mr-4 text-secondary'>Author</span>
            <span className='small'>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='h6 mr-4 text-secondary'>Publish Year</span>
            <span className='small'>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='h6 mr-4 text-secondary'>Create Time</span>
            <span className='small'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='h6 mr-4 text-secondary'>Last Update Time</span>
            <span className='small'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;