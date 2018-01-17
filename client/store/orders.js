import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(orders => {
        dispatch(getOrders(orders.data))
      })
      .catch(err => console.log(err))


export const fetchUserOrders = userId =>
  dispatch =>
    axios.get(`/api/users/${userId}/orders`)
      .then(orders => {
        dispatch(getOrders(orders.data))
      })
      .catch(err => console.log(err))

export const updateOrders = (orderId, userId, status, orders) =>
  dispatch =>
    axios.put(`/api/users/${userId}/orders/${orderId}`, status)
      .then(newOrder => {
        orders = orders.map(order => {return order.id === orderId ? newOrder.data : order})
        dispatch(getOrders(orders))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
