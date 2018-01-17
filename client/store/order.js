import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
//when going back to view all orders
const RESET_ORDER = 'RESET_ORDER'

/**
 * ACTION CREATORS
 */
export const getOrder = order => ({type: GET_ORDER, order})
export const resetOrder = order => ({type: RESET_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchOrder = orderId =>
  dispatch =>
    axios.get(`/api/orders/${orderId}`)
      .then(order => {
        dispatch(getOrder(order.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
//add loading to only render the page after successful data fetch
export default function (state = {loading: true}, action) {
  switch (action.type) {
    case GET_ORDER:
      action.order.loading = false;
      return action.order
    case RESET_ORDER:
      return action.order
    default:
      return state
  }
}
