import React from 'react';
import {connect} from 'react-redux'

const Lessons = (props) => {
  const { lessons } = props;
  return (
    <div>
      <ul>
        { lessons.map(lesson => {
          return (<li key={lesson.id}>{lesson.description}</li>)
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
