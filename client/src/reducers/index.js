import { allChillspotsReducer, chillspotReducer, searchChillspotsReducer } from './chillspotsReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'
import resetTokenReducer from './resetTokenReducer'
import { reducer as reduxForm } from 'redux-form'
import { combineReducers } from 'redux'

export default combineReducers({
  chillspots: allChillspotsReducer,
  chillspot: chillspotReducer,
  searchField: searchChillspotsReducer,
  form: reduxForm,
  auth: authReducer,
  userProfile: profileReducer,
  validToken: resetTokenReducer,
  error: errorReducer
})
