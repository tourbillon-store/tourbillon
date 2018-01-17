import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCart } from '../store'
import { CartRow, ModifyCartButtons } from '../components'
import { Table, TableHeader as Header, TableHeaderCell as HeaderCell, TableBody as Body, TableRow as Row } from 'semantic-ui-react'

class Cart extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const { cart } = this.props
    return (
      <div>
        <h1>Shopping Cart</h1>
        {(cart && cart.length)
          ? <div>
            <Table className="cart-container">
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
                <Link to="checkout">Complete Purchase</Link>
              </div>
            </div>
          : <h2>Your shopping cart is empty. <a href="/watches">Browse Watches</a></h2>
        }
      </div>
    )
  }
}

const mapState = ({ cart, user }) => ({ cart, user })
const mapDispatch = dispatch => {
  return { getCart(userId) { dispatch(fetchCart(userId)) } }
}

export default connect(mapState, mapDispatch)(Cart)
