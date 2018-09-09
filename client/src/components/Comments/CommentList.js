import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchChillSpot, deleteComment } from '../../actions'

function mapStateToProps ({ chillspot, auth }) {
  return {
    chillspot,
    auth
  }
}

class CommentList extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchChillSpot(id)
  }

  renderComments = () => {
    const spotId = this.props.match.params.id
    const { history } = this.props
    return this.props.chillspot.comments &&
      this.props.chillspot.comments.map(({ author: { username, id }, text, _id }) => {
      return (
        <li className="list__item" key={_id}>
          {text} - <strong>{username}</strong>
          <br/>
          {
            (this.props.auth._id === id || this.props.auth.isAdmin) &&
            <Link to={{pathname: `/chillspots/${spotId}/comments/${_id}/edit`}}>
              <button className='btn-inline u-margin-right-small'>Edit Comment</button>
            </Link>
          }
          {
            (this.props.auth._id === id || this.props.auth.isAdmin) &&
            <button className='btn-inline'
              onClick={() => this.props.deleteComment(history, spotId, _id)} >
              Delete Comment
            </button>
          }
        </li>
      )
    })
  }

  render () {
    return (
      <div className='comments'>
      <ul className="list">                           
        {
          this.renderComments()
        }
      </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchChillSpot, deleteComment })(CommentList)