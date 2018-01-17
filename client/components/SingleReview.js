import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchReview } from '../store'

export const Review = (props) => {
  const { review, user } = props
  const watchId = review.watch.id
  return (
    <div>
      <Link to={`/watches/${watchId}/reviews/${review.id}`}>{review.title}</Link>
        <ul>
          <li>By: {user.firstName} {user.lastName}</li>
          <li>Rating: {review.rating}</li>
          <li>Content: {review.content}</li>
        </ul>
    </div>
  )
}
class SingleReview extends Component {
  componentDidMount() {
    this.props.getReview(+this.props.match.params.reviewId);
  }

  render() {
    const {review} = this.props
    return (
      !review.loading &&
      <div className="SingleReview">
        <h2>{review.watch.make} {review.watch.model}</h2>
        <Review review={review} user={review.user} />
      </div>
    )
  }
}

const mapStateToProps = ({review}) => ({review})

const mapDispatchToProps = (dispatch) => {
  return {
    getReview(reviewId) {
      dispatch(fetchReview(reviewId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleReview));
