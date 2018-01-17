import React, { Component } from 'react';
import { Form, Button, Rating } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 3
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit((values) => this.props.handleFormSubmit(values, this.state.rating))}>
        <Field name="title" component={InputField} type="title" placeholder="Title" />
        <Field name="content" component={TextAreaField} type="content" placeholder="Content" />
        <Rating name="rating" clearable icon="star" defaultRating={3} maxRating={5} onRate={(evt, { rating }) => this.setState({ rating })} />
        <div>
          <Button disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>Reset Form</Button>
          <Button disabled={this.props.pristine || this.props.submitting} type="submit">Submit</Button>
        </div>
      </Form>
    );
  }
}

export default reduxForm({ form: 'ReviewForm' })(ReviewForm);
