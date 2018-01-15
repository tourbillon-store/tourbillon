import React from 'react'
import { Table, Modal } from 'semantic-ui-react'
import { AllOrdersTableRow } from './index'

const AllOrdersModal = (props) => {
  const { order, users } = props
  let orderUser = users.find(user => user.id === order.userId)
  let name = `${orderUser.firstName} ${orderUser.lastName}`
  return (
    <Modal trigger={<Table.Row><AllOrdersTableRow name={name} order={order} /></Table.Row>}>
      <Modal.Header>ORDER ID: {order.id}</Modal.Header>
      <Modal.Content>
        <ul>
          <li>Status: {order.status}</li>
          <li>Created At: {order.createdAt}</li>
          <li>Updated At: {order.updatedAt}</li>
          <li>Watches: </li>
            {order.watches.map(watch => (
            <div key={watch.id}>
              {watch.make} {watch.model}
              <ul>
                <li>Year: {watch.year}</li>
                <li>Complications: {watch.complications}</li>
                <li>Image: {watch.imageUrl}</li>
                <li>Order Price: {watch.order_watch.fixedPrice}</li>
                <li>Order Quantity: {watch.order_watch.quantity}</li>
              </ul>
            </div>
            ))}
        </ul>
      </Modal.Content>
    </Modal>
  )
}

export default AllOrdersModal
