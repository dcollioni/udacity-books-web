import React from 'react'
import PropTypes from 'prop-types'
import './Signin.css'

const Signin = ({ R }) => {
  return (
    <div id='signin'>
      <header>
        <h2>{R.strings.signin}</h2>
      </header>

      <div className='providers'>
        <button>Sign in</button>
      </div>

      <footer>
        <p>
          Designed and developed by <a href="https://dcollioni.github.io/" target="blank">@dcollioni</a>
        </p>
      </footer>
    </div>
  )
}

Signin.propTypes = {
  R: PropTypes.object.isRequired
}

export default Signin