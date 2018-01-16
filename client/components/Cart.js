import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart, updateCart, deleteWatchFromCart, showQuantityUnderflowError } from '../store'

class Cart extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const {user, cart, changeQuantity, removeWatch} = this.props
    return (
      <div>
        <h1>Shopping Cart</h1>
        {(cart && cart.length)
          ? <div>
              <div className="cart-container">
                {cart.map(watch => {
                  return (
                    <div className="cart-row" key={watch.id}>
                      <div className="cart-product-row">
                        <div><h3>{watch.make}</h3></div>
                        <div><h3>{watch.model}</h3></div>
                        <div><h4>{watch.price}</h4></div>
                        <div className="cart-quantity-container">
                          <button className="minus-button" onClick={() => changeQuantity(watch.id, watch.quantity - 1, user.id)}>-</button>
                          <h4>{watch.quantity}</h4>
                          <button className="plus-button" onClick={() => changeQuantity(watch.id, watch.quantity + 1, user.id)}>+</button>
                        </div>
                        <button className="delete-button" onClick={() => removeWatch(watch.id, user.id)}>Delete</button>
                      </div>
                      {watch.hasOwnProperty('underflowErr') && <div className="quantity-error">Quantity cannot be less than one. You can delete the item from your cart instead</div> }
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
    changeQuantity(watchId, newQuantity, userId) {
      if (newQuantity < 1) dispatch(showQuantityUnderflowError(watchId))
      else dispatch(updateCart(watchId, newQuantity, userId))
    },
    removeWatch(watchId, userId) {dispatch(deleteWatchFromCart(watchId, userId))}
  }
}

export default connect(mapState, mapDispatch)(Cart)
