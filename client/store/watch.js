import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_WATCH = 'GET_WATCH'
//when going back to view all watches
const RESET_WATCH = 'RESET_WATCH'

/**
 * ACTION CREATORS
 */
export const getWatch = watch => ({type: GET_WATCH, watch})
export const resetWatch = watch => ({type: RESET_WATCH, watch})

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
//add loading to only render the page after successful data fetch
export default function (state = {loading: true}, action) {
  switch (action.type) {
    case GET_WATCH:
      action.watch.loading = false;
      return action.watch
    case RESET_WATCH:
      return action.watch
    default:
      return state
  }
}
