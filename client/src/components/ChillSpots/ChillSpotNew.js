import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChillSpotForm from './ChillSpotForm'
import { createChillSpot } from '../../actions'
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

class ChillSpotNew extends Component {
  onChillSpotFormSubmit = (values) => {
    const { history, createChillSpot } = this.props
    createChillSpot(values, history)
  }

  render () {
    if (this.props.auth) {
      return (
        <div className='new-input'>
          <ChillSpotForm onChillSpotFormSubmit={this.onChillSpotFormSubmit} />
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default connect(mapStateToProps, { createChillSpot })(ChillSpotNew)
