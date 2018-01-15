import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

const AdminHeader = (props) => (
  <Header attached="top" as="h1" block>
    ADMIN
    <Button.Group floated="right">
      <Button positive>
        <Link className="view-as-user" to="/watches">
          View As User
        </Link>
      </Button>
      <Button.Or />
      <Button negative onClick={props.handleClick}>
        Logout
      </Button>
    </Button.Group>
  </Header>
)

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(null, mapDispatch)(AdminHeader))
