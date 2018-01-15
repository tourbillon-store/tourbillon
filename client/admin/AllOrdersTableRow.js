import React from 'react'
import { Table, List } from 'semantic-ui-react'

const AllOrdersTableRow = (props) => {
  const { order, name } = props
  let key = 0;
  return (
    [
    <Table.Cell key={key++} textAlign="center">
      {order.id}
    </Table.Cell>,
    <Table.Cell key={key++} textAlign="center">
      {order.status}
    </Table.Cell>,
    <Table.Cell key={key++} textAlign="center">
      {name}
    </Table.Cell>,
    <Table.Cell key={key++} textAlign="center">
      {order.createdAt}
    </Table.Cell>,
    <Table.Cell key={key++} textAlign="center">
      {order.updatedAt}
    </Table.Cell>,
    <Table.Cell key={key++} >
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
    ]
  )
}

export default AllOrdersTableRow
