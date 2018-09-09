import {
  FETCH_USER_PROFILE
} from '../actions/constants'

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case (FETCH_USER_PROFILE):
      return action.payload
    default:
      return state
  }
}

export default profileReducer
