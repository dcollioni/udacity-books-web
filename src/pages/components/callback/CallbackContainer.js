import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Callback from './Callback'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { login, showToast } from '../../../actions'
import auth0 from 'auth0-js'
import { authConfig } from '../../../config'

class CallbackContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      success: !!props.user
    }

    this.handleAuthentication = this.handleAuthentication.bind(this)

    this.auth0 = new auth0.WebAuth({
      domain: authConfig.domain,
      clientID: authConfig.clientId,
      redirectUri: authConfig.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }

  componentDidMount () {
    this.handleAuthentication()
  }

  componentDidUpdate (prevProps) {
    if (!!this.props.user && !prevProps.user) {
      this.setState(() => ({ success: true }))
    }
  }

  async handleAuthentication() {
    const self = this

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('id token: ', authResult.idToken)

        self.auth0.client.userInfo(authResult.accessToken, (err, user) => {
          user.token = authResult.idToken
          self.props.dispatch(login(user))
        })
      } else if (err) {
        console.log(err)
        const errorMessage = self.props.R.strings.failedToSignin
        self.props.dispatch(showToast(errorMessage))
      }
    })
  }

  render () {
    if (this.state.success) {
      return <Redirect to='/' />
    }

    return <Callback />
  }
}

CallbackContainer.propTypes = {
  R: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

const stateToProps = ({ R, user }) => ({
  R,
  user
})

export default withRouter(connect(stateToProps)(CallbackContainer))
