import React from 'react'
import { TableCell as Cell, List } from 'semantic-ui-react'

const AllWatchesTableRow = (props) => {
  const { watch } = props
  let key = 0;
  return (
    /*
    Returning a single jsx element work-around. Could use react fragments
    but Babel support is still in beta. Using an array requires a key on every element.
    */
    [
    <Cell key={key++} textAlign="center">
      {watch.id}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.make}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.model}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.complications}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.imageUrl}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.year}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.price}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.available}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.createdAt}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.updatedAt}
    </Cell>,
    <Cell key={key++} >
    {/*
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
     */}
    </Cell>
    ]
  )
}

export default AllWatchesTableRow
