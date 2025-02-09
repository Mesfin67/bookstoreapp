import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.backendurl}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='h5 my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='d-flex flex-column border border-primary rounded p-4 mx-auto' style={{ maxWidth: '600px' }}>
        <div className='my-4'>
          <label className='h6 mr-4 text-secondary'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control border border-secondary px-2 py-1 w-100 small'
          />
        </div>
        <div className='my-4'>
          <label className='h6 mr-4 text-secondary'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='form-control border border-secondary px-2 py-1 w-100 small'
          />
        </div>
        <div className='my-4'>
          <label className='h6 mr-4 text-secondary'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='form-control border border-secondary px-2 py-1 w-100 small'
          />
        </div>
        <button className='btn btn-secondary p-1 m-2 small' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;