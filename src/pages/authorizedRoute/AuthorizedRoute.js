import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Fetcher from './../../utils/Fetcher'

class AuthorizedRoute extends Component {
  render () {
    const { component: Component, R, user, dispatch, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        if (!user) {
          return <Redirect to='/signin' />
        }

        props.R = R
        props.user = user
        props.fetcher = new Fetcher(user.token, dispatch)
        return <Component {...props} />
      }} />
    )
  }
}

AuthorizedRoute.propTypes = {
  R: PropTypes.object.isRequired,
  user: PropTypes.object
}

const stateToProps = ({ R, user }) => ({
  R,
  user
})

export default connect(stateToProps)(AuthorizedRoute)
