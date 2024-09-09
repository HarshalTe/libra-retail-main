import React, { useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, Divider } from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { assetsPostData } from "../../../../Redux/Creators/AssetsCreators";

function CreateAssets(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = new FormData();
    data.append("user_id", values.user_id);
    data.append("name", values.name);
    data.append("remark", values.remark);
    data.append("type", values.type);
    data.append("photo", values.photo);
    data.append("bill_photo", values.bill_photo);
    data.append("allocate_date", values.allocate_date);
    data.append("purchase_date", values.purchase_date);
    console.log("Values In Upload file:", data, values);

    props.assetsPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  const projectsProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((project) => project),
  };

  return (
    <div>
      <Tooltip
        title="Add Company Asset"
        placement="right"
        className="m-2"
        style={{ float: "right" }}
      >
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create Company Asset
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Company Asset</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: "",
              name: "",
              remark: "",
              type: "",
              photo: "",
              allocate_date: "",
              purchase_date: "",
              bill_photo: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   pincode: Yup.string().required("Pincode is required"),
              // instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={12} className="">
                    <>
                      <Autocomplete
                        id="contact-autocomplete"
                        options={projectsProps.options}
                        getOptionLabel={(project) => `${project?.name}`}
                        onChange={(e, value) => {
                          console.log(value, e, "ere");
                          formProps.setFieldValue("user_id", value?.id || "");
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.user_id &&
                                formProps.errors.user_id
                            )}
                            fullWidth
                            helperText={
                              formProps.touched.user_id &&
                              formProps.errors.user_id
                            }
                            label="Employee Id"
                            name="user_id"
                            variant="outlined"
                          />
                        )}
                      />
                    </>
                  </Col>

                  <Col md={6} className="">
                    <Label>Assets Name</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Assets Name"
                      id="name"
                      name="name"
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

                  <Col md={6} className="">
                    <Label>Remark</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Remark"
                      id="remark"
                      name="remark"
                      value={formProps.values.remark}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.remark &&
                        Boolean(formProps.errors.remark)
                      }
                      helperText={
                        formProps.touched.remark && formProps.errors.remark
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Type</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Type"
                      id="type"
                      name="type"
                      value={formProps.values.type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.type && Boolean(formProps.errors.type)
                      }
                      helperText={
                        formProps.touched.type && formProps.errors.type
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Assets Photo</Label>
                    <TextField
                      fullWidth
                      size="small"
                      name="photo"
                      variant="outlined"
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "photo",
                          e.currentTarget.files[0]
                        );
                      }}
                      type="file"
                      error={
                        formProps.touched.photo &&
                        Boolean(formProps.errors.photo)
                      }
                      helperText={
                        formProps.touched.photo && formProps.errors.photo
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Allocate Date</Label>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      // label="Assets "
                      id="allocate_date"
                      name="allocate_date"
                      value={formProps.values.allocate_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.allocate_date &&
                        Boolean(formProps.errors.allocate_date)
                      }
                      helperText={
                        formProps.touched.allocate_date &&
                        formProps.errors.allocate_date
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Purchase Date</Label>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      // label="Assets "
                      id="purchase_date"
                      name="purchase_date"
                      value={formProps.values.purchase_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.purchase_date &&
                        Boolean(formProps.errors.purchase_date)
                      }
                      helperText={
                        formProps.touched.purchase_date &&
                        formProps.errors.purchase_date
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Upload Bill Photo</Label>
                    <TextField
                      fullWidth
                      size="small"
                      name="bill_photo"
                      variant="outlined"
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "bill_photo",
                          e.currentTarget.files[0]
                        );
                      }}
                      type="file"
                      error={
                        formProps.touched.bill_photo &&
                        Boolean(formProps.errors.bill_photo)
                      }
                      helperText={
                        formProps.touched.bill_photo &&
                        formProps.errors.bill_photo
                      }
                    />
                  </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
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

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                  {/* <Col md={4}>
                   <View/>
                  </Col> */}
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
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    assetsPostData: (data, token) => dispatch(assetsPostData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAssets);
