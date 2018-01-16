import React, { Component } from 'react'
import { Table, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { OrdersModal } from './index'

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: props.orders,
      status: ''
    };

    this.filterOrder = this.filterOrder.bind(this);
    this.renderOrderSearch = this.renderOrderSearch.bind(this);
  }

  render() {
    return (
      <div>
        {this.renderOrderSearch()}
        <Segment attached="bottom">
          <Table selectable celled padded attached="bottom">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center" width={2}>Order Id</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Status</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>User</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>CreatedAt</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>UpdatedAt</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={2}>Watches</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.users.length ? this.props.orders
              .filter(this.filterOrder)
              .map(order =>
                <OrdersModal key={order.id} order={order} users={this.props.users} />
              ) : null}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }

  filterOrder = (order) => {
    const statusMatch = new RegExp(this.state.status, 'i');
    return statusMatch.test(order.status)
  }

  renderOrderSearch = () => {
    return (
      <div className="list-group-item order-item">
        <input
          type="text"
          placeholder="Order Status"
          className="form-like large-font"
          onChange={evt => this.setState({ status: evt.target.value })}
        />
        <span className="glyphicon glyphicon-search" />
      </div>
    );
  }
}

const mapStateToProps = ({orders, users}) => ({orders, users})

export default withRouter(connect(mapStateToProps)(Orders))
