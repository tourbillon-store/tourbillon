import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetReview } from '../store'
import { Review } from './SingleReview'
class AllReviews extends Component {
  componentDidMount() {
    this.props.resetReview();
  }

  render() {
    let { reviews, watches } = this.props;
    const watchId = +this.props.match.params.watchId
    let reviewWatch = {};
    if (watchId) {
      reviews = reviews.filter(review => review.watch.id === watchId)
      reviewWatch = watches.find(watch => watch.id === watchId)
    }
    return (
      reviews.length && watches.length && <div>
        <Link to={`/watches/${watchId}`}><h2>{reviewWatch.make} {reviewWatch.model}</h2></Link>
        {reviews.map(review => {
          return (
            <Review key={review.id} review={review} user={review.user} />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = ({reviews, watches}) => ({reviews, watches})

const mapDispatchToProps = (dispatch) => {
  return {
    resetReview() {
      dispatch(resetReview({ loading: true }))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllReviews));
