import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th className='border border-secondary rounded small'>No</th>
          <th className='border border-secondary rounded small'>Title</th>
          <th className='border border-secondary rounded d-none d-md-table-cell small'>
            Author
          </th>
          <th className='border border-secondary rounded d-none d-md-table-cell small'>
            Publish Year
          </th>
          <th className='border border-secondary rounded small'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-secondary rounded text-center small'>
              {index + 1}
            </td>
            <td className='border border-secondary rounded text-center small'>
              {book.title}
            </td>
            <td className='border border-secondary rounded text-center d-none d-md-table-cell small'>
              {book.author}
            </td>
            <td className='border border-secondary rounded text-center d-none d-md-table-cell small'>
              {book.publishYear}
            </td>
            <td className='border border-secondary rounded text-center small'>
              <div className='d-flex justify-content-center gap-2'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='fs-6 text-secondary' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='fs-6 text-secondary' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='fs-6 text-secondary' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;