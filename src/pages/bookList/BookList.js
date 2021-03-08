import React from 'react'
import PropTypes from 'prop-types'
import BookListItemContainer from './components/BookListItemContainer'
import { FloatingButton, ListLoader } from './../components'
import InfiniteScroll from 'react-infinite-scroller'
import LinearProgress from '@material-ui/core/LinearProgress'
import './BookList.css'

const BookList = ({ R, books, hasNextPage, loadBooks, listProgress }) => (
  <div id='book-list'>
    <header>
      <h2>
        {R.strings.yourLibrary}
        <span>({listProgress} / 100)</span>
      </h2>
      <LinearProgress variant='determinate' value={listProgress} />
    </header>
    <InfiniteScroll className='book-list' pageStart={1} hasMore={hasNextPage} loadMore={loadBooks} loader={<ListLoader key={0} />}>
      {
        (!hasNextPage && books.length === 0)
          ? <BookListItemContainer key={'placeholder'} placeholder={R.strings.addYourFirstBook} />
          : books.map(book =>
            <BookListItemContainer key={book._id} book={book} />
          )
      }
    </InfiniteScroll>
    {listProgress < 100 &&
      <FloatingButton icon='add' url='/books/new' title={R.strings.addNewBook} />
    }
  </div>
)

BookList.propTypes = {
  R: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  loadBooks: PropTypes.func.isRequired
}

export default BookList
