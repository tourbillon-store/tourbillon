import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

const AllOrders = (props) => {
  const { orders } = props;
  return (
    <div>
      {orders.map(order => {
        return (
          <div key={order.id}>
            <Link to={`/orders/${order.id}`}><h2>ORDER ID: {order.id}</h2></Link>
            <ul>
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

const mapStateToProps = ({ orders }) => ({ orders })

export default withRouter(connect(mapStateToProps)(AllOrders));
