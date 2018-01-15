import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { OrdersModal } from './index'

// destructure 'Table'
// wrap components in divs to use classNames
const Orders = (props) => {
  return (
  <Segment attached="bottom">
    <Table selectable celled padded attached="bottom">
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
        {props.users.length ? props.orders.map(order =>
           <OrdersModal key={order.id} order={order} users={props.users} />
        ) : null}
      </Table.Body>
    </Table>
  </Segment>
)}

const mapStateToProps = ({orders, users}) => ({orders, users})

export default withRouter(connect(mapStateToProps)(Orders))
