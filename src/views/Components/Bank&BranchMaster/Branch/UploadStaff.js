import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function UploadStaff(props) {
  const token = props.login?.login[0]?.success?.token;

  const [modal, setModal] = useState(false);

  return (
    <div>
      {/* <Button
        size="sm"
        className="ml-2"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Create
      </Button> */}
      <MenuItem disableRipple onClick={() => setModal(!modal)}>
        {/* <MailIcon /> */}
        <FileUploadIcon />
        Upload Staff
      </MenuItem>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Staff Upload</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          {" "}
          <Formik
            initialValues={{
              file_upload: "",
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              //   branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <Typography>Download Template</Typography>
                    <Divider className="pt-1" />
                    <br />
                    <Button size="sm" color="success">
                      Download
                    </Button>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col md={12} style={{ paddingBottom: "20px" }}>
                    <Typography>Upload File</Typography>
                    <Divider className="pt-1" />
                    <br />
                    <TextField
                      fullWidth
                      type="file"
                      size="small"
                      variant="outlined"
                      id="file_upload"
                      name="file_upload"
                      value={formProps.values.file_upload}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.file_upload &&
                        Boolean(formProps.errors.file_upload)
                      }
                      helperText={
                        formProps.touched.file_upload &&
                        formProps.errors.file_upload
                      }
                    />
                  </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button color="success" block size="sm" type="submit">
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="danger"
                      block
                      size="sm"
                      onClick={() => setModal(!modal)}
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

export default UploadStaff;
