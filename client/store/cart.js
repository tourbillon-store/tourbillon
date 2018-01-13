import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_CART = 'DELETE_CART'
const UPDATE_WATCH_QUANTITY_IN_CART = 'UPDATE_CART'
const REMOVE_WATCH_FROM_CART = 'REMOVE_WATCH_FROM_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const flushCart = cart => ({type: DELETE_CART, cart})
const updateWatchQuantityInCart = (watchId, quantity) => ({type: UPDATE_WATCH_QUANTITY_IN_CART, watchId, quantity})
const removeWatchFromCart = cart => ({REMOVE_WATCH_FROM_CART, cart})

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  dispatch =>
    axios.get(`/api/cart`)
      .then(cart => {
        if (cart.data) {
          cart = cart.data[0].watches // filter out extraneous vals
        }
        console.log('cart', cart)
        dispatch(getCart(cart))
      })
      .catch(err => console.log(err))

export const updateCart = (watchId, quantity) =>
  dispatch =>
    axios.put('/api/cart', {watch: watchId, quantity: quantity})
      .then(() => {
        dispatch(updateWatchQuantityInCart(watchId, quantity))
      })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (cart = [], action) {
  let watch = {};
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_WATCH_QUANTITY_IN_CART:
      return cart
    default:
      return cart
  }
}
