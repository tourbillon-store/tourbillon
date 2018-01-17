import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS';
const CREATE_REVIEW = 'CREATE_REVIEW';

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const createReview = review => ({type: CREATE_REVIEW, review})

/**
 * THUNK CREATORS
 */
export const fetchReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(reviews => {
        dispatch(getReviews(reviews.data))
      })
      .catch(err => console.log(err))

export const postReview = review =>
  dispatch =>
    axios.post('/api/reviews', review)
      .then(newReview => {
        newReview = newReview.data
        newReview.watch = review.watch
        newReview.user = review.user
        return dispatch(createReview(newReview))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case CREATE_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
