import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResetForm from './ResetForm'
import { resetPassword } from '../../actions'

class Reset extends Component {
  onResetFormSubmit = (values) => {
    const { token } = this.props.match.params
    const { history, resetPassword } = this.props
    resetPassword(values, history, token)
  }
  
  render () {
    return (
      <div className='new-input'>
        <ResetForm onResetFormSubmit={this.onResetFormSubmit} />
      </div>
    )
  }
}

export default connect(null, { resetPassword })(Reset)