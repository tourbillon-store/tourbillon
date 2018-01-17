import React, { Component } from 'react'
import { TableRow as Row, Modal, ModalHeader as Header, ModalContent as Content } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { WatchesTableRow, WatchForm } from './index'
import { updateWatches } from '../store'

class WatchesModal extends Component {
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

  handleFormSubmit(values, watchId, watches) {
    this.props.handleFormSubmit(values, watchId, watches)
    this.handleClose()
  }

  render() {
    const { watch, watches } = this.props
    return (
      <Modal open={this.state.modalOpen} onOpen={() => this.handleOpen()} onClose={() => this.handleClose()} trigger={<Row><WatchesTableRow watch={watch} /></Row>}>
        <Header>WATCH ID: {watch.id}</Header>
        <Content>
          <WatchForm handleFormSubmit={this.handleFormSubmit.bind(this)} handleClose={this.handleClose.bind(this)} initialValues={watch} watches={watches} />
        </Content>
      </Modal>
    )
  }
}

const mapStateToProps = ({watches}) => ({watches})

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormSubmit(values, watchId, watches) {
      dispatch(updateWatches(values, watchId, watches))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WatchesModal)
