import axios from 'axios'
import {
  FETCH_ALL_CHILL_SPOTS,
  FETCH_CHILL_SPOT,
  CLEAR_CHILL_SPOT,
  FETCH_USER,
  FETCH_USER_PROFILE,
  VALIDATE_RESET_TOKEN,
  CHANGE_SEARCHFIELD,
  ERROR_OCCURRED
} from './constants'

// INDEX
export const fetchAllChillSpots = () => async dispatch => {
  const res = await axios.get('/api/chillspots')
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    dispatch({
      type: FETCH_ALL_CHILL_SPOTS, payload: res.data
    })
  }
}

// CREATE
export const createChillSpot = (values, history) => async dispatch => {
  const res = await axios.post('/api/chillspots', values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    history.push('/chillspots')
  }
}

// INDEX
export const fetchChillSpot = id => async dispatch => {
  const res = await axios.get(`/api/chillspots/${id}`)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    dispatch({
      type: FETCH_CHILL_SPOT, payload: res.data
    })
  }
}

// UPDATE
export const updateChillSpot = (values, history, id) => async dispatch => {
  const res = await axios.put(`/api/chillspots/${id}`, values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push(`/chillspots`)
  } else {
    history.push(`/chillspots/${id}`)
  }
}

// DESTROY
export const deleteChillSpot = (history, id) => async dispatch => {
  const res = await axios.delete(`/api/chillspots/${id}`)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    history.push('/chillspots')
  }
}

// COMPONENT DID UNMOUNT
export const clearChillSpot = () => dispatch => {
  dispatch({
    type: CLEAR_CHILL_SPOT, payload: {}
  })
}

// CREATE
export const createComment = (values, history, id) => async dispatch => {
  const res = await axios.post(`/api/chillspots/${id}/comments`, values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push('/chillspots')
  } else {
    history.push(`/chillspots/${id}`)
  }
}

// UPDATE
export const updateComment = (values, history, id, commentId) => async dispatch => {
  const res = await axios.put(`/api/chillspots/${id}/comments/${commentId}`, values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push(`/chillspots`)
  } else {
    history.push(`/chillspots/${id}`)
  }
}

// DESTROY
export const deleteComment = (history, id, commentId) => async dispatch => {
  const res = await axios.delete(`/api/chillspots/${id}/comments/${commentId}`)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    history.push('/chillspots')
  }
}

// CREATE
export const createUser = (values, history) => async dispatch => {
  const res = await axios.post('/api/register', values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push('/register')
  } else {
    history.push('/chillspots')
    dispatch({
      type: FETCH_USER, payload: res.data
    })
  }
}

// LOGIN
export const loginUser = (values, history) => async dispatch => {
  const res = await axios.post('/api/login', values)
  if (res.data.message) {
    history.push('/login')
  } else {
    history.push('/chillspots')
    dispatch({
      type: FETCH_USER, payload: res.data
    })
  }
}

// AUTH
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({
    type: FETCH_USER, payload: res.data
  })
}

// INDEX
export const fetchUserProfile = (history, id) => async dispatch => {
  const res = await axios.get(`/api/users/${id}`)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push('/')
  } else {
    dispatch({
      type: FETCH_USER_PROFILE, payload: res.data
    })
  }
}

// UPDATE
export const addBookmark = (history, spotId) => async dispatch => {
  const res = await axios.put(`/api/bookmarks/${spotId}`)
  dispatch(fetchUser())
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push('/chillspots')
  } else {
    history.push(`/chillspots`)
  }
}

// DESTROY
export const deleteBookmark = (history, spotId) => async dispatch => {
  const res = await axios.delete(`/api/bookmarks/${spotId}`)
  dispatch(fetchUser())
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    history.push('/chillspots')
  }
}

// CREATE
export const sendPasswordReset = (values, history) => async dispatch => {
  const res = await axios.post('/api/forgot', values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push('/forgot')
  } else {
    history.push(`/chillspots`)
  }
}

// VALIDATE RESET
export const validateResetToken = token => async dispatch => {
  const res = await axios.get(`/api/reset/${token}`)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    dispatch({
      type: VALIDATE_RESET_TOKEN, payload: res.data
    })
  }
}

// UPDATE
export const resetPassword = (values, history, token) => async dispatch => {
  const res = await axios.post(`/api/reset/${token}`, values)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
    history.push('/reset')
  } else {
    dispatch({
      type: FETCH_USER, payload: res.data
    })
    history.push(`/chillspots`)
  }
}

// SEARCH
export const setSearchField = text => dispatch => {
  dispatch({
    type: CHANGE_SEARCHFIELD, payload: text
  })
}

// UPDATE
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  }
  dispatch({
    type: FETCH_USER, payload: res.data
  })
}

// UPDATE
export const bookChillSpot = (history, id, budget) => async dispatch => {
  const res = await axios.put(`/api/book/chillspots/${id}/budget/${budget}`)
  if (res.data.message) {
    dispatch({
      type: ERROR_OCCURRED, payload: res.data.message
    })
  } else {
    dispatch({
      type: FETCH_USER, payload: res.data
    })
    history.push(`/chillspots`)
  }
}
