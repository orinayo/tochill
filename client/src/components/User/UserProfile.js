import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUserProfile, deleteBookmark } from '../../actions'

const mapStateToProps = ({ userProfile, auth, chillspots }) => {
  return {
    userProfile,
    auth,
    chillspots
  }
}

class UserProfile extends Component {
  componentDidMount () {
    const { userId } = this.props.location.state
    const { history } = this.props
    this.props.fetchUserProfile(history, userId)
  }

  renderUser () {
    const { username, email, avatar, bookmarks } = this.props.userProfile
    const { history } = this.props
    return (
      <main className='user-details'>
        <div className='user-profile'>
          <h2 className='user-profile__heading u-margin-bottom-small'>User Profile</h2>
          <div className='user-profile__info'>
            <p className='user-profile__name'>
              {username}
            </p>
            <a href={`mailto:${email}`}>{email}</a>
            <div className='user-profile__avatar'>
              <img src={avatar} alt='User 1' className='user-profile__photo' />
            </div>
          </div>
          <br />
          <ul className='user-profile__items'>
            <h3>Bookmarked Spots</h3>
            {
              bookmarks &&
              this.props.chillspots.filter(({ _id }) => bookmarks.includes(_id)).map(({ name, _id }) => {
                return (
                  <li className='list__item' key={_id}>
                    <Link className='profile-link u-margin-right-small' to={`/chillspots/${_id}`} >
                      <strong>{name}</strong>
                    </Link>
                    {
                      (this.props.auth._id === this.props.userProfile._id || this.props.auth.isAdmin) &&
                      <button className='btn-inline'
                        onClick={() => this.props.deleteBookmark(history, _id)} >
                        Delete Bookmark
                      </button>
                    }
                  </li>
                )
              })
            }
          </ul>
          <br />
          <ul className='user-profile__items'>
            <h3>Spots Added</h3>
            {
              this.props.chillspots &&
              this.props.chillspots.filter(({ author: { id } }) => id === this.props.userProfile._id)
                .map(({ name, _id }) => {
                  return (
                    <li className='list__item' key={_id}>
                      <Link className='profile-link' to={`/chillspots/${_id}`} >
                        <strong>{name}</strong>
                      </Link>
                    </li>
                  )
                })
            }
          </ul>
          <br />
          <ul className='user-profile__items'>
            <h3>Notifications</h3>
            {
              (this.props.auth._id === this.props.userProfile._id || this.props.auth.isAdmin) &&
              this.props.auth.notifications.map((notification, i) => {
                return (
                  <li className='list__item'>
                    {notification}
                  </li>
                )
              })
            }
          </ul>
          <br />
        </div>
      </main>
    )
  }

  render () {
    return (
      this.renderUser()
    )
  }
}

export default connect(mapStateToProps, { fetchUserProfile, deleteBookmark })(UserProfile)