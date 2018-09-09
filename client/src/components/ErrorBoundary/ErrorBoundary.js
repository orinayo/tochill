import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ error }) => {
  return {
    error
  }
}

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch (err, info) {
    if (err) {
      this.setState({
        hasError: true
      })
    }
  }

  render () {
    const { hasError } = this.state
    console.log(this.props.error)
    if (hasError) {
      return <h2>{this.props.error.message || 'An error occurred'}</h2>
    }
    return this.props.children
  }
}

export default connect(mapStateToProps)(ErrorBoundary)
