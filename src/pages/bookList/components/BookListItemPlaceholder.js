import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BookListItemPlaceholder = ({ text }) => (
  <Link className='book-list-item placeholder' to='/books/new'>
    <span>{text}</span>
  </Link>
)

BookListItemPlaceholder.propTypes = {
  text: PropTypes.string.isRequired
}

export default BookListItemPlaceholder
