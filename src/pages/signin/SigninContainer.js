import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Signin from './Signin'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import auth0 from 'auth0-js'
import { authConfig } from '../../config'

class SigninContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      success: !!props.user
    }

    this.handleClickSignIn = this.handleClickSignIn.bind(this)

    this.auth0 = new auth0.WebAuth({
      domain: authConfig.domain,
      clientID: authConfig.clientId,
      redirectUri: authConfig.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }

  componentDidUpdate (prevProps) {
    if (!!this.props.user && !prevProps.user) {
      this.setState(() => ({ success: true }))
    }
  }

  async handleClickSignIn () {
    console.log('handleClickSignIn')
    this.auth0.authorize()
  }

  render () {
    if (this.state.success) {
      return <Redirect to='/' />
    }

    return <Signin {...this.props} {...this.state}
      onClickSignIn={this.handleClickSignIn} />
  }
}

SigninContainer.propTypes = {
  R: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

const stateToProps = ({ R, user }) => ({
  R,
  user
})

export default withRouter(connect(stateToProps)(SigninContainer))
