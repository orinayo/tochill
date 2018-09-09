import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'
import Icon from '../Icon/Icon'

function mapStateToProps ({ chillspot, auth }) {
  return {
    chillspot,
    auth
  }
}

class ChillSpot extends Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchChillSpot(id)
  }

  componentWillUnmount () {
    this.props.clearChillSpot()
  }

  renderIcons = averageRating => {
    if (averageRating > 0) {
      let iconArray = []
      for (let i = 0; i < averageRating; i++) {
        iconArray.push(<Icon name='star' />)
      }
      return iconArray
    }
  }

  renderVisitors = visitors => {
    let visitorsArray = visitors.length < 3 ? visitors : visitors.slice(0, 3)
    return visitorsArray.map(({id, avatar}, i) => {
      return (
        <Link to={{
          pathname: `/users/show`,
          state: {
            userId: (`${id}`)
          }
        }}>
          <img src={avatar} alt={`User ${i}`} className='recommend__photo' />
        </Link>
      )
    })
  }

  renderComments = comments => {
    let commentsArray = comments.length < 3 ? comments : comments.slice(0, 3)
    return commentsArray.map(({ author: { username, avatar }, text, createdAt, rating }, i) => {
      return (
        <figure className='comment'>
          <blockquote key={i} className='comment__text'>
            {text}
          </blockquote>
          <figcaption className='comment__author'>
            <img src={avatar} alt={username} className='comment__photo' />
            <div className='comment__author-box'>
              <p className='comment__author-name'>
                {username}
              </p>
              <p className='comment__author-date'>
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='comment__rating'>{rating}</div>
          </figcaption>
        </figure>
      )
    })
  }

  renderContent () {
    const {
      history,
      match: {
        params: {
          id
        }
      },
      chillspot: {
        name,
        image,
        budget,
        description,
        location,
        lat,
        lon,
        comments,
        visitors,
        author,
        createdAt
      }
    } = this.props

    let ratingsCount = 0
    let averageRating = 0
    let ratings = comments && comments.map(({ rating }) => parseInt(rating, 10))
    ratingsCount = ratings && ratings.length
    let total = ratings && ratings.reduce((acc, curr) => acc + curr, 0)
    averageRating = isNaN(Math.floor(total/ratingsCount)) ? 0 : Math.floor(total/ratingsCount)
    
    return (
      <main className='chillspot-view'>
        <div className='gallery'>
          <figure className='gallery__item'>
            <img className='gallery__photo' src={image} alt={name} />
          </figure>
        </div>
        <div className='overview'>
          <h1 className='overview__heading'>{name}</h1>
          <div className='overview__stars'>
            {
              this.renderIcons(averageRating)              
            }
          </div>
          <div className='overview__location'>
            <Icon name='location-pin' />
            <a href={`https://www.google.com/maps/dir/Current+Location/${lat},${lon}`}
              target='_blank'
              className='btn-inline overview__location-link'>
              {location}
            </a>
          </div>

          <div className='overview__rating'>
            <div className='overview__rating-average'>
              {averageRating}
            </div>
            <div className='overview__rating-count'>
              {ratingsCount} votes
            </div>
          </div>
        </div>

        <div className='detail'>
          <div className='description'>
            <p className='paragraph'>
              {description}
            </p>
            <p className='paragraph'>
              Added by:&nbsp;
              <strong>
                <Link to={{
                  pathname: `/users/show`,
                  state: {
                    userId: (author && `${author.id}`)
                  }
                }} className='profile-link'>
                  {author && author.username} </Link> - {createdAt && new Date(createdAt).toLocaleDateString()}
              </strong>
            </p>
            <p className='paragraph'>
              Budget: About &#8358;{budget}
            </p>
            <div className='recommend'>
              <p className='recommend__count'>
                {visitors && visitors.length} users booked this spot
              </p>
              <div className='recommend__users'>
                {
                  visitors && this.renderVisitors(visitors)
                }
              </div>
            </div>
            <div className='action-buttons u-margin-top-small'>
              {
                ((this.props.auth.bookmarks &&
                !this.props.auth.bookmarks.includes(id)) || this.props.auth.isAdmin) &&
                <button className='btn-inline'
                  onClick={() => this.props.addBookmark(history, id)}>
                  Add Bookmark
                </button>
              }
              {
                name && <Link to={{
                  pathname: `/chillspots/${id}/comments/new`,
                  state: {
                    chillSpotName: `${name}`
                  }
                }}>
                  <button className='btn-inline'>Leave a comment</button>
                </Link>
              }
              {
                (author !== undefined && (this.props.auth._id === author.id || this.props.auth.isAdmin)) &&
                <Link to={{pathname: `/chillspots/${id}/edit`}}>
                  <button className='btn-inline'>Edit Spot</button>
                </Link>
              }
              {
                (author !== undefined && (this.props.auth._id === author.id || this.props.auth.isAdmin)) &&
                <button className='btn-inline'
                  onClick={() => this.props.deleteChillSpot(history, id)}>
                  Delete Spot
                </button>
              }
            </div>
          </div>

          <div className='user-comments'>
            {
              comments && this.renderComments(comments)
            }
            {
              (comments && comments.length > 0) && <Link to={{pathname: `/chillspots/${id}/comments`}}>
                <button className='btn-inline u-margin-bottom-small'>Show all<span>&rarr;</span></button>
              </Link>
            }
          </div>
        </div>
        {
          (this.props.auth.credits > 0) &&
          <div className='cta'>
            <h2 className='cta__book-now'>
              Chill at this spot for 40 - 50% off the budget with your premium points
            </h2>
            <button className='btn'
              onClick={() => this.props.bookChillSpot(history, id, budget)}>
              <span className='btn__visible'>Limited sessions left</span>
              <span className='btn__invisible'>Get deal now</span>
            </button>
          </div>
        }
      </main>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

export default connect(mapStateToProps, actions)(ChillSpot)
