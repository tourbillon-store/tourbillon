import React from 'react'
import { Table.Cell as Cell, List } from 'semantic-ui-react'

const AllWatchesTableRow = (props) => {
  const { watch, name } = props
  let key = 0;
  return (
    /*
    Returning a single jsx element work-around. Could use react fragments
    but Babel support is still in beta. Using an array requires a key on every element.
    */
    [
    <Cell key={key++} textAlign="center">
      {order.id}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {order.status}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {name}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {order.createdAt}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {order.updatedAt}
    </Cell>,
    <Cell key={key++} >
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
    </Cell>
    ]
  )
}

export default AllOrdersTableRow
