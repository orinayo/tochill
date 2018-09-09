import React, { Component } from 'react'
import { connect } from 'react-redux'
import ForgotForm from './ForgotForm'
import { sendPasswordReset } from '../../actions'

class Forgot extends Component {
  onForgotFormSubmit = (values) => {
    const { history, sendPasswordReset } = this.props
    sendPasswordReset(values, history)
  }
  
  render () {
    return (
      <div className='new-input'>
        <ForgotForm onForgotFormSubmit={this.onForgotFormSubmit} />
      </div>
    )
  }
}

export default connect(null, { sendPasswordReset })(Forgot)