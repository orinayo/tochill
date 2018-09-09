import React, { Component } from 'react'
import Icon from '../Icon/Icon'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchBox from '../SearchBox/SearchBox'
import { setSearchField } from '../../actions'

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

class Header extends Component {
  onSearchChange = (event) => {
    const { setSearchField } = this.props
    setSearchField(event.target.value)
  }

  renderContent () {
    const { auth } = this.props
    switch (auth) {
      case null:
        return
      case false:
        return (
          [
            <div key={0}>
              <Link to='/login'>
                <button className='btn-inline user-nav__login'>
                  Login
                </button>
              </Link>
            </div>,
            <div key={1}>
              <Link to='/register'>
                <button className='btn-inline user-nav__register'>
                  Sign up
                </button>
              </Link>
            </div>
          ]
        )
      default:
        return (
          [
            <div key={0} className='user-nav__icon-box'>
              <Icon name='bookmark' />
              <span className='user-nav__notification'>
                {this.props.auth.bookmarks.length}
              </span>
            </div>,
            <div key={1} className='user-nav__icon-box'>
              <Icon name='chat' />
              <span className='user-nav__notification'>{this.props.auth.notifications.length}</span>
            </div>,
            <div key={2} className='user-nav__icon-box'>
              <Icon name='credit-card' />
              <span className='user-nav__notification'>{this.props.auth.credits}</span>
            </div>,
            <div key={3} className='user-nav__user'>
              <Link to={{
                pathname: `/users/show`,
                state: {
                  userId: `${this.props.auth._id}`
                }
              }}>
                <img src={this.props.auth.avatar}
                  alt='user' className='user-nav__user-photo' />
              </Link>
              <span className='user-nav__user-name'>{this.props.auth.username}</span>
            </div>,
            <div key={4}>
              <a href='/api/logout' className='btn-inline user-nav__logout'>
                Logout
              </a>
            </div>
          ]
        )
    }
  }

  render () {
    return (
      <header className='header'>
        <Link to='/'>
          <img src='http://res.cloudinary.com/orinayo/image/upload/v1536085205/logo-tochill.png'
            alt='ToChill logo' className='logo' />
        </Link>
        <SearchBox searchChange={this.onSearchChange} />
        <nav className='user-nav'>
          {
            this.renderContent()
          }
        </nav>
      </header>
    )
  }
}

export default connect(mapStateToProps, { setSearchField })(Header)
