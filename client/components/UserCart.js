import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store'

class UserCart extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const cart = this.props.cart[0]
    return (
      <div>
        <h1>Shopping Cart</h1>
        {(cart && cart.watches && cart.watches.length)
          ? <div>
              <div className="cart-container">
                {cart.watches.map(cartItem => {
                  return (
                    <div className="cart-product-row" key={cartItem.id}>
                      <div><h3>{cartItem.make}</h3></div>
                      <div><h3>{cartItem.model}</h3></div>
                      <div><h4>{cartItem.price}</h4></div>
                      <div className="cart-quantity-container">
                        <button className="minus-button">-</button>
                        <h4>{cartItem.order_watch.quantity}</h4>
                        <button className="plus-button">+</button>
                      </div>
                      <button className="delete-button">Delete</button>
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
    getCart(userId) { dispatch(fetchCart(userId)) }
  }
}

export default connect(mapState, mapDispatch)(UserCart)
