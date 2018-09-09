import {
  VALIDATE_RESET_TOKEN
} from '../actions/constants'

const resetTokenReducer = (state = null, action) => {
  switch (action.type) {
    case (VALIDATE_RESET_TOKEN):
      return action.payload
    default:
      return state
  }
}

export default resetTokenReducer