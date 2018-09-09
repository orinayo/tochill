import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { commentFormFields } from '../Form/formFields'
import FormField from '../Form/FormField'

const mapStateToProps = ({ chillspot }) => {
  return {
    chillspot
  }
}

class CommentEditForm extends Component {
  componentDidMount () {
    this.handleInitialize()
  }

  handleInitialize () {
    const text = this.props.chillspot.comments.filter(({ _id }) => _id === this.props.commentId)
    const initData = {
      'text': text[0].text
    }

    this.props.initialize(initData)
  }

  renderFields () {
    return commentFormFields.map(({ label, name, type }) => {
      return (
        <Field key={name}
          label={label} type={type} name={name} component={FormField} />
      )
    })
  }

  render () {
    const { handleSubmit, onCommentUpdateSubmit } = this.props
    return (
      <div className='new-input__form'>
        <form className='form' onSubmit={handleSubmit(onCommentUpdateSubmit)} >
          <h2 className='new-input__heading u-margin-bottom-small'>
            Edit Comment
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
            <Link to={`/chillspots/${this.props.chillspot._id}/comments`}>
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

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'CommentEditForm'
})(CommentEditForm))
