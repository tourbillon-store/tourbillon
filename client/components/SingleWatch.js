import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchWatch, pushWatchToCart } from '../store'

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    const {watch, addWatchToCart, user} = this.props;
    const unavailableMessage = watch.available ? '' : 'Currently Unavailable'
    return (
      !watch.loading && <div>
        <img src={watch.imageUrl} />
        <h2>{watch.make} {watch.model}</h2>
        <h3 className='unavailable-watch'>{unavailableMessage}</h3>
        <ul>
          <li>Complications: {watch.complications}</li>
          <li>Year: {watch.year}</li>
          <li>Price: {watch.price}</li>
        </ul>
        {watch.available &&
          <button onClick={() => addWatchToCart(watch.id, user.id )}>Add to Cart</button>
        }
      </div>
    )
  }
}

const mapStateToProps = ({watch, user}) => ({ watch,  user })

const mapDispatchToProps = (dispatch) => {
  return {
    getWatch(watchId, userId ) {
      dispatch(fetchWatch(watchId))
    },
    addWatchToCart(watchId, userId) {
      dispatch(pushWatchToCart(watchId, userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
