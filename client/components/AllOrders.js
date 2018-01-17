import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetOrder, fetchUserOrders } from '../store'
import { CartRow } from '../components'
import { Container, Header, Table, TableHeader, TableHeaderCell as HeaderCell, TableBody as Body, TableRow as Row, TableCell as Cell } from 'semantic-ui-react'

class AllOrders extends Component {
  componentDidMount() {
    this.props.resetOrder()
    this.props.getUserOrders(this.props.user.id)
  }

  render() {
    let { orders, user } = this.props;
    return (
      <Container className="order-container">
        {orders.map(order => {
          return (
            <div key={order.id} className="order-listing">
              <Link to={`/orders/${order.id}`}><Header as="h1">Status: {order.status}</Header></Link>
                <Table className="cart-table">
                  <TableHeader>
                    <Row>
                      <HeaderCell>Make</HeaderCell>
                      <HeaderCell>Model</HeaderCell>
                      <HeaderCell>Price</HeaderCell>
                      <HeaderCell>Quantity</HeaderCell>
                    </Row>
                  </TableHeader>
                  <Body>
                  {order.watches.map(watch => (
                    <Row key={watch.id}>
                      <CartRow watch={watch} />
                      <Cell>{watch.quantity}</Cell>
                    </Row>)
                  )}
                  </Body>
                </Table>
            </div>
          )
        }
        )}
      </Container>
    )
  }
}

const mapStateToProps = ({ orders, user }) => ({ orders, user })

const mapDispatchToProps = (dispatch) => {
  return {
    resetOrder() {
      dispatch(resetOrder({ loading: true }))
    },
    getUserOrders(userId) {
      dispatch(fetchUserOrders(userId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders));
