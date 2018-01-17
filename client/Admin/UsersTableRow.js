import React from 'react'
import { TableCell as Cell } from 'semantic-ui-react'
import { DeleteButton } from './index'

const UsersTableRow = (props) => {
  const { user } = props
  let key = 0;
  return (
    /*
    Returning a single jsx element work-around. Could use react fragments
    but Babel support is still in beta. Using an array requires a key on every element.
    */
    [
    <Cell key={key++} textAlign="center">
      {user.id}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.firstName} {user.lastName}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.email}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.googleId || "Did not use"}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.facebookId || "Did not use"}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.isAdmin ? "Admin" : "Regular User"}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.createdAt}
    </Cell>,
    <Cell key={key++} textAlign="center">
      {user.updatedAt}
    </Cell>,
    <Cell key={key++} textAlign="center">
      <DeleteButton className="delete-button" type={"user"} userId={user.id} />
    </Cell>
    ]
  )
}

export default UsersTableRow
