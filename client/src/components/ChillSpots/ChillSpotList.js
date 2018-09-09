import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllChillSpots } from '../../actions'

function mapStateToProps ({ chillspots, searchField }) {
  return {
    chillspots,
    searchField
  }
}

class ChillSpotList extends Component {
  componentDidMount () {
    this.props.fetchAllChillSpots()
  }

  filterChillspots = () => {
    const { searchField, chillspots } = this.props
    return chillspots.filter(({ name }) => {
      return name.toLowerCase().includes(searchField.toLowerCase())
    })
  }

  renderChillSpots = () => {
    const filteredChillSpots = this.filterChillspots()
    return filteredChillSpots.map(({ name, image, description, _id }) => {
      return (
        <div className='chillspot-list__box' key={name}>
          <img src={image} alt='hangout spot' className='chillspot-list__photo' />
          <h2 className='chillspot-list__name'>{name}</h2>
          <Link className='chillspot-list__link' to={`/chillspots/${_id}`}>See More &rarr; </Link>
        </div>
      )
    })
  }

  render () {
    return (
      <div className='chillspots'>
        {
          this.renderChillSpots()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchAllChillSpots })(ChillSpotList)
