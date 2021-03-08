import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BookList from './BookList'

class BookListContainer extends Component {
  constructor(props) {
    super(props)

    this.fetcher = this.props.fetcher

    this.state = {
      books: [],
      listProgress: 0,
      loading: true,
    }

    this.loadBooks = this.loadBooks.bind(this)
  }

  componentDidMount() {
    this.loadBooks()
  }

  async loadBooks() {
    this.setState({ loading: true })

    const res = await this.fetcher.get(`books`)

    if (res.ok) {
      const books = await res.json()
      const listProgress = books.length
      this.setState({ books, listProgress })
    }

    this.setState({ loading: false })
  }

  render() {
    return <BookList {...this.props} {...this.state} />
  }
}

BookListContainer.propTypes = {
  R: PropTypes.object.isRequired,
  fetcher: PropTypes.object.isRequired,
}

const stateToProps = () => ({})

export default withRouter(connect(stateToProps)(BookListContainer))
