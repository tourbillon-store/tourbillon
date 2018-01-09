import React from 'react';
import { connect } from 'react-redux'

const Lessons = (props) => {
  const { lessons } = props;
  return (
    <div>
      <ul>
        {lessons.map(lesson => {
          return (
            <div key={lesson.id}>
              <h2>{lesson.name}</h2>
              <li>Category: {lesson.category}</li>
              <li>Description: {lesson.description}</li>
              <li>Image: {lesson.imageUrl}</li>
              <li>Price: {lesson.price}</li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessons
  }
}

export const LessonsContainer = connect(mapStateToProps)(Lessons);
