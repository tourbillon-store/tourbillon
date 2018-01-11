import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_WATCH = 'GET_WATCH';

/**
 * ACTION CREATORS
 */
const getWatch = watch => ({type: GET_WATCH, watch})

/**
 * THUNK CREATORS
 */
export const fetchWatch = (watchId) =>
  dispatch =>
    axios.get(`/api/watches/${watchId}`)
      .then(watch => {
        dispatch(getWatch(watch.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_WATCH:
      return action.watch
    default:
      return state
  }
}
