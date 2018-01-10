import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LESSON = 'GET_LESSON';

/**
 * ACTION CREATORS
 */
const getLesson = lesson => ({type: GET_LESSON, lesson})

/**
 * THUNK CREATORS
 */
export const fetchLesson = (lessonId) =>
  dispatch =>
    axios.get(`/api/lessons/${lessonId}`)
      .then(lesson => {
        dispatch(getLesson(lesson.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_LESSON:
      return action.lesson
    default:
      return state
  }
}
