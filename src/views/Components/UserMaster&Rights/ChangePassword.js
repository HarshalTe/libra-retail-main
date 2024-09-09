import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@material-ui/core/TextField";

import { changeUserPassword } from "../../../Redux/Creators/UsersCreators";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

function ChangePassword(props) {
  const token = props.login?.login?.token;
  console.log("Password Change User:", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    console.log("modal", modal);
    setModal(!modal);
    console.log("modal", modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Add Users:", values);

    let data = {
      token: token,
      pageno: props?.data?.pageno,
      pageSize: props?.data?.pageSize,
      id: values.id,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    props.changeUserPassword(data);
    setSubmitting(true);
    return;
  };

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="error"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<LockIcon />}
      >
        Change Password
      </Button>
      {/* <MenuItem
        onClick={() => {
          {
            // props.handleClose();
            toggle();
          }
        }}
        disableRipple
      >
        <LockIcon />
        Change Password
      </MenuItem> */}

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Change Password
        </ModalHeader>
        <ModalBody>
          {" "}
          <Formik
            initialValues={{
              id: props?.data?.id,
              name: props?.data?.name,
              password: "",
              password_confirmation: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // name: Yup.string().required("Name is required"),

              password: Yup.string().required("Password is required"),

              password_confirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      id="name"
                      disabled
                      name="name"
                      size="small"
                      label="Name"
                      value={formProps.values.name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.name && Boolean(formProps.errors.name)
                      }
                      helperText={
                        formProps.touched.name && formProps.errors.name
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      id="password"
                      name="password"
                      label="Password"
                      value={formProps.values.password}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.password &&
                        Boolean(formProps.errors.password)
                      }
                      helperText={
                        formProps.touched.password && formProps.errors.password
                      }
                    />
                    {/* <ErrorMessage /> */}
                  </Col>

                  <Col md={6} style={{ paddingBottom: "20px" }}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      id="password_confirmation"
                      name="password_confirmation"
                      label="Confirm Password"
                      value={formProps.values.password_confirmation}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.password_confirmation &&
                        Boolean(formProps.errors.password_confirmation)
                      }
                      helperText={
                        formProps.touched.password_confirmation &&
                        formProps.errors.password_confirmation
                      }
                    />
                    {/* <ErrorMessage /> */}
                  </Col>
                </Row>

                <br />
                <br />

                <Row style={{ justifyContent: "center" }}>
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUserPassword: (data) => dispatch(changeUserPassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
