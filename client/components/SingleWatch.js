import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchWatch, pushWatchToCart } from '../store'
import { Rating, Container, Header, Image, Button, Icon } from 'semantic-ui-react'
import { AddReviewModal } from './index'
import { numberWithCommas } from '../utils'

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
      <Container className="single-watch-container">
        <Link to="/watches">
          <Button animated color="grey">
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="left arrow" />
            </Button.Content>
          </Button>
        </Link>
        <Header as="h1">{watch.make} {watch.model}</Header>
        <Image className="single-watch-image" src={watch.imageUrl} size="large" rounded />
        <Header as="h3" className="unavailable-watch">{unavailableMessage}</Header>
          <Header as="h4">Complications: {watch.complications}</Header>
          <Header as="h4">Year: {watch.year}</Header>
          <Rating name="rating" disabled icon="star" defaultRating={rating} maxRating={5} />
          <Header as="h4">Price: ${numberWithCommas(watch.price)}</Header>
        {watch.available &&
          <Button
            primary
            animated
            onClick={() => addWatchToCart({
              id: watch.id,
              make: watch.make,
              model: watch.model,
              price: watch.price,
              createdAt: watch.createdAt
              },
              user.id
            )}
          >
            <Button.Content visible>Add to Cart</Button.Content>
            <Button.Content hidden>
              <Icon name="shop" />
            </Button.Content>
          </Button>
        }
      <AddReviewModal />
      </Container>
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
