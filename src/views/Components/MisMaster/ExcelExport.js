import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions

function ExcelExport(props) {
  console.log(props,"ssssssssss")
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {

      file_upload: values.file_upload,
    };

    // props.editPaymentMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Excel Export" placement="left">
      <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                    //   size="small"
                      onClick={() => toggle()}
                    >
                      Download MIS
                    </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Download MIS</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
             
              file_upload: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              
            //   account_type: Yup.string().required("Account Type is required"),
            })}
          >
            {(formProps) => {
              const companyProps = {
                options: props?.companies?.isLoading
                  ? []
                  : props?.companies?.companies?.data?.map(
                      (company) => company
                    ),
              };
              return (
                <Form>
                  <Row className="form-group">
                   
                    <Col md={6}>
                      {/* <Label className="label f-12"></Label> */}
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="file"
                        id="file_upload"
                        name="file_upload"
                        onChange={(e) => {
                          formProps.setFieldValue(
                            "file_upload",
                            e.currentTarget.files[0]
                          );
                        }}
                        error={
                          formProps.touched.file_upload &&
                          Boolean(formProps.errors.file_upload)
                        }
                        helperText={
                          formProps.touched.file_upload && formProps.errors.file_upload
                        }
                      />
                    </Col>
                    <Col>
                    <Button
                    //   className="ml-3"
                    //   color="primary"
                      variant="outlined"
                      size="small"
                    >
                      Download Template
                    </Button>
                    </Col>
                  </Row>

                  <Divider />

                  <Row className="p-4">
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
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExcelExport);
