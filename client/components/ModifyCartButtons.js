import React from 'react'
import { connect } from 'react-redux'
import { updateCart, deleteWatchFromCart, showQuantityUnderflowError } from '../store'
import { TableCell as Cell, Button} from 'semantic-ui-react'

const ModifyCartButtons = props => {
  const {user, watch, changeQuantity, removeWatch } = props
  return (
    <Cell
      width={4}
      className="cart-quantity-container">
      <a>
      <Button
        className="quantity-button"
        icon="minus"
        size="mini"
        onClick={() => changeQuantity(watch.id, watch.quantity - 1, user.id)} />
      <div className="quanity-number">{watch.quantity}</div>
      <Button
        className="quantity-button"
        icon="plus"
        size="mini"
        onClick={() => changeQuantity(watch.id, watch.quantity + 1, user.id)} />
      <Button
        className="quantity-button delete-button"
        icon="delete"
        size="mini"
        color="red"
        onClick={() => removeWatch(watch.id, user.id)} />
      </a>
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
