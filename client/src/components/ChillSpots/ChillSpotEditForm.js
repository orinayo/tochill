import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { chillSpotFormFields } from '../Form/formFields'
import FormField from '../Form/FormField'

const mapStateToProps = ({ chillspot }) => {
  return {
    chillspot
  }
}

class ChillSpotEditForm extends Component {
  componentDidMount () {
    this.handleInitialize()
  }

  handleInitialize () {
    const initData = {
      'name': this.props.chillspot.name,
      'image': this.props.chillspot.image,
      'description': this.props.chillspot.description,
      'location': this.props.chillspot.location,
      'budget': this.props.chillspot.budget
    }

    this.props.initialize(initData)
  }

  renderFields () {
    return chillSpotFormFields.map(({ label, name, type }) => {
      return (
        <Field key={name}
          label={label} type={type} name={name} component={FormField} />
      )
    })
  }

  render () {
    const { handleSubmit, onChillSpotUpdateSubmit, spotId } = this.props
    return (
      <div className='new-input__form'>
        <form className='form' onSubmit={handleSubmit(onChillSpotUpdateSubmit)} >
          <h2 className='new-input__heading u-margin-bottom-small'>
            Edit Spot
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
            <Link to={`/chillspots/${spotId}`}>
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
  form: 'ChillSpotEditForm'
})(ChillSpotEditForm))
