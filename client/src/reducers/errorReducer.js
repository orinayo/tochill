import { ERROR_OCCURRED } from '../actions/constants'

const initialStateError = {
  error: null,
  message: ''
}

const errorReducer = (state = initialStateError, action = {}) => {
  switch (action.type) {
    case ERROR_OCCURRED:
      return Object.assign({}, state, { error: new Error(), message: action.payload })
    default:
      return state
  }
}

export default errorReducer
