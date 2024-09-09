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

// Components that exists
import { postLogin } from "../../../Redux/Creators/LoginCreatorss";
import CustomInput from "../../Components/Custom/CustomInput";
import LinerLoader from "components/Loaders/LinerLoader";

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postLogin: (data,setSubmitting) => dispatch(postLogin(data,setSubmitting)),
});

const Login = (props) => {
  console.log("props", props);
  const handleSubmit = (values, { setSubmitting }) => {
    let data = {
      email: values.email,
      password: values.password,
    };

    console.log("__", data);

    setSubmitting(true);
    props.postLogin(data,setSubmitting);
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

          <CardHeader className="bg-transparent pb-1 text-blue h2">
            {/* <Row>
              <Col>ADMIN LOGIN</Col>
              <Col>
                <Button size="sm" color="success" className="float-right">
                  <Link to="/auth/employeeLogin" style={{ color: "white" }}>
                    Employee
                  </Link>
                </Button>
              </Col>
            </Row> */}
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
                        // autoComplete="new-email"
                        className={
                          "form-control" +
                          (formProps.errors.email && formProps.touched.email
                            ? " is-invalid"
                            : "")
                        }
                      />
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
                    {props.login?.isLoading && <LinerLoader/>}
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/forgot-password" style={{ textDecoration: "none" }}>
            {/* <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            > */}
              <small>Forgot password?</small>
            {/* </a> */}
          </Link>
          </Col>
          <Col className="text-right" xs="6">
           <Link className="text-right" to="/register-user" xs="6" style={{ textDecoration: "none"}}>
            {/* <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            > */}
              <small>Create new account</small>
            {/* </a> */}
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
