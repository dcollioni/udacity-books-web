import React from 'react'
import PropTypes from 'prop-types'
import './InputButton.css'

const InputButton = ({ type, text, disabled, className, onClick }) => (
  <button
    className={`input-button ${className}`}
    type={type || 'button'}
    disabled={disabled}
    onClick={onClick}>
    {text}
  </button>
)

InputButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default InputButton
