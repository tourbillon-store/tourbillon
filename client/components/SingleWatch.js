import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchWatch, pushWatchToCart } from '../store'

const SingleWatch = (props) => {
  const {watch, addWatchToCart, user} = props;
  const unavailableMessage = watch.available ? '' : 'Currently Unavailable'
  return (
    !watch.loading && <div>
      <img src={watch.imageUrl} />
      <h2>{watch.make} {watch.model}</h2>
      <h3 className="unavailable-watch">{unavailableMessage}</h3>
      <ul>
        <li>Complications: {watch.complications}</li>
        <li>Year: {watch.year}</li>
        <li>Price: {watch.price}</li>
      </ul>
      {watch.available &&
        <button onClick={() => addWatchToCart({
          id: watch.id,
          make: watch.make,
          model: watch.model,
          price: watch.price,
          createdAt: watch.createdAt
        }, user.id )}>Add to Cart</button>
      }
    </div>
  )
}

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    return <SingleWatch />
  }
}

const mapStateToProps = ({watch, user}) => ({ watch,  user })

const mapDispatchToProps = (dispatch) => {
  return {
    getWatch(watchId) {
      dispatch(fetchWatch(watchId))
    },
    addWatchToCart(watch, userId) {
      dispatch(pushWatchToCart(watch, userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
