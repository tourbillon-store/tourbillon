import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCart } from '../store'
import { CartRow, ModifyCartButtons } from '../components'
import { Container, Table, TableHeader as Header, TableHeaderCell as HeaderCell, TableBody as Body, TableRow as Row, Button } from 'semantic-ui-react'

class Cart extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const { cart } = this.props
    return (
      <Container className="cart-container">
        <h1>Shopping Cart</h1>
        {(cart && cart.length)
          ? <div>
            <Table className="cart-table">
              <Header>
                <Row>
                  <HeaderCell>Make</HeaderCell>
                  <HeaderCell>Model</HeaderCell>
                  <HeaderCell>Price</HeaderCell>
                  <HeaderCell>Quantity</HeaderCell>
                </Row>
              </Header>
              <Body>
              {cart.map(watch => {
                return (
                  <Row key={watch.id}>
                    <CartRow watch={watch} />
                    <ModifyCartButtons watch={watch} />
                  </Row>
                )}
              )}
              </Body>
            </Table>
              <div className="purchase-button">
                <Link to="checkout">
                  <Button
                    content="Complete Purchase"
                    primary
                    ref={this.handleRef}
                  />
                </Link>
              </div>
            </div>
          : <h2>Your shopping cart is empty. <a href="/watches">Browse Watches</a></h2>
        }
      </Container>
    )
  }
}

const mapState = ({ cart, user }) => ({ cart, user })
const mapDispatch = (dispatch) => {
  return { getCart(userId) { dispatch(fetchCart(userId)) } }
}

export default connect(mapState, mapDispatch)(Cart)
