import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/index'

const reduxLogger = createLogger()

const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware, reduxLogger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
