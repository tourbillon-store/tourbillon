import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_WATCHES = 'GET_WATCHES'
const CREATE_WATCH = 'CREATE_WATCH'

/**
 * ACTION CREATORS
 */
const getWatches = watches => ({type: GET_WATCHES, watches})
const createWatch = watch => ({type: CREATE_WATCH, watch})

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

export const postWatch = watch =>
  dispatch =>
    axios.post('/api/watches', watch)
      .then(newWatch => {
        return dispatch(createWatch(newWatch.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_WATCHES:
      return action.watches
    case CREATE_WATCH:
      return [...state, action.watch]
    default:
      return state
  }
}
