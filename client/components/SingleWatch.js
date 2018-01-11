import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchLesson } from '../store'

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    const watch = this.props.watch;
    return (
      <div>
        <h2>{watch.make} {watch.model}</h2>
        <ul>
          <li>Complications: {watch.complications}</li>
          <li>Year: {watch.year}</li>
          <li>Image: {watch.imageUrl}</li>
          <li>Price: {lesson.price}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    watch: state.watch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLesson(lessonId) {
      dispatch(fetchWatch(watchId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
