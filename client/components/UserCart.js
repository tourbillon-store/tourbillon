import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart, updateCart } from '../store'

class UserCart extends Component {
  componentDidMount () {
    this.props.getCart()
  }

  render() {
    const { user, cart, decrementQuantity, incrementQuantity, removeWatch} = this.props
    return (
      <div>
        <h1>Shopping Cart</h1>
        {(cart && cart.length)
          ? <div>
              <div className="cart-container">
                {cart.map(cartItem => {
                  return (
                    <div className="cart-product-row" key={cartItem.id}>
                      <div><h3>{cartItem.make}</h3></div>
                      <div><h3>{cartItem.model}</h3></div>
                      <div><h4>{cartItem.price}</h4></div>
                      <div className="cart-quantity-container">
                        <button className="minus-button" onClick={() => decrementQuantity(cartItem.id, cartItem.order_watch.quantity - 1)}>-</button>
                        <h4>{cartItem.order_watch.quantity}</h4>
                        <button className="plus-button" onClick={() => incrementQuantity(cartItem.id, cartItem.order_watch.quantity + 1)}>+</button>
                      </div>
                      <button className="delete-button" onClick={() => removeWatch(user.id, cartItem.id)}>Delete</button>
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

const mapState = ({ user, cart }) => ({ user, cart })
const mapDispatch = (dispatch) => {
  return {
    getCart() { dispatch(fetchCart()) },
    decrementQuantity(watchId, newQuantity) {dispatch(updateCart(watchId, newQuantity))},
    incrementQuantity(watchId, newQuantity) {dispatch(updateCart(watchId, newQuantity))},
    removeWatch(watchId) {dispatch(removeWatchFromCart(watchId))}
  }
}

export default connect(mapState, mapDispatch)(UserCart)
