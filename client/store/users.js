import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
const ADMIN_GET_USERS = 'ADMIN_GET_USERS';

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const adminGetUsers = users => ({type: ADMIN_GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(users => {
        dispatch(getUsers(users.data))
      })
      .catch(err => console.log(err))

export const adminFetchUsers = () =>
  dispatch =>
    axios.get('/api/admin/users')
      .then(users => {
        dispatch(adminGetUsers(users.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case ADMIN_GET_USERS:
      return action.users
    default:
      return state
  }
}
