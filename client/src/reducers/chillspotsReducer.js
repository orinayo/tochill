import {
  FETCH_ALL_CHILL_SPOTS,
  FETCH_CHILL_SPOT,
  CLEAR_CHILL_SPOT,
  CHANGE_SEARCHFIELD
} from '../actions/constants'

export const allChillspotsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH_ALL_CHILL_SPOTS:
      return action.payload
    default:
      return state
  }
}

export const chillspotReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_CHILL_SPOT:
      return action.payload
    case CLEAR_CHILL_SPOT:
      return action.payload
    default:
      return state
  }
}

export const searchChillspotsReducer = (state = '', action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return action.payload
    default:
      return state
  }
}
