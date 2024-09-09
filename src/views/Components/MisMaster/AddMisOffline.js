import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postOfflineProperties } from "../../../Redux/Creators/OffilePropertiesCreators";

function AddMisOffline(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = new FormData();
    data.append("application_no", values.application_no);
    data.append("customer_name", values.customer_name);
    data.append("bank_name", values.bank_name);
    data.append("branch_name", values.branch_name);
    data.append("created_date", values.created_date);
    data.append("postal_address", values.postal_address);
    data.append("vertical", values.vertical);
    data.append("product", values.product);
    data.append("rate", values.rate);
    data.append("kms", values.kms);
    data.append("cost", values.cost);
    data.append("final_value", values.final_value);
    data.append("file", values.file);

    props.postOfflineProperties(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Add" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Add
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Offline Properties</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              application_no: "",
              customer_name: "",
              bank_name: "",
              branch_name: "",
              created_date: moment().format("YYYY-MM-DD"),
              postal_address: "",
              vertical: "",
              product: "",
              rate: "",
              kms: "",
              cost: "",
              final_value: "",
              file: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              application_no: Yup.string().required(
                "Application Number is required"
              ),
              customer_name: Yup.string().required(
                "Customer Name are required"
              ),
              bank_name: Yup.string().required("Bank Name is required"),
              branch_name: Yup.string().required("Branch Name is required"),
              created_date: Yup.string().required("Date is required"),
              postal_address: Yup.string().required(
                "Postal Address is required"
              ),
              vertical: Yup.string().required("Vertical is required"),
              product: Yup.string().required("Product is required"),
              rate: Yup.string().required("Rate is required"),
              kms: Yup.string().required("KMS is required"),
              cost: Yup.string().required("Cost is required"),
              final_value: Yup.string().required("Final Value is required"),
              file: Yup.string().required("File is required"),
            })}
          >
            {(formProps) => (
              <Form encType="multipart/form-data">
                <Row>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Application Number *"
                      id="application_no"
                      name="application_no"
                      value={formProps.values.application_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.application_no &&
                        Boolean(formProps.errors.application_no)
                      }
                      helperText={
                        formProps.touched.application_no &&
                        formProps.errors.application_no
                      }
                    />
                  </Col>

                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Customer Name *"
                      id="customer_name"
                      name="customer_name"
                      value={formProps.values.customer_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.customer_name &&
                        Boolean(formProps.errors.customer_name)
                      }
                      helperText={
                        formProps.touched.customer_name &&
                        formProps.errors.customer_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      id="bank_name"
                      name="bank_name"
                      label="Bank Name *"
                      value={formProps.values.bank_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.bank_name &&
                        Boolean(formProps.errors.bank_name)
                      }
                      helperText={
                        formProps.touched.bank_name &&
                        formProps.errors.bank_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Branch Name *"
                      id="branch_name"
                      name="branch_name"
                      value={formProps.values.branch_name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.branch_name &&
                        Boolean(formProps.errors.branch_name)
                      }
                      helperText={
                        formProps.touched.branch_name &&
                        formProps.errors.branch_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="created_date"
                      name="created_date"
                      label="Date *"
                      value={formProps.values.created_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.created_date &&
                        Boolean(formProps.errors.created_date)
                      }
                      helperText={
                        formProps.touched.created_date &&
                        formProps.errors.created_date
                      }
                    />
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Postal Address *"
                      id="postal_address"
                      name="postal_address"
                      value={formProps.values.postal_address}
                      onChange={formProps.handleChange}
                      multiline
                      minRows={2}
                      maxRows={4}
                      error={
                        formProps.touched.postal_address &&
                        Boolean(formProps.errors.postal_address)
                      }
                      helperText={
                        formProps.touched.postal_address &&
                        formProps.errors.postal_address
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Vertical *"
                      id="vertical"
                      name="vertical"
                      value={formProps.values.vertical}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.vertical &&
                        Boolean(formProps.errors.vertical)
                      }
                      helperText={
                        formProps.touched.vertical && formProps.errors.vertical
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Product *"
                      id="product"
                      name="product"
                      value={formProps.values.product}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.product &&
                        Boolean(formProps.errors.product)
                      }
                      helperText={
                        formProps.touched.product && formProps.errors.product
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="number"
                      label="Rate *"
                      id="rate"
                      name="rate"
                      value={formProps.values.rate}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.rate && Boolean(formProps.errors.rate)
                      }
                      helperText={
                        formProps.touched.rate && formProps.errors.rate
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="number"
                      label="No. of KMS *"
                      id="kms"
                      name="kms"
                      value={formProps.values.kms}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.kms && Boolean(formProps.errors.kms)
                      }
                      helperText={formProps.touched.kms && formProps.errors.kms}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="number"
                      label="Cost *"
                      id="cost"
                      name="cost"
                      value={formProps.values.cost}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.cost && Boolean(formProps.errors.cost)
                      }
                      helperText={
                        formProps.touched.cost && formProps.errors.cost
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="number"
                      label="Final Value *"
                      id="final_value"
                      name="final_value"
                      value={formProps.values.final_value}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.final_value &&
                        Boolean(formProps.errors.final_value)
                      }
                      helperText={
                        formProps.touched.final_value &&
                        formProps.errors.final_value
                      }
                    />
                  </Col>

                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      type="file"
                      size="small"
                      focused
                      variant="outlined"
                      id="file"
                      name="file"
                      label="File Upload *"
                      onChange={(event) => {
                        formProps.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                        console.log("file", formProps.values.file);
                      }}
                      error={
                        formProps.touched.file && Boolean(formProps.errors.file)
                      }
                      helperText={
                        formProps.touched.file && formProps.errors.file
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
    postOfflineProperties: (data, token) =>
      dispatch(postOfflineProperties(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMisOffline);
