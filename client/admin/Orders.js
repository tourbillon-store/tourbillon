import React from 'react'
import { List, Table, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const TableExamplePagination = (props) => {
  return (
  <Segment attached="bottom">
    <Table celled padded attached="bottom">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center" width={2}>Order Id</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>Status</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>User</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>CreatedAt</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>UpdatedAt</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>Watches</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.orders.map(order => (
        <Table.Row key={order.id}>
          <Table.Cell textAlign="center">
            {order.id}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {order.status}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {order.userId}
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
                  <List.Header>{watch.make}</List.Header>
                  Price: {watch.order_watch.quantity}<br />
                  Quantity: {watch.order_watch.fixedPrice}
                </List.Content>
              </List.Item>
              ))}
            </List>
          </Table.Cell>
        </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Segment>
)}

const mapStateToProps = ({orders, users}) => ({orders, users})

export default withRouter(connect(mapStateToProps)(TableExamplePagination))
