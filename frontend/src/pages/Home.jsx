import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch books');
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='d-flex justify-content-center align-items-center gap-2'>
        <button
          className='btn btn-secondary btn-sm'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='btn btn-secondary btn-sm'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='h5 my-4'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-secondary fs-4' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;