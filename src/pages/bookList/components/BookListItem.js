import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BookListItem = ({ book }) => (
  <Link className='book-list-item' to={{
    pathname: `/books/${book._id}`,
    state: { book }
  }}>
    <span>{book.title}</span>
    <span>{book.author}</span>
    <span>{book.subject}</span>
    <span>{book.length}</span>
  </Link>
)

BookListItem.propTypes = {
  book: PropTypes.object.isRequired
}

export default BookListItem
