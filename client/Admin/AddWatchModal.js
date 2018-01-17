import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'
import { WatchForm } from './index'
import { postWatch } from '../store'


class AddWatchModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleFormSubmit(watch) {
    this.props.handleFormSubmit(watch)
    this.handleClose()
  }

  render() {
    return (
      <Modal closeIcon open={this.state.modalOpen} onClose={() => this.handleClose()} trigger={<Button primary onClick={() => this.handleOpen()} className="add-watch-button">Add a Watch</Button>}>
        <Modal.Header>Add a Watch</Modal.Header>
        <Modal.Content>
          <WatchForm handleFormSubmit={this.handleFormSubmit.bind(this)} handleClose={this.handleClose.bind(this)} />
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormSubmit(watch) {
      dispatch(postWatch(watch))
    }
  }
}


export default connect(null, mapDispatchToProps)(AddWatchModal)
