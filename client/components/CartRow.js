import React from 'react'
import { connect } from 'react-redux'
import { TableCell as Cell} from 'semantic-ui-react'

const CartRow = props => {
  const { watch } = props
  let key = 0
  return (
    [
      <Cell key={key++}>{watch.make}</Cell>,
      <Cell key={key++}>{watch.model}</Cell>,
      <Cell key={key++}>{watch.price}</Cell>
    ]
  )
}

const mapState = ({ user, cart }) => ({ user, cart })

export default connect(mapState)(CartRow)
