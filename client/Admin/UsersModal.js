import React from 'react'
import { Table, TableRow as Row, Modal, ModalHeader as Header, ModalContent as Content } from 'semantic-ui-react'
import { UsersTableRow } from './index'

const UsersModal = (props) => {
  const { user } = props

  return (
    <Modal trigger={<Row><WatchesTableRow user={user} /></Row>}>
      <Header>USER ID: {user.id}</Header>
      <Content>
        <ul>
          <li>Name: {user.firstName} {user.lastName}</li>
          <li>Email: {user.email}</li>
          <li>Google Id: {user.googleId}</li>
          <li>Facebook Id: {user.facebookId}</li>
          <li>Admin Status: {user.isAdmin ? "Admin" : "Regular User"}</li>
          <li>Created At: {watch.createdAt}</li>
          <li>Updated At: {watch.updatedAt}</li>
        </ul>
      </Content>
    </Modal>
  )
}

export default UsersModal
