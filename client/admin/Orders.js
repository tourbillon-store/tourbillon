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
          <Table.HeaderCell width={1}>OrderId</Table.HeaderCell>
          <Table.HeaderCell width={1}>Status</Table.HeaderCell>
          <Table.HeaderCell width={2}>User</Table.HeaderCell>
          <Table.HeaderCell width={3}>CreatedAt</Table.HeaderCell>
          <Table.HeaderCell width={3}>UpdatedAt</Table.HeaderCell>
          <Table.HeaderCell width={6}>Watches</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.orders.map(order => (
        <Table.Row key={order.id}>
          <Table.Cell>
            {order.id}
          </Table.Cell>
          <Table.Cell>
            {order.status}
          </Table.Cell>
          <Table.Cell>
            {order.userId}
          </Table.Cell>
          <Table.Cell>
            {order.createdAt}
          </Table.Cell>
          <Table.Cell>
            {order.updatedAt}
          </Table.Cell>
          <Table.Cell>
            <List selection bulleted verticalAlign="middle">
              {order.watches.map((watch) => (
              <List.Item key={watch.id}>
                <List.Content>
                  <List.Header>{watch.make}</List.Header>
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
