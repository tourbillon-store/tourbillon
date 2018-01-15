import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetOrder } from '../store'

class AllOrders extends Component {
  componentDidMount() {
    this.props.resetOrder()
  }

  render() {
    let { orders, user } = this.props;
    orders = orders.filter(order => order.status !== 'cart' && order.userId === user.id);
    return (
      <div>
        {orders.map(order => {
          return (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}><h2>ORDER ID: {order.id}</h2></Link>
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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders));
