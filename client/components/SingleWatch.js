import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchWatch, pushWatchToCart } from '../store'
import { Container, Header, Image, Button } from 'semantic-ui-react'
import { numberWithCommas } from '../utils'

class Watch extends Component {
  componentDidMount() {
    this.props.getWatch(+this.props.match.params.watchId);
  }

  render() {
    const {watch, addWatchToCart, user} = this.props;
    const unavailableMessage = watch.available ? '' : 'Currently Unavailable'
    return (
      !watch.loading &&
      <Container className="single-watch-container">
        <Link to="/watches">
          <Button
            content="< Back"
            color="grey" />
        </Link>
        <Header as="h1">{watch.make} {watch.model}</Header>
        <Image className="single-watch-image" src={watch.imageUrl} size="large" rounded />
        <Header as="h3" className="unavailable-watch">{unavailableMessage}</Header>
          <Header as="h4">Complications: {watch.complications}</Header>
          <Header as="h4">Year: {watch.year}</Header>
          <Header as="h4">Price: ${numberWithCommas(watch.price)}</Header>
        {watch.available &&
          <Button
            content="Add to Cart"
            primary
            onClick={() => addWatchToCart({
              id: watch.id,
              make: watch.make,
              model: watch.model,
              price: watch.price,
              createdAt: watch.createdAt
              },
              user.id
            )} />
        }
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
    addWatchToCart(watch, userId) {
      dispatch(pushWatchToCart(watch, userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
