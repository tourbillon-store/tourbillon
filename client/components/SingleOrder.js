import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchOrder } from '../store'

class Order extends Component {
  componentDidMount() {
    this.props.getOrder(+this.props.match.params.OrderId);
  }

  render() {
    const order = this.props.Order;
    return (
      !order.loading &&
        <div key={order.id}>
        <Link to={`/orders/${order.id}`}>{order.make} {order.model}</Link>
        <ul>
          <li>Year: {order.year}</li>
          <li>Complications: {order.complications}</li>
          <li>Image: {order.imageUrl}</li>
          <li>Price: {order.price}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({order}) => ({order})

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder(OrderId) {
      dispatch(fetchOrder(OrderId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
