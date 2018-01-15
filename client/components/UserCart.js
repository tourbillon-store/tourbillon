import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart, updateCart, deleteWatchFromCart } from '../store'

class UserCart extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const {user, cart, decrementQuantity, incrementQuantity, removeWatch} = this.props
    return (
      <div>
        <h1>Shopping Cart</h1>
        {(cart && cart.length)
          ? <div>
              <div className="cart-container">
                {cart.map(watch => {
                  return (
                    <div className="cart-product-row" key={watch.id}>
                      <div><h3>{watch.make}</h3></div>
                      <div><h3>{watch.model}</h3></div>
                      <div><h4>{watch.price}</h4></div>
                      <div className="cart-quantity-container">
                        <button className="minus-button" onClick={() => decrementQuantity(watch.id, watch.quantity - 1, user.id)}>-</button>
                        <h4>{watch.quantity}</h4>
                        <button className="plus-button" onClick={() => incrementQuantity(watch.id, watch.quantity + 1, user.id)}>+</button>
                      </div>
                      <button className="delete-button" onClick={() => removeWatch(watch.id, user.id)}>Delete</button>
                    </div>
                  )
                })}
              </div>
              <div className="purchase-button">
                <button>Complete Purchase</button>
              </div>
            </div>
          : <h2>Your shopping cart is empty. <a href="/watches">Browse Watches</a></h2>
        }
      </div>
    )
  }
}

const mapState = ({ cart, user }) => ({ cart, user })
const mapDispatch = (dispatch) => {
  return {
    getCart(userId) { dispatch(fetchCart(userId)) },
    decrementQuantity(watchId, newQuantity, userId) {dispatch(updateCart(watchId, newQuantity, userId))},
    incrementQuantity(watchId, newQuantity, userId) {dispatch(updateCart(watchId, newQuantity, userId))},
    removeWatch(watchId, userId) {dispatch(deleteWatchFromCart(watchId, userId))}
  }
}

export default connect(mapState, mapDispatch)(UserCart)
