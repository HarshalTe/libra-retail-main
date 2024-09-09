import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//*
import { editPageRights } from "../../../../Redux/Creators/UsersCreators";

function EditPageRights(props) {
  const token = props.login?.login?.token;
  console.log("Edit User:", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    console.log("modal", modal);
    setModal(!modal);
    console.log("modal", modal);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Edit Page Rights:", values);

    let data = {
      token: token,
      user_id: values.user_id,
      pageSize: 10000,
      pageno: 1,
      rights: [
        {
          id: values.id,
          user_id: values.user_id,
          emp_id: null,
          page_id: values.page_id,
          create_status: values.create_status,
          delete_status: values.delete_status,
          view_status: values.view_status,
          update_status: values.update_status,
        },
      ],
    };

    console.log("submit data", data);

    props.editPageRights(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>
          {props?.data?.page?.name} Rights
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id: props.data.id,
              user_id: props.data.user_id,
              emp_id: null,
              page_id: props.data.page_id,
              create_status: props.data.create_status,
              delete_status: props.data.delete_status,
              view_status: props.data.view_status,
              update_status: props.data.update_status,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   mobile_no: Yup.string().required("Mobile No. is required"),
            })}
          >
            {(formProps) => (
              <Form>
                {console.log("create_status:", formProps.values.create_status)}
                {console.log("view_status:", formProps.values.view_status)}
                {console.log("update_status:", formProps.values.update_status)}
                {console.log("delete_status:", formProps.values.delete_status)}
                <Row>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="create_status"
                          name="create_status"
                          value={formProps.values.create_status}
                          checked={
                            formProps.values.create_status == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("create_status", 0)
                              : formProps.setFieldValue("create_status", 1);
                          }}
                        />
                      }
                      label="Create"
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="view_status"
                          name="view_status"
                          value={formProps.values.view_status}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("view_status", 0)
                              : formProps.setFieldValue("view_status", 1);
                          }}
                          checked={
                            formProps.values.view_status == 1 ? true : false
                          }
                        />
                      }
                      label="View"
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="update_status"
                          name="update_status"
                          value={formProps.values.update_status}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("update_status", 0)
                              : formProps.setFieldValue("update_status", 1);
                          }}
                          checked={
                            formProps.values.update_status == 1 ? true : false
                          }
                        />
                      }
                      label="Update"
                    />
                  </Col>
                  <Col md={3} className="pb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          id="delete_status"
                          name="delete_status"
                          value={formProps.values.delete_status}
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue("delete_status", 0)
                              : formProps.setFieldValue("delete_status", 1);
                          }}
                          checked={
                            formProps.values.delete_status == 1 ? true : false
                          }
                        />
                      }
                      label="Delete"
                    />
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
    editPageRights: (data) => dispatch(editPageRights(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPageRights);
