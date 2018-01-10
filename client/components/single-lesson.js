import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Lesson = (props) => {
  const { lessons, match } = props;
  const lesson = lessons.find(matchingLesson => matchingLesson.id === +match.params.lessonId)
  return (
    <div>
      <ul>
        <div key={lesson.id}>
          <h2>{lesson.name}</h2>
          <li>User: {lesson.userId}</li>
          <li>Category: {lesson.category}</li>
          <li>Description: {lesson.description}</li>
          <li>Image: {lesson.imageUrl}</li>
          <li>Price: {lesson.price}</li>
        </div>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessons
  }
}

export default withRouter(connect(mapStateToProps)(Lesson));
