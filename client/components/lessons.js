import React from 'react';
import { connect } from 'react-redux'

const Lessons = (props) => {
  const { lessons } = props;
  return (
    <div>
      {lessons.map(lesson => {
        return (
        // Maybe consider dummy lesson component. 
          <div key={lesson.id}>
            <h2>{lesson.name}</h2>
            <ul>
              <li>Category: {lesson.category}</li>
              <li>Description: {lesson.description}</li>
              <li>Image: {lesson.imageUrl}</li>
              <li>Price: {lesson.price}</li>
            </ul>
          </div>
        )
      })} 
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessons
  }
}

export const LessonsContainer = connect(mapStateToProps)(Lessons);
