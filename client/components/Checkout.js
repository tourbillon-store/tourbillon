import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchCart, addShippingDetails, completePurchase, flushCart } from '../store'
import { Container, Header, Step, StepGroup, StepContent, StepTitle, StepDescription, Icon, Grid, GridColumn as Column, Table, TableHeader, TableHeaderCell as HeaderCell, TableBody as Body, TableRow as Row, TableCell as Cell, Button, Checkbox, Form  } from 'semantic-ui-react'
import { InputField } from 'react-semantic-redux-form';
import { CartRow } from '../components'

class Checkout extends Component {
  componentDidMount () {
    this.props.getCart(this.props.user.id)
  }

  render() {
    const { cart, checkout, handleSubmit, handleShippingFormSubmit, handleBillingFormSubmit } = this.props
    const { completedShippingForm, completedBillingForm } = checkout
    return (
      <Container className="checkout-container">
        <Grid columns={2} divided="vertically" padded="vertically" relaxed="very">
          <Column className="checkout-column">
            <StepGroup fluid vertical>
              <Step completed={completedShippingForm} active={!completedShippingForm} >
                <Icon name="truck" />
                <StepContent>
                  <StepTitle>Shipping</StepTitle>
                  <StepDescription>Choose your shipping options</StepDescription>
                </StepContent>
              </Step>
              <Step completed={false} active={completedShippingForm}>
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
          <Column className="checkout-column">
            {!completedShippingForm &&
            <Form className="checkout-form" size="large" onSubmit={handleSubmit(values => handleShippingFormSubmit(values))}>
              <Field
                name="address"
                component={InputField}
                label="Shipping Address"
                placeholder="Address, City, State, Zip Code"
                required />
              <Field
                name="email"
                component={InputField}
                label="Email"
                placeholder="Email"
                required />
              <Form.Field
                control={Button}
                primary
                className="submit-btn"
                type="submit">
                Confirm Shipping Details
              </Form.Field>
            </Form>
            }
            {completedShippingForm && !completedBillingForm &&
              <Form className="checkout-form" size="large" onSubmit={handleSubmit(() => handleBillingFormSubmit())}>
              <Field
                name="agree"
                component={Checkbox}
                label="I promise to send a check for these watches very soon"
              />
              <Form.Field
                control={Button}
                primary
                className="submit-btn"
                type="submit">
                Confirm Purchase
              </Form.Field>
            </Form>
            }
          </Column>
        </Grid>
      </Container>
    )
  }
}

const mapState = ({ cart, user, checkout }) => ({ cart, user, checkout })
const mapDispatch = (dispatch) => {
  return {
    getCart(userId) { dispatch(fetchCart(userId)) },
    handleShippingFormSubmit(values) {
      values.completedShippingForm = true
      dispatch(addShippingDetails(values))
    },
    handleBillingFormSubmit() {
      dispatch(completePurchase())
      dispatch(flushCart())}
  }
}

Checkout = connect(
  mapState,
  mapDispatch
)(Checkout)

export default (reduxForm({
  form: 'Shipping'
})(Checkout))
