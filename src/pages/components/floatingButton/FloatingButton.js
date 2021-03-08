import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './FloatingButton.css'

const FloatingButton = ({ icon, url, title }) => (
  <div className='floating-button-wrapper'>
  <Link className={`floating-button ${icon}`} to={url} title={title} />
  </div>
)

FloatingButton.propTypes = {
  icon: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default FloatingButton
