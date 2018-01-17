import React, { Component } from 'react'
import { Table, TableHeader as Header, TableRow as Row, TableHeaderCell as HeaderCell, TableBody as Body, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { UsersModal } from './index'
import { adminFetchUsers } from '../store'

class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users
    return (
      <Segment attached="bottom">
        <Table selectable celled padded attached="bottom">
          <Header>
            <Row>
              <HeaderCell textAlign="center" width={2}>User Id</HeaderCell>
              <HeaderCell textAlign="center" width={2}>User Name</HeaderCell>
              <HeaderCell textAlign="center" width={2}>Email</HeaderCell>
              <HeaderCell textAlign="center" width={2}>Google Id</HeaderCell>
              <HeaderCell textAlign="center" width={2}>Facebook Id</HeaderCell>
              <HeaderCell textAlign="center" width={2}>Admin Status</HeaderCell>
              <HeaderCell textAlign="center" width={2}>CreatedAt</HeaderCell>
              <HeaderCell textAlign="center" width={2}>UpdatedAt</HeaderCell>
              <HeaderCell textAlign="center" width={2}>Actions</HeaderCell>
            </Row>
          </Header>
          <Body>
            {users.length ? users.map(user =>
              <UsersModal key={user.id} user={user} />
            ) : null}
          </Body>
        </Table>
      </Segment>
    )}
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers() {
      dispatch(adminFetchUsers())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))
