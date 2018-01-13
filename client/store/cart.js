import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const EMPTY_CART = 'EMPTY_CART'
const UPDATE_WATCH_IN_CART = 'UPDATE_CART'
const REMOVE_WATCH_FROM_CART = 'REMOVE_WATCH_FROM_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const emptyCart = cart => ({type: EMPTY_CART, cart})
const updateWatchInCart = (watchId, quantity) => ({type: UPDATE_WATCH_IN_CART, watchId, quantity})
const removeWatchFromCart = cart => ({REMOVE_WATCH_FROM_CART, cart})

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  dispatch =>
    axios.get(`/api/cart`)
      .then(cart => {
        if (cart.data) {
          cart = cart.data[0].watches.map(watch => {
            return {
              id: watch.id,
              make: watch.make,
              model: watch.model,
              price: watch.price,
              quantity: watch.order_watch.quantity,
              createdAt: watch.createdAt
            }
          })
        }
        dispatch(getCart(cart))
      })
      .catch(console.error)

export const updateCart = (watchId, quantity) =>
  dispatch =>
    axios.put('/api/cart', { watchId, quantity })
      .then(watch => watch.data)
      .then(() => {
        dispatch(updateWatchInCart(watchId, quantity))
      })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = [], action) {
  let watch
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_WATCH_IN_CART:
      watch = state.find(cartWatch => cartWatch.id === action.watchId)
      if (action.quantity) watch.quantity = action.quantity
      if (action.fixedPrice) watch.fixedPrice = action.fixedPrice
      return [...state.filter(cartWatch => cartWatch.id !== action.watchId), watch]
    case EMPTY_CART:
      return []
    default:
      return state
  }
}
