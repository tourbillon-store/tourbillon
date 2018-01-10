import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_WATCHES = 'GET_WATCHES';

/**
 * ACTION CREATORS
 */
const getWatches = watches => ({type: GET_WATCHES, watches})

/**
 * THUNK CREATORS
 */
export const fetchWatches = () =>
  dispatch =>
    axios.get('/api/watches')
      .then(watches => {
        dispatch(getWatches(watches.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_WATCHES:
      return action.watches
    default:
      return state
  }
}
