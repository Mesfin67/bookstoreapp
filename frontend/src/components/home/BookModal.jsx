import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='position-fixed bg-dark bg-opacity-60 top-0 start-0 end-0 bottom-0 z-50 d-flex justify-content-center align-items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-100 max-w-100 h-100 bg-white rounded-xl p-4 d-flex flex-column position-relative'
      >
        <AiOutlineClose
          className='position-absolute end-0 top-0 fs-1 text-secondary cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-auto px-4 py-1 bg-secondary bg-opacity-50 rounded-lg small'>
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
        <p className='mt-4 small'>Anything You want to show</p>
        <p className='my-2 small'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
          necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
          nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
          dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
          vitae voluptate sequi repellat!
        </p>
      </div>
    </div>
  );
};

export default BookModal;