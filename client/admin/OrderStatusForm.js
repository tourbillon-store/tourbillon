import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { SelectField } from 'react-semantic-redux-form';
import { Field, reduxForm } from 'redux-form';

const OrderStatusForm = (props) => {
  const { order, orders } = props
  const statuses = ['cart', 'created', 'processing', 'cancelled', 'completed']
  let statusOptions = [{key: 'select', value: '', text: 'Select a Status'}]
  statuses.map((status, i) => {
    statusOptions.push({key: i, value: status, text: status});
  })
  return (
    <Form onSubmit={props.handleSubmit(values => props.handleFormSubmit(order.id, values, orders))}>
      <Field name="status" component={SelectField} placeholder={order.status} options={statusOptions} />
      <div>
          <Button disabled={props.pristine || props.submitting} onClick={props.reset}>Reset Form</Button>
          <Button disabled={props.pristine || props.submitting} type="submit">Update</Button>
      </div>
    </Form>
  )
}

export default reduxForm({ form: 'OrderStatusForm'})(OrderStatusForm)
