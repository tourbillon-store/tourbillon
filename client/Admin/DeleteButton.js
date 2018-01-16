import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { adminDeleteUser, adminDeleteWatch } from '../store'

const DeleteButton  = props => {
  return (
    <div>
      <Button onClick={props.onDeleteClick} icon='delete' size='mini' circular negative >
      </Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => {
  if(props.type === "user") {
    return {
      onDeleteClick: () => {
        dispatch(adminDeleteUser(props.userId))
      }
    }
  } else if(props.type === "watch") {
    return {
      onDeleteClick: () => {
        dispatch(adminDeleteWatch(props.watchId))
      }
    }
  }
}

export default connect(null, mapDispatchToProps)(DeleteButton)
