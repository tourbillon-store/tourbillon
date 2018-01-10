import React from 'react';
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Lessons = (props) => {
  const { lessons } = props;
  return (
    <div>
      <ul>
        {lessons.map(lesson => {
          return (
            <div key={lesson.id}>
              <Link to={`/lessons/${lesson.id}`}><h2>{lesson.name}</h2></Link>
              <li>User: {lesson.userId}</li>
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

export default withRouter(connect(mapStateToProps)(Lessons));
