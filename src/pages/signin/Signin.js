import React from 'react'
import PropTypes from 'prop-types'
import { InputButton } from './../components'
import './Signin.css'

const Signin = ({ R, onClickSignIn }) => {
  return (
    <div id='signin'>
      <header>
        <h2>{R.strings.signin}</h2>
      </header>

      <div className='providers'>
        <InputButton onClick={onClickSignIn} text="Sign in" />
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
  R: PropTypes.object.isRequired,
  onClickSignIn: PropTypes.func.isRequired
}

export default Signin
