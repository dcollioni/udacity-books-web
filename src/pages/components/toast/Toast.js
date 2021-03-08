import React from 'react'
import PropTypes from 'prop-types'
import './Toast.css'

const Toast = ({ message, status }) => {
  return (
    <div id='toast' className={status === 'show' ? 'fadeIn' : status === 'hide' ? 'fadeOut' : ''}>
      <p>{message}</p>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string.isRequired
}

export default Toast
