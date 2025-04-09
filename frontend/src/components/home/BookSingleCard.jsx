import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border border-secondary rounded-lg p-2 m-4 position-relative hover-shadow'>
      <h2 className='position-absolute top-0 end-0 px-2 py-1 bg-secondary bg-opacity-50 rounded-lg small'>
        {book.publishYear}
      </h2>
      <h4 className='my-2 text-muted small'>{book._id}</h4>
      <div className='d-flex justify-content-start align-items-center gap-2'>
        <PiBookOpenTextLight className='text-secondary fs-2' />
        <h2 className='my-1 small'>{book.title}</h2>
      </div>
      <div className='d-flex justify-content-start align-items-center gap-2'>
        <BiUserCircle className='text-secondary fs-2' />
        <h2 className='my-1 small'>{book.author}</h2>
      </div>
      <div className='d-flex justify-content-between align-items-center gap-2 mt-4 p-4'>
        <BiShow
          className='fs-3 text-secondary hover-text-dark cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='fs-2 text-secondary hover-text-dark' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='fs-2 text-secondary hover-text-dark' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='fs-2 text-secondary hover-text-dark' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;