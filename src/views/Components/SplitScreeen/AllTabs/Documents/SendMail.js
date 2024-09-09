import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
} from "reactstrap"
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import moment from "moment";

//*Actions
import { uploadDocuments } from "../../../../../Redux/Creators/DocumentsCreators";

function SendMail(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values", values);

    const data = new FormData();
    data.append("property_id", values.property_id);
    data.append("document_id", values.document_id);
    data.append("document_desc", values.document_desc);
    data.append("document_file", values.document_file);
    data.append("is_received", values.is_received);
    data.append("received_date", values.received_date);
    data.append("document_remark", values.document_remark);

    props.uploadDocuments(data, token);
    setSubmitting(false);
    setModal(true);
  };

  return (
    <div>
      <Tooltip title="Send Mail" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<MailIcon fontSize="small" />}
        >
          Send Mail
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Send Mail</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <Col md={4} className="ml-4 mb-2 mt-2">
          <Label>Send Mail To</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Send Mail to"
                      id="negative_info"
                      name="negative_info"
                      // value={formProps.values.negative_info}
                      // onChange={formProps.handleChange}
                    >
                      </TextField>
                  </Col>
        <TextareaAutosize
      aria-label="minimum height"
      minRows={7}
      placeholder="Mail Details"
      style={{ width: 725, margin:"auto" }}
    />

                <Divider />

                <Row className="pt-4 pd-4 m-4">
                  

                  <Col md={12} >
                    <Button
                      color="success"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>

           
      </Modal>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     property: state.property,
//     documents: state.documents,
//     login: state.login,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // uploadDocuments: (data, token) => dispatch(uploadDocuments(data, token)),
//   };
// };

export default (SendMail);
