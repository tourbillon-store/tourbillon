import React from 'react'
import { Table, Modal } from 'semantic-ui-react'
import { OrdersTableRow, SingleOrder } from './index'

const OrdersModal = (props) => {
  const { order, users } = props
  let orderUser = users.find(user => user.id === order.userId)
  let name = `${orderUser.firstName} ${orderUser.lastName}`
  return (
    <Modal trigger={<Table.Row><OrdersTableRow name={name} order={order} /></Table.Row>}>
      <Modal.Header>ORDER ID: {order.id}</Modal.Header>
      <Modal.Content>
        <SingleOrder order={order} />
      </Modal.Content>
    </Modal>
  )
}

export default OrdersModal
