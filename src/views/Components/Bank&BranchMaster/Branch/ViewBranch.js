import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import { Button } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

function ViewBranch(props) {
  const [modal, setModal] = useState(false);

  return (
    <div>
      {/* <Button
        size="sm"
        color="success"
        // variant="contained"
        onClick={() => {
          setModal(!modal);
        }}
      >
        <VisibilityIcon color="inherit" />
        View
      </Button> */}
      <MenuItem disableRipple onClick={() => setModal(!modal)}>
        <VisibilityIcon color="success" />
        {/* View */}
      </MenuItem>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Branch Details</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Row className="pb-4">
            <Col md={3}>
              <h4>Bank Code: {props?.data?.bank_code}</h4>
            </Col>
            <Col md={3}>
              <h4>Bank Name: {props?.data?.bank_name}</h4>
            </Col>
            <Col md={3}>
              <h4>Branch Name: {props?.data?.branch_name}</h4>
            </Col>
            <Col md={3}>
              <h4>Branch Code: {props?.data?.branch_code}</h4>
            </Col>
          </Row>

          <Row className="pb-4">
            <Col md={12}>
              <h4>Address: {props?.data?.address}</h4>
            </Col>
          </Row>

          <Row className="pb-4">
            <Col md={6}>
              <h4>Mobile No.1:{props?.data?.mobile_no_1}</h4>
            </Col>
            <Col md={6}>
              <h4>Mobile No.2: {props?.data?.mobile_no_2}</h4>
            </Col>
          </Row>

          <Row className="pb-4">
            <Col md={12}>
              <h4>Email for Reports:</h4>
              {props?.data?.email_details
                ?.filter((data) => data?.email_type == "reports")
                .map((data) => (
                  <ol>
                    <li>{data?.email}</li>
                  </ol>
                ))}
            </Col>
          </Row>

          <Row className="pb-4">
            <Col md={12}>
              <h4>Email for Billing:</h4>
              {props?.data?.email_details
                ?.filter((data) => data?.email_type == "billing")
                .map((data) => (
                  <ol>
                    <li>{data?.email}</li>
                  </ol>
                ))}
            </Col>
          </Row>

          <Row className="pb-4">
            <Col md={3}>
              <h4>City: {props?.data?.city}</h4>
            </Col>
            <Col md={3}>
              <h4>State: {props?.data?.state}</h4>
            </Col>
            <Col md={3}>
              <h4>Country: {props?.data?.country}</h4>
            </Col>
            <Col md={3}>
              <h4>Pin Code: {props?.data?.pincode}</h4>
            </Col>
          </Row>

          <Row className="pb-4">
            <Col md={3}>
              <h4>Remark: Remark</h4>
            </Col>
            <Col md={3}>
              <h4>Report Type: {props?.data?.report_type}</h4>
            </Col>
            <Col md={3}>
              <h4>GST IN No.: {props?.data?.gstno}</h4>
            </Col>
            <Col md={3}>
              <h4>Site Visit AutoMail: {props?.data?.site_visit_automail}</h4>
            </Col>
          </Row>
        </ModalBody>
        <Divider />
        <ModalFooter className="pt-2 pb-2 pr-2">
          <Button
            size="sm"
            className="float-right"
            // variant="contained"
            color="danger"
            onClick={() => setModal(!modal)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ViewBranch;
