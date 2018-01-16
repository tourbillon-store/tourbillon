import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const DeleteButton  = props => {
  console.log(props)

  return (
    <div>
      <Button icon='delete' size='mini' circular negative >
      </Button>
    </div>
  )

}

export default DeleteButton
