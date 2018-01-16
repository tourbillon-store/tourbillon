import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchReview } from '../store'

class Review extends Component {
  componentDidMount() {
    this.props.getReview(+this.props.match.params.reviewId);
  }

  render() {
    const review = this.props.review;
    return (
      !review.loading &&
      <div>
        <Link to={`/reviews/${review.id}`}><h2>{review.title}</h2></Link>
          <ul>
            <li>Rating: {review.rating}</li>
            <li>Content: {review.content}</li>
          </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Review));
