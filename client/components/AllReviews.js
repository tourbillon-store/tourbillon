import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetReview } from '../store'

class AllReviews extends Component {
  componentDidMount() {
    this.props.resetReview();
  }
  render() {
    const { reviews } = this.props;
    return (
      <div>
        {reviews.map(review => {
          if (review.available) {
            return (
              <div key={review.id}>
                <Link to={`/reviews/${review.id}`}><h2>{review.title}</h2></Link>
                <ul>
                  <li>Rating: {review.rating}</li>
                  <li>Content: {review.content}</li>
                </ul>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = ({reviews}) => ({reviews})

const mapDispatchToProps = (dispatch) => {
  return {
    resetReview() {
      dispatch(resetReview({ loading: true }))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllReviews));
