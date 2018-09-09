import React, { Component } from 'react'
// reduxForm helper allows redux-form communicate with Redux store
// Field component renders any type of HTML form elements
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import FormField from '../Form/FormField'
import { registerFormFields } from '../Form/formFields'

class RegisterForm extends Component {
  renderFields () {
    return registerFormFields.map(({ label, name, type }) => {
      return (
        <Field key={name}
          label={label} type={type} name={name} component={FormField} />
      )
    })
  }

  render () {
    const { handleSubmit, onRegisterFormSubmit } = this.props
    return (
      <div className='new-input__form'>
        <form className='form' onSubmit={handleSubmit(onRegisterFormSubmit)} >
          <h2 className='new-input__heading u-margin-bottom-small'>
            Sign Up
          </h2>
          {
            this.renderFields()
          }
          <div className='form__group'>
            <button className='btn u-margin-bottom-small'>
              <span className='btn__visible'>Ready?</span>
              <span className='btn__invisible'>Signup</span>
            </button>
            <br />
            <Link to={`/`}>
              <button className='btn-inline new-input__button'>
                Go back
              </button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

// Pass form to reduxForm reducer
export default reduxForm({
  form: 'RegisterForm'
})(RegisterForm)
