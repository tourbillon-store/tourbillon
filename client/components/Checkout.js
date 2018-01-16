import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchCart } from '../store'
import { Container, Header, Step, StepGroup, StepContent, StepTitle, StepDescription, Icon, Grid, GridRow, GridColumn as Column, Table, TableHeader, TableHeaderCell as HeaderCell, TableBody as Body, TableRow as Row, TableCell as Cell, Button, Checkbox, Form } from 'semantic-ui-react'
import { CartRow } from '../components'

class Checkout extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const { cart } = this.props
    return (
      <Container className="checkout-container">
        <Grid divided="vertically">
          <GridRow columns={2}>
            <Column>
              <StepGroup fluid vertical>
                <Step completed={false} active={true} >
                  <Icon name="truck" />
                  <StepContent>
                    <StepTitle>Shipping</StepTitle>
                    <StepDescription>Choose your shipping options</StepDescription>
                  </StepContent>
                </Step>
                <Step completed={false} active={false}>
                  <Icon name="dollar" />
                  <StepContent>
                    <StepTitle>Billing</StepTitle>
                    <StepDescription>Enter billing information</StepDescription>
                  </StepContent>
                </Step>
              </StepGroup>
              <br /><br /><br />
              <Header as="h2">Your Cart</Header>
              <Table className="cart-container">
                <TableHeader>
                  <Row>
                    <HeaderCell>Make</HeaderCell>
                    <HeaderCell>Model</HeaderCell>
                    <HeaderCell>Price</HeaderCell>
                    <HeaderCell>Quantity</HeaderCell>
                  </Row>
                </TableHeader>
                <Body>
                  {cart.map(watch => {
                    return (
                      <Row key={watch.id}>
                        <CartRow watch={watch} />
                        <Cell>{watch.quantity}</Cell>
                      </Row>
                    )}
                  )}
                </Body>
              </Table>
            </Column>
            <Column>

            </Column>
          </GridRow>
        </Grid>
      </Container>
    )
  }
}

const mapState = ({ cart, user }) => ({ cart, user })
const mapDispatch = (dispatch) => {
  return { getCart(userId) { dispatch(fetchCart(userId)) } }
}

export default connect(mapState, mapDispatch)(Checkout)
