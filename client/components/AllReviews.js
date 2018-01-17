import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetReview } from '../store'
import { Review } from './SingleReview'
import { Header } from 'semantic-ui-react'
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
      reviews.length && watches.length &&
        <div className={this.props.match.url.split('/')[3] === 'reviews' ? 'all-reviews-container' : ''}>
        {!this.props.hideName &&
        <Header as="h1" className="all-reviews-title"><Link to={`/watches/${watchId}`}>{reviewWatch.make} {reviewWatch.model} Reviews </Link></Header>
        }
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
