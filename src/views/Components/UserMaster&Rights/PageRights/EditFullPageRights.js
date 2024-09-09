import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Modal, ModalHeader, ModalBody,Table } from "reactstrap";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import { Divider, Typography } from "@mui/material";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import AddIcon from "@mui/icons-material/Add";
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
      user_id: rows[0].id,
      id: rows[0].id,
      pageSize: 10000,
      pageno: 1,
      rights:values?.rights,
    };

    console.log("submit data", data);

    props.editPageRights(data);
    setSubmitting(true);
    setModal(false);
  };

  const rows = props?.users?.isLoading
  ? []
  : props?.users?.users?.data?.filter((row) => row?.name == props?.currentUser);

console.log(rows, "rowss",props);

  return (
    <div>
      <Button
        size="large"
        className="ml-2 mt-1"
        variant="contained"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Edit All
      </Button>
      

      <Modal className="modal-xl" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>
          {props?.data?.page?.name} Rights
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              // id: props.data.id,
              // user_id: props.data.user_id,
              rights:rows ? rows[0]?.rights:""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   mobile_no: Yup.string().required("Mobile No. is required"),
            })}
          >
            {(formProps) => (
              <Form>
               

                <Typography variant={"h5"}>Rights</Typography>
                <Divider />
                <Row className="pt-4 pb-2">
                  <Col md={12}>
                    <FieldArray
                      name="rights"
                      render={(arrayHelpers) => (
                        <div>
                          
                          <Table size="sm" className="mt-3">
                            <thead>
                              <tr>
                                <th>Page Name</th>
                                <th>Create</th>
                                <th>View</th>
                                <th>Update</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(
                                "values",
                                formProps?.values?.rights
                              )}
                              {formProps?.values?.rights?.map(
                                (rights, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{rights.page.name}</td>

                                      <td>
                                      <FormControlLabel
                      control={
                        <Switch
                          id="create_status"
                          name={`rights.${index}.create_status`}
                          value={rights.create_status}
                          onChange={(event) => {
                            event.target.value == 1
                            ? formProps.setFieldValue(`rights.${index}.create_status`, 0)
                            : formProps.setFieldValue(`rights.${index}.create_status`, 1);
                          }}
                          checked={
                            formProps.values.rights[index].create_status == 1 ? true : false
                          }
                        />
                      }
                      label="Create"
                    />
                                       
                                      </td>
                                      <td>
                                      <FormControlLabel
                      control={
                        <Switch
                          id="view_status"
                          name={`rights.${index}.view_status`}
                          value={rights.view_status}
                          checked={
                            rights.view_status == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue(`rights.${index}.view_status`, 0)
                              : formProps.setFieldValue(`rights.${index}.view_status`, 1);
                          }}
                        />
                      }
                      label="View"
                    />
                                      </td>
                                      <td>
                                      <FormControlLabel
                      control={
                        <Switch
                          id="update_status"
                          name={`rights.${index}.update_status`}
                          value={rights.update_status}
                          checked={
                            rights.update_status == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue(`rights.${index}.update_status`, 0)
                              : formProps.setFieldValue(`rights.${index}.update_status`, 1);
                          }}
                        />
                      }
                      label="Update"
                    />
                                      </td>
                                      <td>
                                      <FormControlLabel
                      control={
                        <Switch
                          id="delete_status"
                          name={`rights.${index}.delete_status`}
                          value={rights.delete_status}
                          checked={
                            rights.delete_status == 1 ? true : false
                          }
                          onChange={(event) => {
                            event.target.value == 1
                              ? formProps.setFieldValue(`rights.${index}.delete_status`, 0)
                              : formProps.setFieldValue(`rights.${index}.delete_status`, 1);
                          }}
                        />
                      }
                      label="Delete"
                    />
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </div>
                      )}
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPageRights: (data) => dispatch(editPageRights(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPageRights);
