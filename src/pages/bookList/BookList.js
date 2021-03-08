import React from 'react'
import PropTypes from 'prop-types'
import BookListItemContainer from './components/BookListItemContainer'
import { FloatingButton, ListLoader } from './../components'
import LinearProgress from '@material-ui/core/LinearProgress'
import './BookList.css'

const BookList = ({ R, books, listProgress, loading }) => (
  <div id="book-list">
    <header>
      <h2>
        {R.strings.yourLibrary}
        <span>({listProgress} / 100)</span>
      </h2>
      <LinearProgress variant="determinate" value={listProgress} />
    </header>
    <div className="book-list">
      {
        loading ? <ListLoader /> :
          books.length === 0 ? (
            <BookListItemContainer key={'placeholder'} placeholder={R.strings.addYourFirstBook} />
          ) : (
            books.map(book => <BookListItemContainer key={book._id} book={book} />)
          )
      }
    </div>
    {listProgress < 100 && <FloatingButton icon="add" url="/books/new" title={R.strings.addNewBook} />}
  </div>
)

BookList.propTypes = {
  R: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

export default BookList
