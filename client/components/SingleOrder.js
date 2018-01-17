import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchOrder } from '../store'

class Order extends Component {
  componentDidMount() {
    this.props.getOrder(+this.props.match.params.orderId, +this.props.match.params.userId);
  }

  render() {
    const order = this.props.order;
    return (
      !order.loading &&
      <div>
        <Link to={`/users/${order.userId}/orders/${order.id}`}><h2>ORDER ID: {order.id}</h2></Link>
        <ul>
          <li>Status: {order.status}</li>
          <li>Created At: {order.createdAt}</li>
          <li>Updated At: {order.updatedAt}</li>
          <li>Watches: </li>
            {order.watches.map(watch => (
            <div key={watch.id}>
              <Link to={`/watches/${watch.id}`}>{watch.make} {watch.model} ({watch.order_watch.quantity})</Link>
              <ul>
                <li>Year: {watch.year}</li>
                <li>Complications: {watch.complications}</li>
                <li>Image: {watch.imageUrl}</li>
                <li>Order Price: {watch.order_watch.fixedPrice}</li>
                <li>Order Quantity: {watch.order_watch.quantity}</li>
              </ul>
            </div>
            ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({order}) => ({order})

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder(orderId, userId) {
      dispatch(fetchOrder(orderId, userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
