import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

const Reviews = (props) => {
  const { reviews } = props;
  return (
    <div>
      {reviews.map(review => {
        if (review.available) {
          return (
            <div key={review.id}>
              <Link to={`/reviews/${review.id}`}><h2>{review.make} {review.model}</h2></Link>
              <ul>
                <li>Year: {review.year}</li>
                <li>Complications: {review.complications}</li>
                <li>Image: {review.imageUrl}</li>
                <li>Price: {review.price}</li>
              </ul>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Reviews
