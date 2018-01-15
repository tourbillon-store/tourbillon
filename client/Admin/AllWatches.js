import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//import { AllWatchesModal } from './index'

const AllWatches = (props) => {
  return (
  <Segment attached="bottom">
    <Table selectable celled padded attached="bottom">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center" width={2}>Watch Id</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>Status</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>User</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>CreatedAt</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>UpdatedAt</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>Watches</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/*props.users.length ? props.orders.map(order =>
           <AllOrdersModal key={order.id} order={order} users={props.users} />
        ) : null*/}
      </Table.Body>
    </Table>
  </Segment>
)}

const mapStateToProps = ({watches, users}) => ({watches, users})

export default withRouter(connect(mapStateToProps)(AllWatches))
