import React, { Component } from 'react'
// reduxForm helper allows redux-form communicate with Redux store
// Field component renders any type of HTML form elements
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import FormField from '../Form/FormField'
import { loginFormFields } from '../Form/formFields'

class LoginForm extends Component {
  renderFields () {
    return loginFormFields.map(({ label, name, type }) => {
      return (
        <Field key={name}
          label={label} type={type} name={name} component={FormField} />
      )
    })
  }

  render () {
    const { handleSubmit, onLoginFormSubmit } = this.props
    return (
      <div className='new-input__form'>
        <form className='form' onSubmit={handleSubmit(onLoginFormSubmit)} >
          <h2 className='new-input__heading u-margin-bottom-small'>
            Login
          </h2>
          {
            this.renderFields()
          }
          <div className='form__group'>
            <button className='btn u-margin-bottom-small'>
              <span className='btn__visible'>Ready?</span>
              <span className='btn__invisible'>Login</span>
            </button>
            <br />
            <Link to={`/`}>
              <button className='btn-inline new-input__button u-margin-right-small'>
                Go back
              </button>
            </Link>
            <Link to={`/forgot`}>
              <button className='btn-inline new-input__button u-margin-right-small'>
                Forgot Password?
              </button>
            </Link>
            <a href='/auth/google'
              style={{paddingBottom: '0'}}
              className='btn-inline new-input__button profile-link'>
              Login with google
            </a>
          </div>
        </form>
      </div>
    )
  }
}

// Pass form to reduxForm reducer
export default reduxForm({
  form: 'LoginForm'
})(LoginForm)
