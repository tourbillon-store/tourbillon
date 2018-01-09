import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LESSONS = 'GET_LESSONS';

/**
 * ACTION CREATORS
 */
const getLessons = lessons => ({type: GET_LESSONS, lessons})

/**
 * THUNK CREATORS
 */
export const fetchLessons = () =>
  dispatch =>
    axios.get('/api/lessons')
      .then(lessons => {
        dispatch(getLessons(lessons.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_LESSONS:
      return action.lessons
    default:
      return state
  }
}
