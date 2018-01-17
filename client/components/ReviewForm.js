import React, { Component } from 'react';
import { Form, Button, Rating } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextArea } from 'react-semantic-redux-form';

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
        <div className="review-form-title-content">
          <Field className="review-form-title" name="title" component={InputField} type="title" placeholder="Title" />
          <Field name="content" component={TextArea} type="content" placeholder="Content" />
        </div>
        <Rating name="rating" clearable icon="star" defaultRating={3} maxRating={5} onRate={(evt, { rating }) => this.setState({ rating })} /><br />
        <Button disabled={this.props.pristine || this.props.submitting} type="submit">Submit</Button>
      </Form>
    );
  }
}

export default reduxForm({ form: 'ReviewForm' })(ReviewForm);
