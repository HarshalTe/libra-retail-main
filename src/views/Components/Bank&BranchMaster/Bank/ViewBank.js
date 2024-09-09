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

function ViewBank(props) {
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
            <strong>Bank Details</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Row className="pb-4">
            <Col md={4}>
              <h4>Bank Name: {props?.data?.bank_name}</h4>
            </Col>
            <Col md={4}>
              <h4>Bank Code: {props?.data?.bank_code}</h4>
            </Col>
            <Col md={4}>
              <h4>Short Code: {props?.data?.short_code}</h4>
            </Col>
          </Row>
          <Row className="pb-4">
            <Col md={6}>
              <h4>Format: {props?.data?.format}</h4>
            </Col>

            <Col md={6}>
              <h4>Agreement Start Date: {props?.data?.agreement_start_date}</h4>
            </Col>
          </Row>
          <Row className="pb-4">
            <Col md={6}>
              <h4>Agreement End Date: {props?.data?.agreement_end_date}</h4>
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

export default ViewBank;
