import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'
import { ReviewForm } from './index'
import { postReview, fetchWatches } from '../store'


class AddReviewModal extends Component {
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

  handleFormSubmit(review, rating) {
    review.rating = rating
    review.userId = this.props.user.id
    review.watchId = this.props.watch.id
    review.watch = this.props.watch
    this.props.handleFormSubmit(review)
    this.handleClose()
  }

  render() {
    return (
      <Modal closeIcon size="tiny" open={this.state.modalOpen} onClose={() => this.handleClose()} trigger={<Button primary onClick={() => this.handleOpen()} className="add-review-button">Write a Review</Button>}>
        <Modal.Header>Add a Review</Modal.Header>
        <Modal.Content>
          <ReviewForm handleFormSubmit={this.handleFormSubmit.bind(this)} handleClose={this.handleClose.bind(this)} />
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = ({ user, watch }) => ({ user, watch })

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormSubmit(review) {
      dispatch(postReview(review))
      .then(dispatch(fetchWatches()))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddReviewModal)
