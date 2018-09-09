import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Header from '../components/Header/Header'
import SideBar from '../components/Navigation/SideBar'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import Forgot from '../components/Forgot/Forgot'
import Reset from '../components/Reset/Reset'
import Dashboard from '../components/Dashboard/Dashboard'
import LandingPage from '../components/LandingPage/LandingPage'
import ChillSpot from '../components/ChillSpots/ChillSpot'
import ChillSpotNew from '../components/ChillSpots/ChillSpotNew'
import ChillSpotEdit from '../components/ChillSpots/ChillSpotEdit'
import CommentNew from '../components/Comments/CommentNew'
import CommentList from '../components/Comments/CommentList'
import CommentEdit from '../components/Comments/CommentEdit'
import UserProfile from '../components/User/UserProfile'

class App extends Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <div className='content'>
              <SideBar />
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/forgot' component={Forgot} />
                <Route exact path='/reset/:token' component={Reset} />
                <Route exact path='/chillspots' component={Dashboard} />
                <Route exact path='/chillspots/new' component={ChillSpotNew} />
                <Route exact path='/chillspots/:id' component={ChillSpot} />
                <Route exact path='/chillspots/:id/edit' component={ChillSpotEdit} />
                <Route exact path='/chillspots/:id/comments' component={CommentList} />
                <Route exact path='/chillspots/:id/comments/new' component={CommentNew} />
                <Route exact path='/chillspots/:id/comments/:comment_id/edit' component={CommentEdit} />
                <Route exact path='/users/show' component={UserProfile} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
