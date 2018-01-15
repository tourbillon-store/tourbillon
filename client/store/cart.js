import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const EMPTY_CART = 'EMPTY_CART'
const ADD_WATCH_TO_CART = 'ADD_WATCH_TO_CART'
const UPDATE_WATCH_IN_CART = 'UPDATE_WATCH_IN_CART'
const REMOVE_WATCH_FROM_CART = 'REMOVE_WATCH_FROM_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const emptyCart = cart => ({type: EMPTY_CART, cart})
const addWatchToCart = watch => ({type: ADD_WATCH_TO_CART, watch})
const updateWatchInCart = (watchId, quantity) => ({type: UPDATE_WATCH_IN_CART, watchId, quantity})
const removeWatchFromCart = watchId => ({type: REMOVE_WATCH_FROM_CART, watchId})

/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId || 'visitor'}/cart`)
      .then(res => res.data)
      .then(cart => {
        console.log('fetchCart', cart)
        //sequelize exclude???? flattening on backend
        //api/users/id/cart
        if (cart && cart[0] && cart[0].watches) {
          cart = cart[0].watches.map(watch => {
            return {
              id: watch.id,
              make: watch.make,
              model: watch.model,
              price: watch.price,
              quantity: watch.order_watch.quantity,
              createdAt: watch.order_watch.createdAt
            }
          })
        }
        dispatch(getCart(cart))
      })
      .catch(console.error)

export const pushWatchToCart = (watchId, userId)  =>
  dispatch =>
    axios.post(`/api/users/${userId || 'visitor'}/cart`, { watchId })
      .then(res => res.data)
      .then(watch => {
        console.log('pushedWatch', watch)
        dispatch(addWatchToCart(watch))
      })
      .catch(console.error)

export const updateCart = (watchId, quantity, userId) =>
  dispatch =>
    axios.put(`/api/users/${userId || 'visitor'}/cart/${watchId}`, { quantity })
      .then(res => res.data)
      .then(() => {
        dispatch(updateWatchInCart(watchId, quantity))
      })
      .catch(console.error)

export const deleteWatchFromCart = (watchId, userId) =>
  dispatch =>
    axios.delete(`/api/users/${userId || 'visitor'}/cart/${watchId}`)
      .then(res => res.data)
      .then(() => dispatch(removeWatchFromCart(watchId)))
      .catch(console.error)

/**
 * REDUCER
 */
export default function (state = [], action) {
  let watch
  console.log('watchId', action.watchId)
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_WATCH_TO_CART:
      return [...state.filter(cartWatch => cartWatch.id !== action.watchId), action.watch]
    case UPDATE_WATCH_IN_CART:
      watch = state.find(cartWatch => cartWatch.id === action.watchId)
      if (action.quantity) watch.quantity = action.quantity
      if (action.fixedPrice) watch.fixedPrice = action.fixedPrice
      return [...state.filter(cartWatch => cartWatch.id !== action.watchId), watch]
    case REMOVE_WATCH_FROM_CART:
      return [...state.filter(cartWatch => cartWatch.id !== action.watchId)]
    case EMPTY_CART:
      return []
    default:
      return state
  }
}
