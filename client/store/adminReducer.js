import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const deleteUser = user => ({type: DELETE_USER, userId})

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
  dispatch =>
    axios.delete(`api/admin/users/${id}`)
    .then(res => res.data)
    .then(() => dispatch(deleteUser(+id)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      return action.user
    default:
      return state
  }
}
