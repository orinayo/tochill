import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChillSpotEditForm from './ChillSpotEditForm'
import { updateChillSpot } from '../../actions'
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

class ChillSpotEdit extends Component {
  onChillSpotUpdateSubmit = (values) => {
    const { history, updateChillSpot, match: { params: { id } } } = this.props
    updateChillSpot(values, history, id)
  }

  render () {
    if (this.props.auth) {
      const { id } = this.props.match.params
      return (
        <div className='new-input'>
          <ChillSpotEditForm onChillSpotUpdateSubmit={this.onChillSpotUpdateSubmit}
            spotId={id} />
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default connect(mapStateToProps, { updateChillSpot })(ChillSpotEdit)
