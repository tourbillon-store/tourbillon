import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEW = 'GET_REVIEW'
//when going back to view all reviewes
const RESET_REVIEW = 'RESET_REVIEW'

/**
 * ACTION CREATORS
 */
export const getReview = review => ({type: GET_REVIEW, review})
export const resetReview = review => ({type: RESET_REVIEW, review})

/**
 * THUNK CREATORS
 */
export const fetchReview = (reviewId) =>
  dispatch =>
    axios.get(`/api/reviewes/${reviewId}`)
      .then(review => {
        dispatch(getReview(review.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
//add loading to only render the page after successful data fetch
export default function (state = {loading: true}, action) {
  switch (action.type) {
    case GET_REVIEW:
      action.review.loading = false;
      return action.review
    case RESET_REVIEW:
      return action.review
    default:
      return state
  }
}
