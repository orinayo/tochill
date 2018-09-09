import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Icon from '../Icon/Icon'

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

class StripeBilling extends Component {
  render () {
    if (this.props.auth) {
      return (
        <li className='side-nav__item'>
          <StripeCheckout
            name='To Chill'
            description={`N10000 for 10 chill points`}
            amount={1000000}
            currency='NGN'
            token={token => this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
          >
            <p className='side-nav__link'>
              <Icon name='key' />
              GET PREMIUM
            </p>
          </StripeCheckout>
        </li>
      )
    }
    return (
      <li></li>
    )
  }
}

export default connect(mapStateToProps, actions)(StripeBilling)
