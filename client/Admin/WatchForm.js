import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from 'react-semantic-redux-form'

const WatchForm = (props) => {
  return (
    <Form className="watch-form" onSubmit={props.handleSubmit((values) => props.handleFormSubmit(values))}>
      <Field className="watch-form-field" name="make" component={InputField} type="make" placeholder="Make" />
      <Field className="watch-form-field" name="model" component={InputField} type="model" placeholder="Model" />
      <Field className="watch-form-field" name="complications" component={InputField} type="complications" placeholder="Complication" />
      <Field className="watch-form-field" name="imageUrl" component={InputField} type="imageUrl" placeholder="ImageUrl" />
      <Field className="watch-form-field" name="year" component={InputField} type="year" placeholder="Year" />
      <Field className="watch-form-field" name="price" component={InputField} type="price" placeholder="Price" />
      <Field className="watch-form-field" name="available" component={InputField} type="available" placeholder="Availability" />
      <div>
        <Button primary disabled={props.pristine || props.submitting} onClick={props.reset}>Reset Form</Button>
        <Button primary disabled={props.pristine || props.submitting} type="submit">Submit</Button>
      </div>
    </Form>
  )
}

export default reduxForm({ form: 'WatchForm' })(WatchForm);
