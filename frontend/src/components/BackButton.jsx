import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='d-flex'>
      <Link
        to={destination}
        className='btn btn-secondary text-white px-2 py-1 rounded w-auto'
      >
        <BsArrowLeft className='fs-6' />
      </Link>
    </div>
  );
};

export default BackButton;