import React from 'react'
import PropTypes from 'prop-types'
import './BookForm.css'
import { InputField, InputButton, ActionButton } from './../components'

const BookForm = ({
  R,
  pageTitle,
  id,
  title,
  author,
  subject,
  length,
  publicationYear,
  publisher,
  isbn,
  additionalInfo,
  coverUrl,
  onChange,
  onSubmit,
  onClickDelete,
  onCoverFileChange,
  saving }) =>
  (
    <div id='book-form'>
      <header>
        <h2>{pageTitle}</h2>
        <nav className='action-items'>
          {id &&
            <ActionButton icon='delete' title={R.strings.deleteBook} onClick={onClickDelete} />
          }
        </nav>
      </header>
      <form method='post' action='/' onSubmit={onSubmit}>
        <span className="cover-picture" style={{
          backgroundImage: `url(${coverUrl || '/images/no-image.png'})`
        }} />

        <InputField
          label={R.strings.title}
          name='title'
          value={title}
          onChange={onChange}
          readOnly={saving}
          required
          maxLength={100}
          pattern='.*[\w]+.*'
          autoFocus />

        <InputField
          label={R.strings.author}
          name='author'
          value={author}
          onChange={onChange}
          readOnly={saving}
          pattern='.*[\w]+.*'
          required
          maxLength={100} />

        <InputField
          label={R.strings.subject}
          name='subject'
          value={subject}
          onChange={onChange}
          readOnly={saving}
          pattern='.*[\w]+.*'
          required
          maxLength={100}
          dataListItems={[
            R.strings.actionAndAdventure,
            R.strings.biography,
            R.strings.fiction,
            R.strings.romance,
            R.strings.terror
          ]} />

        <InputField
          label={R.strings.length}
          name='length'
          value={length}
          onChange={onChange}
          readOnly={saving}
          type='number'
          min={0} />

        <InputField
          label={R.strings.publicationYear}
          name='publicationYear'
          value={publicationYear}
          onChange={onChange}
          readOnly={saving}
          type='number'
          max={9999} />

        <InputField
          label={R.strings.publisher}
          name='publisher'
          value={publisher}
          onChange={onChange}
          readOnly={saving}
          pattern='.*[\w]+.*'
          maxLength={100} />

        <InputField
          label={R.strings.isbn}
          name='isbn'
          value={isbn}
          onChange={onChange}
          readOnly={saving}
          pattern='.*[\w]+.*'
          maxLength={100} />

        <InputField
          type='textarea'
          label={R.strings.additionalInfo}
          name='additionalInfo'
          value={additionalInfo}
          onChange={onChange}
          readOnly={saving}
          pattern='.*[\w]+.*' />

        <InputField
          type='file'
          label={R.strings.coverPicture}
          name='coverFile'
          onChange={onCoverFileChange}
          readOnly={saving}
          accept="image/*" />

        <div>
          <InputButton type='submit' text={saving ? (`${R.strings.saving}...`) : R.strings.saveBook} disabled={saving} />
        </div>
      </form>
    </div>
  )

BookForm.propTypes = {
  R: PropTypes.object.isRequired,
  pageTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  length: PropTypes.string.isRequired,
  publicationYear: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onCoverFileChange: PropTypes.func.isRequired
}

export default BookForm
