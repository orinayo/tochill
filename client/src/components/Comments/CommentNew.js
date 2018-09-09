import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import { createComment } from '../../actions'
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

class CommentNew extends Component {
  onCommentFormSubmit = (values) => {
    const { history, createComment, match: { params: { id } } } = this.props
    createComment(values, history, id)
  }
  
  render () {
    if (this.props.auth) {
      const { id } = this.props.match.params
      const { chillSpotName } = this.props.location.state
      return (
        <div className='new-input'>
          <CommentForm onCommentFormSubmit={this.onCommentFormSubmit}
            chillSpotId={id}
            chillSpotName={chillSpotName} />
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default connect(mapStateToProps, { createComment })(CommentNew)