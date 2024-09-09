import React, { useState } from "react";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  Label,
} from "reactstrap";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@mui/material";

import { Typography } from "@mui/material";

//*Actions
// import { uploadDocuments } from "../../../../../Redux/Creators/DocumentsCreators";

function SendMail(props) {
  const [textValue, setTextValue] = useState('I hope this email finds you well. We urgently require the Sale Deed and Pan Card documents for our project. Your prompt attention to this matter is crucial to avoid any delays in the project timeline. Your cooperation is greatly appreciated.');

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

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

    // props.uploadDocuments(data, token);
    setSubmitting(false);
    setModal(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => toggle()}
      >
        <i className="" aria-hidden="true"></i>Send mail
      </Button>
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
          ></TextField>
        </Col>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={7}
          placeholder="Mail Details"
          style={{ width: 725, margin: "auto" }}
          value={textValue} 
        onChange={handleTextChange}
        />

        <Divider />

        <Row className="pt-4 pd-4 m-4">
          <Col md={12}>
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

const mapStateToProps = (state) => {
  return {
    property: state.property,
    documents: state.documents,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // uploadDocuments: (data, token) => dispatch(uploadDocuments(data, token)),
  };
};

export default SendMail;
