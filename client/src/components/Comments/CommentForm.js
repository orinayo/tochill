import React, { Component } from 'react'
// reduxForm helper allows redux-form communicate with Redux store
// Field component renders any type of HTML form elements
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import FormField from '../Form/FormField'
import { commentFormFields } from '../Form/formFields'

class CommentForm extends Component {
  renderFields () {
    return commentFormFields.map(({ label, name, type }) => {
      return (
        <Field key={name}
          label={label} type={type} name={`comment[${name}]`} component={FormField} />
      )
    })
  }

  render () {
    const { handleSubmit, onCommentFormSubmit, chillSpotId, chillSpotName } = this.props
    return (
      <div className='new-input__form'>
        <form className='form' onSubmit={handleSubmit(onCommentFormSubmit)} >
          <h2 className='new-input__heading u-margin-bottom-small'>
            Add New Comment to {chillSpotName}
          </h2>
          {
            this.renderFields()
          }
          <div className='form__group'>
            <button className='btn u-margin-bottom-small'>
              <span className='btn__visible'>Ready?</span>
              <span className='btn__invisible'>Submit</span>
            </button>
            <br />
            <Link to={`/chillspots/${chillSpotId}`}>
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

export default reduxForm({
  form: 'CommentForm'
})(CommentForm)
