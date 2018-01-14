import React from 'react'
import { List, Table, Modal } from 'semantic-ui-react'

const AllOrdersModal = (props) => {
  const { order, users } = props
  let orderUser = users.find(user => user.id === order.userId)
  let name = `${orderUser.firstName} ${orderUser.lastName}`
  return (
    <Modal trigger={
      <Table.Row >
        <Table.Cell textAlign="center">
          {order.id}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {order.status}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {name}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {order.createdAt}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {order.updatedAt}
        </Table.Cell>
        <Table.Cell>
          <List selection divided verticalAlign="middle">
            {order.watches.map((watch) => (
              <List.Item key={watch.id}>
                <List.Content>
                  <List.Header>ID: {watch.id}</List.Header>
                  Price: {watch.order_watch.quantity}<br />
                  Quantity: {watch.order_watch.fixedPrice}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Table.Cell>
      </Table.Row>
    }>
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
