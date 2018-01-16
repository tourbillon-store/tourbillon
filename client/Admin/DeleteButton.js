import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export default const DeleteButton  = props => {

  return (
    <div>
      <Button icon='delete' negative>
      </Button>
    </div>
  )

}
