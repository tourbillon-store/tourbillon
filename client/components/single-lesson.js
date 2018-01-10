import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchLesson } from '../store'

class Lesson extends Component {
  componentDidMount() {
    this.props.getLesson(+this.props.match.params.lessonId);
  }

  render() {
    const lesson = this.props.lesson;
    return (
      <div>
        <h2>{lesson.name}</h2>
        <ul>
          <li>User: {lesson.userId}</li>
          <li>Category: {lesson.category}</li>
          <li>Description: {lesson.description}</li>
          <li>Image: {lesson.imageUrl}</li>
          <li>Price: {lesson.price}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lesson: state.lesson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLesson(lessonId) {
      dispatch(fetchLesson(lessonId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lesson));
