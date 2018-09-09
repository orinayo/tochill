import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentEditForm from './CommentEditForm'
import { updateComment } from '../../actions'
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

class CommentEdit extends Component {
  onCommentUpdateSubmit = (values) => {
    const { history, updateComment, match: { params: { id, comment_id } } } = this.props
    updateComment(values, history, id, comment_id)
  }

  render () {
    const { comment_id } = this.props.match.params
    if (this.props.auth) {
      return (
        <div className='new-input'>
          <CommentEditForm onCommentUpdateSubmit={this.onCommentUpdateSubmit}
            commentId={comment_id} />
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default connect(mapStateToProps, { updateComment })(CommentEdit)
