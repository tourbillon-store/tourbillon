import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';
const DELETE_WATCH = 'DELETE_WATCH';

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const deleteUser = userId => ({type: DELETE_USER, userId})
const deleteWatch = watchId => ({type: DELETE_WATCH, watchId})

/**
 * THUNK CREATORS
 */
export const adminFetchUsers = () =>
  dispatch =>
    axios.get('/api/admin/users')
    .then(users => {
      dispatch(getUsers(users.data))
    })
    .catch(err => console.log(err))

export const adminDeleteUser = id =>
  dispatch => {
    return axios.delete(`/api/admin/users/${id}`)
    .then(res => res.data)
    .then(() => dispatch(deleteUser(+id)))
    .then(() => dispatch(adminFetchUsers()))
    .catch(err => console.log(err))
  }

export const adminDeleteWatch = id =>
  dispatch => {
    return axios.delete(`/api/admin/watches/${id}`)
    .then(res => res.data)
    .then(() => dispatch(deleteUser(+id)))
    .then(() => dispatch(adminFetchUsers()))
    .catch(err => console.log(err))
  }


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      return action.userId
    case DELETE_WATCH:
      return action.watchId
    default:
      return state
  }
}
