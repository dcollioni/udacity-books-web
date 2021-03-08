import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Settings from './Settings'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout, changeLanguage } from '../../actions'
import auth0 from 'auth0-js'
import { authConfig } from '../../config'
const { confirm } = window

class SettingsContainer extends Component {
  constructor (props) {
    super(props)

    this.fetcher = this.props.fetcher

    this.state = {}

    this.handleClickSignOut = this.handleClickSignOut.bind(this)
    this.handleClickLanguage = this.handleClickLanguage.bind(this)

    this.auth0 = new auth0.WebAuth({
      domain: authConfig.domain,
      clientID: authConfig.clientId,
      redirectUri: authConfig.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  }

  handleClickSignOut () {
    const confirmSignOut = confirm(this.props.R.strings.wantToSignOut)

    if (confirmSignOut) {
      this.auth0.logout({ returnTo: authConfig.logoutReturnUrl })
      this.props.dispatch(logout())
    }
  }

  handleClickLanguage (language) {
    this.props.dispatch(changeLanguage(language))
  }

  render () {
    return <Settings {...this.props}
      {...this.state}
      onClickSignOut={this.handleClickSignOut}
      onClickLanguage={this.handleClickLanguage} />
  }
}

SettingsContainer.propTypes = {
  R: PropTypes.object.isRequired,
  fetcher: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

const stateToProps = ({ user, settings }) => ({
  user,
  settings
})

export default withRouter(connect(stateToProps)(SettingsContainer))
