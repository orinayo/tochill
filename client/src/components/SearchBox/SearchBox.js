import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SearchBox extends Component {
  render () {
    return (
      <form className='search'>
        <input aria-label='Search for chill spots'
          type='search'
          className='search__input'
          placeholder='Search for chill spots'
          onChange={this.props.searchChange} />
      </form>
    )
  }
}

export default withRouter(SearchBox)
