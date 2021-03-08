import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookListItem from './BookListItem'
import BookListItemPlaceholder from './BookListItemPlaceholder'

class BookListItemContainer extends Component {
  render () {
    return this.props.placeholder
      ? <BookListItemPlaceholder text={this.props.placeholder} />
      : <BookListItem {...this.props} />
  }
}

BookListItemContainer.propTypes = {
  book: PropTypes.object,
  placeholder: PropTypes.string
}

export default BookListItemContainer
