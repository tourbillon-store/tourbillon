/**
 * ACTION TYPES
 */
const ADD_SHIPPING_DETAILS = 'ADD_SHIPPING_DETAILS'
const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE'

/**
 * ACTION CREATORS
 */
export const addShippingDetails = values => ({type: ADD_SHIPPING_DETAILS, values})
export const completePurchase = () => ({type: COMPLETE_PURCHASE})

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case ADD_SHIPPING_DETAILS:
      return {...state, ...action.values}
    case COMPLETE_PURCHASE:
      return {}
    default:
      return state
  }
}
