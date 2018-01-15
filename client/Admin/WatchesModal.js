import React from 'react'
import { Table, TableRow as Row, Modal, ModalHeader as Header, ModalContent as Content } from 'semantic-ui-react'
import { WatchesTableRow } from './index'

const WatchesModal = (props) => {
  const { watch } = props

  return (
    <Modal trigger={<Row><WatchesTableRow watch={watch} /></Row>}>
      <Header>WATCH ID: {watch.id}</Header>
      <Content>
        <ul>
          <li>Make: {watch.make}</li>
          <li>Model: {watch.model}</li>
          <li>Complications: {watch.complications}</li>
          <li>Image URL: {watch.imageUrl}</li>
          <li>Year: {watch.year}</li>
          <li>Price: {watch.price}</li>
          <li>Available: {watch.available ? "Available" : "Unavailable"}</li>
          <li>Created At: {watch.createdAt}</li>
          <li>Updated At: {watch.updatedAt}</li>
        </ul>
      </Content>
    </Modal>
  )
}

export default WatchesModal
