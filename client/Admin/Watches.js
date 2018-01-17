import React from 'react'
import { Table, TableHeader as Header, TableRow as Row, TableHeaderCell as HeaderCell, TableBody as Body, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { WatchesModal } from './index'

const Watches = (props) => {
  return (
  <Segment attached="bottom">
    <Table selectable celled padded attached="bottom">
      <Header>
        <Row>
          <HeaderCell textAlign="center" width={2}>Watch Id</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Make</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Model</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Complications</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Image URL</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Year</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Price</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Available</HeaderCell>
          <HeaderCell textAlign="center" width={2}>CreatedAt</HeaderCell>
          <HeaderCell textAlign="center" width={2}>UpdatedAt</HeaderCell>
          <HeaderCell textAlign="center" width={2}>Actions</HeaderCell>
        </Row>
      </Header>
      <Body>
        {props.watches.length ? props.watches.map(watch =>
           <WatchesModal key={watch.id} watch={watch} />
        ) : null}
      </Body>
    </Table>
  </Segment>
)}

const mapStateToProps = ({watches}) => ({watches})

export default withRouter(connect(mapStateToProps)(Watches))
