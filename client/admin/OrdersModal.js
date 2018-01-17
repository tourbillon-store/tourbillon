import React from 'react'
import { TableRow as Row, Modal, ModalHeader as Header, ModalContent as Content } from 'semantic-ui-react'
import { OrdersTableRow, SingleOrder } from './index'

const OrdersModal = (props) => {
  const { order, users } = props
  let orderUser = users.find(user => user.id === order.userId)
  let name = `${orderUser.firstName} ${orderUser.lastName}`
  return (
    <Modal trigger={<Row><OrdersTableRow name={name} order={order} /></Row>}>
      <Header>ORDER ID: {order.id}</Header>
      <Content>
        <SingleOrder order={order} />
      </Content>
    </Modal>
  )
}

export default OrdersModal
