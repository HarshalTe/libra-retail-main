import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  // Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Redirect, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";

// Components that exists
import { postEmployeeLogin } from "../../../Redux/Creators/LoginCreatorss";
import CustomInput from "../../Components/Custom/CustomInput";

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postEmployeeLogin: (data) => dispatch(postEmployeeLogin(data)),
});

const EmployeeLogin = (props) => {
  console.log("props", props);
  const handleSubmit = (values, { setSubmitting }) => {
    let data = {
      email: values.email,
      password: values.password,
    };

    console.log("__", data);

    setSubmitting(true);
    props.postEmployeeLogin(data);
    return;
  };

  if (props.login.login != "") {
    return <Redirect to={"/dashboard"} />;
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader> */}

          <CardHeader className="bg-transparent pb-1 text-green h2">
            <Row>
              <Col>EMPLOYEE LOGIN</Col>
              <Col>
                <Button size="sm" color="primary" className="float-right">
                  <Link to="/auth/login" style={{ color: "white" }}>
                    Admin
                  </Link>
                </Button>
              </Col>
            </Row>
          </CardHeader>

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("Enter Your Email"),
                password: Yup.string().required("Enter Your Password"),
              })}
            >
              {(formProps) => (
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="company@email.com"
                        className={
                          "form-control" +
                          (formProps.errors.email && formProps.touched.email
                            ? " is-invalid"
                            : "")
                        }
                      />
                      {/* <Field
                        component={TextField}
                        name="email"
                        type="email"
                        label="Email"
                      /> */}
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        placeholder="* * * * * *"
                        type="password"
                        id="password"
                        name="password"
                        // autoComplete="new-password"
                        className={
                          "form-control" +
                          (formProps.errors.password &&
                          formProps.touched.password
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    {/* <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                      disabled={formProps.isSubmitting}
                    >
                      Sign in
                    </Button> */}
                    <Button
                      className="my-4"
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                    >
                      Log In
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeLogin)
);
