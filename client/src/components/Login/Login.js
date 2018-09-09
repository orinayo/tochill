import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { loginUser } from '../../actions'

class Login extends Component {
  onLoginFormSubmit = (values) => {
    const { history, loginUser } = this.props
    loginUser(values, history)
  }
  
  render () {
    return (
      <div className='new-input'>
        <LoginForm onLoginFormSubmit={this.onLoginFormSubmit} />
      </div>
    )
  }
}

export default connect(null, { loginUser })(Login)