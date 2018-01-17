import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetOrder, fetchUserOrders } from '../store'

class AllOrders extends Component {
  componentDidMount() {
    this.props.resetOrder()
    this.props.getUserOrders(this.props.user.id)
  }

  render() {
    let { orders } = this.props;
    return (
      <div>
        {orders.map(order => {
          return (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}><h2>ORDER ID: {order.id}</h2></Link>
              <ul>
                <li>Status: {order.status}</li>
                <li>Created At: {order.createdAt}</li>
                <li>Updated At: {order.updatedAt}</li>
                <li>Watches: </li>
                  {order.watches.map(watch => (
                  <div key={watch.id}>
                    <Link to={`/watches/${watch.id}`}>{watch.make} {watch.model}</Link>
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
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ orders, user }) => ({ orders, user })

const mapDispatchToProps = (dispatch) => {
  return {
    resetOrder() {
      dispatch(resetOrder({ loading: true }))
    },
    getUserOrders(userId) {
      dispatch(fetchUserOrders(userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders));
