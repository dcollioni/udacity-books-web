import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BookList from './BookList'

class BookListContainer extends Component {
  constructor (props) {
    super(props)

    this.fetcher = this.props.fetcher

    this.state = {
      books: [],
      hasNextPage: true,
      nextPage: 1,
      listProgress: 0
    }

    this.loadBooks = this.loadBooks.bind(this)
  }

  async loadBooks () {
    const res = await this.fetcher.get(`books?page=${this.state.nextPage}`)

    if (res.ok) {
      let { books, hasNextPage, nextPage, totalDocs } = await res.json()
      books = [...this.state.books, ...books]

      this.setState({ books, hasNextPage, nextPage, listProgress: totalDocs })
    }
  }

  render () {
    return (
      <BookList {...this.props} {...this.state} loadBooks={this.loadBooks} />
    )
  }
}

BookListContainer.propTypes = {
  R: PropTypes.object.isRequired,
  fetcher: PropTypes.object.isRequired
}

const stateToProps = () => ({
})

export default withRouter(connect(stateToProps)(BookListContainer))
