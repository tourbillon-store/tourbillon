import React from 'react'
import { Header, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../store'

const HeaderExampleBlock = (props) => (
    <Header attached="top" as="h1" block>
      ADMIN
      <Button floated="right" negative onClick={props.handleClick}>
      Logout
    </Button>
    </Header>

)

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(null, mapDispatch)(HeaderExampleBlock))
