import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import { createUser } from '../../actions'

class Register extends Component {
  onRegisterFormSubmit = (values) => {
    const { history, createUser } = this.props
    createUser(values, history)
  }
  
  render () {
    return (
      <div className='new-input'>
        <RegisterForm onRegisterFormSubmit={this.onRegisterFormSubmit} />
      </div>
    )
  }
}

export default connect(null, { createUser })(Register)