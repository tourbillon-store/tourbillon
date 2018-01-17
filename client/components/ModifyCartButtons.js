import React from 'react'
import { connect } from 'react-redux'
import { updateCart, deleteWatchFromCart, showQuantityUnderflowError } from '../store'
import { TableCell as Cell} from 'semantic-ui-react'

const ModifyCartButtons = props => {
  const {user, watch, changeQuantity, removeWatch } = props
  console.log('modify user', user)
  return (
    <Cell className="cart-quantity-container">
      <button className="minus-button" onClick={() => changeQuantity(watch.id, watch.quantity - 1, user.id)}>-</button>
      <div>{watch.quantity}</div>
      <button className="plus-button" onClick={() => changeQuantity(watch.id, watch.quantity + 1, user.id)}>+</button>
      <button className="delete-button" onClick={() => removeWatch(watch.id, user.id)}>Delete</button>
      {watch.hasOwnProperty('underflowErr') && <div className="quantity-error">Quantity cannot be less than one. You can delete the item from your cart instead</div> }
    </Cell>
  )
}

const mapState = ({ user, cart }) => ({ user, cart })

const mapDispatch = dispatch => {
  return {
    changeQuantity(watchId, newQuantity, userId) {
      if (newQuantity < 1) dispatch(showQuantityUnderflowError(watchId))
      else dispatch(updateCart(watchId, newQuantity, userId))
    },
    removeWatch(watchId, userId) {dispatch(deleteWatchFromCart(watchId, userId))}
  }
}

export default connect(mapState, mapDispatch)(ModifyCartButtons)
