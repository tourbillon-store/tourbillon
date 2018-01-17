import React from 'react'
import { TableCell as Cell, List } from 'semantic-ui-react'
import { DeleteButton } from './index'

const WatchesTableRow = (props) => {
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
      {`${watch.imageUrl.slice(8, 28)}...`}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.year}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.price}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.available ? "Available" : "Unavailable"}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.createdAt}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {watch.updatedAt}
    </Cell>,
    <Cell key={key++} textAlign="center">
      <DeleteButton className="delete-button" type={"watch"} watchId={watch.id} />
    </Cell>
    ]
  )
}

export default WatchesTableRow
