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
  ModalFooter,
} from "reactstrap";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

function ViewQueries(props) {
  const token = props.login?.login[0]?.success?.token;

  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="success"
        onClick={() => {
          setModal(!modal);
        }}
      >
        View
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>View Queries</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Row className="pb-4">
            <Col md={4}>
              <h4>Remark: {props?.data?.remark}</h4>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            size="small"
            className="float-right"
            variant="contained"
            color="error"
            onClick={() => setModal(!modal)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ViewQueries;
