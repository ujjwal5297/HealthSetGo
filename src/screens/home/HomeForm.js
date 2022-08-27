import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import {
  Form,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "font-awesome/css/font-awesome.css";
import FontAwesome from "react-fontawesome";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <Col sm={2}>
      <label>{label}</label>
    </Col>
    <Col sm={4}>
      <input {...input} type={type} placeholder={label} size="40" />
      {touched && error && <span>{error}</span>}
    </Col>
  </div>
);

const renderExtraForm = ({ fields, meta: { error } }) => (
  <ListGroup>
    <ListGroupItem listItem>
      <Button type="button" bsStyle="primary" onClick={() => fields.push()}>
        <FontAwesome name="plus" /> Add Extra Form
      </Button>
    </ListGroupItem>
    {fields.map((form, index) => (
      <ListGroupItem listItem key={index}>
        <Button
          type="button"
          bsStyle="danger"
          title="Remove Form"
          onClick={() => fields.remove(index)}
        >
          <FontAwesome name="trash" /> Remove Form
        </Button>
        <Row>
          <Field
            name={form}
            type="text"
            component={renderField}
            label={`Form #${index + 1}`}
          />
        </Row>
      </ListGroupItem>
    ))}
    {error && (
      <ListGroupItem listItem className="error">
        {error}
      </ListGroupItem>
    )}
  </ListGroup>
);

const renderForms = ({ fields, meta: { error, submitFailed } }) => (
  <ListGroup>
    <ListGroupItem listItem>
      <Button type="button" bsStyle="primary" onClick={() => fields.push({})}>
        <FontAwesome name="plus" /> Add Form
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </ListGroupItem>
    {fields.map((form, index) => (
      <ListGroupItem listItem key={index}>
        <Button
          type="button"
          bsStyle="danger"
          title="Remove Form"
          onClick={() => fields.remove(index)}
        >
          <FontAwesome name="trash" /> Remove Form
        </Button>
        <h4>Form #{index + 1}</h4>
        <Row>
          <Field
            name={`${form}.name`}
            type="text"
            component={renderField}
            label="Name*"
          />
          <Field
            name={`${form}.email`}
            type="text"
            component={renderField}
            label="Email*"
          />
          <Field
            name={`${form}.aadhar`}
            type="text"
            component={renderField}
            label="Aadhar Number*"
          />
          <Field
            name={`${form}.phoneNumber`}
            type="text"
            component={renderField}
            label="Phone Number"
          />
          <Field
            name={`${form}.description`}
            type="text"
            component={renderField}
            label="Description*"
          />
        </Row>
        <FieldArray name={`${form}.extraForm`} component={renderExtraForm} />
      </ListGroupItem>
    ))}
  </ListGroup>
);

const HomeForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Field
          name="categoryName"
          type="text"
          component={renderField}
          label="Category Name"
        />
        <Field
          name="categoryDescription"
          type="text"
          component={renderField}
          label="Category Description"
        />
      </Row>
      <FieldArray name="members" component={renderForms} />
      <div>
        <Button type="submit" bsStyle="primary" disabled={submitting}>
          Submit
        </Button>
        <Button
          type="button"
          bsStyle="default"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </Button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: "fieldArrays", // a unique identifier for this form
  validate,
})(HomeForm);
