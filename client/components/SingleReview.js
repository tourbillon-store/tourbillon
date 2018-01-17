import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchReview } from '../store'
import { Header, Label, Rating } from 'semantic-ui-react'

export const Review = (props) => {
  const { review, user } = props
  const watchId = review.watch.id
  return (
    <div className="single-review-container">
      <Header as="h3"><Link to={`/watches/${watchId}/reviews/${review.id}`}>{review.title}</Link></Header>
        <a className="review-head">
          <Label>{user.firstName} {user.lastName}</Label>
          <Rating
            name="rating"
            maxRating="5"
            disabled icon="star"
            defaultRating={review.rating}
          />
        </a>
        <div className="review-content">Content: {review.content}</div>
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
