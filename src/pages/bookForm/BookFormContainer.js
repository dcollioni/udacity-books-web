import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookForm from './BookForm'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { showToast } from './../../actions'
const { confirm } = window

class BookFormContainer extends Component {
  constructor (props) {
    super(props)

    this.fetcher = this.props.fetcher

    const { R, match: { params: { id } }, location: { state } } = this.props
    const book = state && state.book

    this.state = {
      redirect: false,
      saving: false,
      pageTitle: (id === 'new') ? R.strings.addNewBook : R.strings.editBook,
      id: (id !== 'new') ? id : '',
      title: (book && book.title) || '',
      author: (book && book.author) || '',
      subject: (book && book.subject) || '',
      length: (book && book.length) ? book.length.toString() : '',
      publicationYear: (book && book.publicationYear) ? book.publicationYear.toString() : '',
      publisher: (book && book.publisher) || '',
      isbn: (book && book.isbn) || '',
      additionalInfo: (book && book.additionalInfo) || '',
      coverUrl: (book && book.coverUrl) || '',
      coverFile: undefined
    }

    this.loadBook = this.loadBook.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCoverFileChange = this.handleCoverFileChange.bind(this)
  }

  componentDidMount () {
    const { id } = this.state

    if (id) {
      this.loadBook(id)
    }
  }

  handleCoverFileChange (event) {
    const files = event.target.files
    if (!files) return

    this.setState({
      coverFile: files[0]
    })
  }

  async loadBook (id) {
    const res = await this.fetcher.get(`books/${id}`)

    if (res.ok) {
      const book = await res.json()
      this.setState(() => ({
        title: book.title,
        author: book.author,
        subject: book.subject,
        length: book.length ? book.length.toString() : '',
        publicationYear: book.publicationYear ? book.publicationYear.toString() : '',
        publisher: book.publisher,
        isbn: book.isbn,
        additionalInfo: book.additionalInfo,
        coverUrl: book.coverUrl
      }))
    } else {
      this.setState(() => ({ redirect: true }))
    }
  }

  handleChange (e) {
    const { target: { value, name } } = e
    this.setState(() => ({ [name]: value }))
  }

  async handleSubmit (e) {
    e.preventDefault()

    this.setState(() => ({ saving: true }))

    const { id, title, author, subject, length, publicationYear, publisher, isbn, additionalInfo, coverFile } = this.state
    let { coverUrl } = this.state

    if (coverFile) {
      coverUrl = coverFile.name
      const signedUrlRequest = await this.fetcher.get(`aws/signedUrl/${coverUrl}`)
      const { url: signedUrl } = await signedUrlRequest.json()
      await fetch(signedUrl, { method: 'PUT', body: coverFile })
    }

    const book = {
      title: title.trim(),
      author: author.trim(),
      subject: subject.trim(),
      publisher: publisher.trim(),
      isbn: isbn.trim(),
      additionalInfo: additionalInfo.trim(),
      length,
      publicationYear,
      coverUrl
    }

    if (!id) {
      const res = await this.fetcher.post('books', book)
      if (res.ok) {
        this.setState(() => ({ redirect: true }))
        this.props.dispatch(showToast(this.props.R.strings.bookSaved))
      } else {
        this.setState(() => ({ saving: false }))
        this.props.dispatch(showToast(this.props.R.strings.savingFailedTryAgain))
      }
    } else {
      const res = await this.fetcher.put(`books/${id}`, book)
      if (res.ok) {
        this.setState(() => ({ redirect: true }))
        this.props.dispatch(showToast(this.props.R.strings.bookSaved))
      } else {
        this.setState(() => ({ saving: false }))
        this.props.dispatch(showToast(this.props.R.strings.savingFailedTryAgain))
      }
    }
  }

  async handleDelete () {
    const shouldDelete = confirm(this.props.R.strings.confirmBookDeletion)
    if (shouldDelete) {
      this.setState(() => ({ saving: true }))
      const { id } = this.state
      const res = await this.fetcher.delete(`books/${id}`)
      if (res.ok) {
        this.setState(() => ({ redirect: true }))
        this.props.dispatch(showToast(this.props.R.strings.bookDeleted))
      } else {
        this.setState(() => ({ saving: false }))
        this.props.dispatch(showToast(this.props.R.strings.deletingFailedTryAgain))
      }
    }
  }

  render () {
    return this.state.redirect
      ? <Redirect to='/books' />
      : <BookForm
        {...this.props}
        {...this.state}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onClickDelete={this.handleDelete}
        onCoverFileChange={this.handleCoverFileChange} />
  }
}

BookFormContainer.propTypes = {
  R: PropTypes.object.isRequired,
  fetcher: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

const stateToProps = () => ({
})

export default withRouter(connect(stateToProps)(BookFormContainer))
