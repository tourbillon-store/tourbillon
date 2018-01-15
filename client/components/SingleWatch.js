import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchWatch, pushWatchToCart } from '../store'

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    const {watch, addWatchToCart} = this.props;
    console.log('singleWatch', watch)
    const unavailableMessage = watch.available ? '' : 'Currently Unavailable'
    return (
      !watch.loading && <div>
        {/* use classNames! */}
        <img src={watch.imageUrl} />
        <h2>{watch.make} {watch.model}</h2>
        { !watch.available &&
        (<h3 className='unavailable-watch'>{unavailableMessage}</h3>)
        }
        {/* conditional rendering! you sneaks :P */}
        <ul>
          <li>Complications: {watch.complications}</li>
          <li>Year: {watch.year}</li>
          <li>Price: {watch.price}</li>
        </ul>
        {watch.available &&
          <button onClick={() => addWatchToCart(watch.id)}>Add to Cart</button>
        }
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
    },
    addWatchToCart(watchId) {
      dispatch(pushWatchToCart(watchId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
