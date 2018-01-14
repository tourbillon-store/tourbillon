import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchOrder } from '../store'

class Order extends Component {
  componentDidMount() {
    this.props.getOrder(+this.props.match.params.orderId);
  }

  render() {
    const order = this.props.order;
    return (
      !order.loading &&
      <div key={order.id}>
        <h2>ORDER ID: {order.id}</h2>
        <ul>
          <li>Status: {order.status}</li>
          <li>Created At: {order.createdAt}</li>
          <li>Updated At: {order.updateAt}</li>
          <li>Watches: </li>
            {order.watches.map(watch => (
            <div key={watch.id}>
              <Link to={`/watches/${watch.id}`}>{watch.make} {watch.model}</Link>
              <ul>
                <li>Year: {watch.year}</li>
                <li>Complications: {watch.complications}</li>
                <li>Image: {watch.imageUrl}</li>
                <li>Price: {watch.price}</li>
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
    getOrder(orderId) {
      dispatch(fetchOrder(orderId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
