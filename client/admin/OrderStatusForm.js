import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { SelectField } from 'react-semantic-redux-form';
import { Field, reduxForm } from 'redux-form';

const OrderStatusForm = (props) => {
  const { order } = props
  const statusOptions = ['cart', 'created', 'processing', 'cancelled', 'completed'];
  return (
    <Form onSubmit={props.handleSubmit((values) => props.handleFormSubmit(values))}>
    <Field name="status" component={SelectField} label="Status" placeholder={order.status} options={statusOptions} />
    <div>
        <Button disabled={props.pristine || props.submitting} onClick={props.reset}>Reset Form</Button>
        <Button disabled={props.pristine || props.submitting} type="submit">Update</Button>
    </div>
    </Form>
  )
}

export default reduxForm({ form: 'OrderStatusForm'})(OrderStatusForm)
