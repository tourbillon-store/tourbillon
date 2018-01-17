import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchWatch, pushWatchToCart } from '../store'
import { AddReviewModal } from './index'
import { Rating, Card, Image, CardContent as content, CardHeader as header, CardDescription as Cdesc} from 'semantic-ui-react'

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    const {watch, addWatchToCart, user} = this.props;
    const unavailableMessage = watch.available ? '' : 'Currently Unavailable'
    let rating
    if (watch.reviews) rating = Math.round(watch.reviews.reduce((prev, curr) => prev + curr.rating, 0) / watch.reviews.length)
    return (
      !watch.loading &&
        <div className="single-watch">
          <Card className="single-card" raised={true} >
            <Link to={`/watches/${watch.id}`}>
              <h2 className="all-watch-card-title">{watch.make} </h2>
                <Image src={watch.imageUrl} />
              <h3 className="unavailable-watch">{unavailableMessage}</h3>
            </Link>
            <content className="all-watch-card">
              <header>{watch.model}</header>
              <header>Make: {watch.make}</header>
              <header>Model: {watch.model}</header>
              <p> Year: {watch.year} </p>
              <p>Complications: {watch.complications}</p>
              <Rating name="rating" disabled icon="star" defaultRating={rating} maxRating={5} /> <Link to={`/watches/${watch.id}/reviews`}>({watch.reviews.length})</Link>
              <Cdesc>Price: {watch.price}</Cdesc>
            </content>
          </Card>
          {watch.available &&
            <button onClick={() => addWatchToCart(watch.id, user.id )}>Add to Cart</button>
          }
          <AddReviewModal />
      </div>
    )
  }
}

const mapStateToProps = ({watch, user}) => ({ watch,  user })

const mapDispatchToProps = (dispatch) => {
  return {
    getWatch(watchId) {
      dispatch(fetchWatch(watchId))
    },
    addWatchToCart(watchId, userId) {
      dispatch(pushWatchToCart(watchId, userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
