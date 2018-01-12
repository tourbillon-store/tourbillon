import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})
const deleteCart = cart => ({type: DELETE_CART, cart})

/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}/cart`)
      .then(cart => {
        dispatch(getCart(cart.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (cart = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return cart
  }
}
