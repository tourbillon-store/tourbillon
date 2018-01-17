import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from 'react-semantic-redux-form'

const WatchForm = (props) => {
  const { watches, initialValues } = props
  const watchId = initialValues ? initialValues.id : null
  return (
    <Form className="watch-form" onSubmit={props.handleSubmit((values) => props.handleFormSubmit(values, watchId, watches))}>
      <Field className="watch-form-field" name="make" component={InputField} type="make" placeholder="Make" label="Make" />
      <Field className="watch-form-field" name="model" component={InputField} type="model" placeholder="Model" label="Model" />
      <Field className="watch-form-field" name="complications" component={InputField} type="complications" placeholder="Complication" label="Complication" />
      <Field className="watch-form-field" name="imageUrl" component={InputField} type="imageUrl" placeholder="ImageUrl" label="ImageUrl" />
      <Field className="watch-form-field" name="year" component={InputField} type="year" placeholder="Year" label="Year" />
      <Field className="watch-form-field" name="price" component={InputField} type="price" placeholder="Price" label="Price" />
      <Field className="watch-form-field" name="available" component={InputField} type="available" placeholder="Availability" label="Availability" />
      <div>
        <Button primary disabled={props.pristine || props.submitting} onClick={props.reset}>Reset Form</Button>
        <Button primary disabled={props.pristine || props.submitting} type="submit">Submit</Button>
      </div>
    </Form>
  )
}

export default reduxForm({ form: 'WatchForm' })(WatchForm);
