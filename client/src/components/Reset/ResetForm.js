import React, { Component } from 'react'
// reduxForm helper allows redux-form communicate with Redux store
// Field component renders any type of HTML form elements
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import FormField from '../Form/FormField'
import { resetFormFields } from '../Form/formFields'

const mapStateToProps = ({ validToken }) => {
  return {
    validToken
  }
}

class ResetForm extends Component {
  componentDidMount () {
    const token = window.location.href.split('/').slice(-1)[0]
    this.props.validateResetToken(token)
  }
  renderFields () {
    return resetFormFields.map(({ label, name, type }) => {
      return (
        <Field key={name}
          label={label} type={type} name={name} component={FormField} />
      )
    })
  }

  render () {
    const { handleSubmit, onResetFormSubmit, validToken } = this.props
    if (validToken) {
      return (
        <div className='new-input__form'>
          <form className='form' onSubmit={handleSubmit(onResetFormSubmit)} >
            <h2 className='new-input__heading u-margin-bottom-small'>
              Reset Password
            </h2>
            {
              this.renderFields()
            }
            <div className='form__group'>
              <button className='btn u-margin-bottom-small'>
                <span className='btn__visible'>Ready?</span>
                <span className='btn__invisible'>Reset</span>
              </button>
              <br />
              <Link to={`/login`}>
                <button className='btn-inline new-input__button'>
                  Go back
                </button>
              </Link>
            </div>
          </form>
        </div>
      )
    }
    return (
      <div className='new-input__form'>
        <h4>
          Password reset token is invalid or has expired
        </h4>
      </div>
    )
  }
}

// Pass form to reduxForm reducer
export default connect(mapStateToProps, actions)(reduxForm({
  form: 'ResetForm'
})(ResetForm))
