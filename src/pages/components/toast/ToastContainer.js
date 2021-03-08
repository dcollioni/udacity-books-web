import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Toast from './Toast'

class ToastContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      status: ''
    }

    this.fadeOut = null
    this.scheduleFadeOut = this.scheduleFadeOut.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.showToast > this.props.showToast) {
      this.setState(() => ({ status: 'show' }))
      this.scheduleFadeOut()
    }
  }

  scheduleFadeOut () {
    clearTimeout(this.fadeOut)
    this.fadeOut = setTimeout(() => {
      this.setState(() => ({ status: 'hide' }))
    }, 3000)
  }

  render () {
    return (
      <Toast message={this.props.toastMessage} status={this.state.status} />
    )
  }
}

ToastContainer.propTypes = {
  showToast: PropTypes.number,
  toastMessage: PropTypes.string
}

const stateToProps = ({ showToast, toastMessage }) => ({
  toastMessage,
  showToast
})

export default withRouter(connect(stateToProps)(ToastContainer))
