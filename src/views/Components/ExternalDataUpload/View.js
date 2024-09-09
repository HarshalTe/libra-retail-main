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
} from "reactstrap";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

function ViewExternalDataUpload(props) {
  const token = props.login?.login[0]?.success?.token;

  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button
        size="sm"
        className="ml-2"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        View
      </Button>
      <Modal
        className="modal-info modal-sm"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          External Data Details
        </ModalHeader>
        <ModalBody>External Data Details</ModalBody>
      </Modal>
    </div>
  );
}

export default ViewExternalDataUpload;
