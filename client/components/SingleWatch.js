import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchWatch } from '../store'

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    const watch = this.props.watch;
    const unavailableMessage = watch.available ? '' : 'Currently Unavailable'
    return (
      !watch.loading && <div>
        <img src={watch.imageUrl} />
        <h2>{watch.make} {watch.model}</h2>
        <h3 className='unavailable-watch'>{unavailableMessage}</h3>
        <ul>
          <li>Complications: {watch.complications}</li>
          <li>Year: {watch.year}</li>
          <li>Image: {watch.imageUrl}</li>
          <li>Price: {watch.price}</li>
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
    getWatch(watchId) {
      dispatch(fetchWatch(watchId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
