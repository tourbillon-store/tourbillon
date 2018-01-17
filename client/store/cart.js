import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const EMPTY_CART = 'EMPTY_CART'
const ADD_WATCH_TO_CART = 'ADD_WATCH_TO_CART'
const UPDATE_WATCH_IN_CART = 'UPDATE_WATCH_IN_CART'
const REMOVE_WATCH_FROM_CART = 'REMOVE_WATCH_FROM_CART'
const SHOW_QUANTITY_UNDERFLOW_ERROR = 'SHOW_QUANTITY_UNDERFLOW_ERROR'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const emptyCart = cart => ({type: EMPTY_CART, cart})
const addWatchToCart = watch => ({type: ADD_WATCH_TO_CART, watch})
const updateWatchInCart = (watchId, quantity) => ({type: UPDATE_WATCH_IN_CART, watchId, quantity})
const removeWatchFromCart = watchId => ({type: REMOVE_WATCH_FROM_CART, watchId})
export const showQuantityUnderflowError = watchId => ({type: SHOW_QUANTITY_UNDERFLOW_ERROR, watchId})

/**
 * THUNK CREATORS
 */
export const flushCart = userId =>
  dispatch => {
    if (userId) {
      axios.put(`/api/users/${userId}/new`)
      .then(res => res.data)
      .then(() => {
        dispatch(emptyCart())
      })
    } else {
      dispatch(emptyCart())
    }
    console.log('history', history)
    history.push('/watches')
  }

export const fetchCart = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId || 'visitor'}/cart`)
      .then(res => res.data)
      .then(cart => {
        console.log('fetchCart', cart)
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

export const pushWatchToCart = (watch, userId) =>
  dispatch =>
    axios.post(`/api/users/${userId || 'visitor'}/cart/${watch.id}`, { watch })
      .then(res => res.data)
      .then(pushedWatch => {
        dispatch(addWatchToCart(pushedWatch))
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
/* eslint-disable complexity */
export default function (state = [], action) {
  let watch
  switch (action.type) {
    case GET_CART:
      return action.cart.sort((a, b) => a.createdAt > b.createdAt)
    case ADD_WATCH_TO_CART:
      return [...state.filter(cartWatch => cartWatch.id !== action.watch.id), action.watch]
      .sort((a, b) => a.createdAt > b.createdAt)
    case UPDATE_WATCH_IN_CART:
      watch = state.find(cartWatch => cartWatch.id === action.watchId)
      if (action.quantity) watch.quantity = action.quantity
      if (watch && watch.underflowErr) delete watch.underflowErr
      return [...state.filter(cartWatch => cartWatch.id !== action.watchId), watch]
        .sort((a, b) => a.createdAt > b.createdAt)
    case SHOW_QUANTITY_UNDERFLOW_ERROR:
      watch = state.find(cartWatch => cartWatch.id === action.watchId)
      watch.underflowErr = true
      return [...state.filter(cartWatch => cartWatch.id !== action.watchId), watch]
      .sort((a, b) => a.createdAt > b.createdAt)
    case REMOVE_WATCH_FROM_CART:
      return state.filter(cartWatch => cartWatch.id !== action.watchId)
    case EMPTY_CART:
      return []
    default:
      return state
  }
}
