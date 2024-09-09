import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
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

//*Actions
// import { banksEditData } from "../../../../Redux/Creators/BanksCreators";

function ViewAllocatedCases(props) {
  console.log("props", props.data);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setScheduledDate(null);
  };

  const [scheduledDate, setScheduledDate] = useState(null);

  const handlescheduledDateChange = (event) => {
    console.log("event.target", event.target.value);
    setScheduledDate(event.target.value);
  };

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="warning"
        onClick={() => {
          toggle();
        }}
      >
        View
      </Button>
      <Modal className="modal-xl" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>
          <Typography>
            <strong>View Allocate Case</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Col md={12} className="pb-2">
            <TextField
              fullWidth
              type="date"
              size="small"
              focused
              variant="outlined"
              id="scheduledDate"
              name="scheduledDate"
              label="Search By Date"
              value={scheduledDate}
              onChange={(event) => handlescheduledDateChange(event)}
            />
          </Col>
          <Col md={12} className="pb-2">
          <div style={{ overflowX: "auto" }}>
            <Table
              className="table table-sm"
              style={{ fontSize: "12px", textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th scope="col">DATE</th>
                  <th scope="col">Customer Name & CUSTOMER mob no.</th>
                  <th scope="col">Contact Person Name & Contact Person No.</th>
                  <th scope="col">Address</th>
                  <th scope="col">BRANCH</th>
                </tr>
              </thead>
              <tbody>
                {props?.data?.properties
                  ?.filter((property) => {
                    if (scheduledDate != null) {
                      if (property?.scheduled_date == scheduledDate) {
                        return property;
                      }
                      return;
                    }
                    return property;
                  })
                  ?.map((property) => (
                    <tr>
                      <td>{property?.scheduled_date}</td>
                      <td>{property?.customer_name} / </td>
                      <td>{property?.contact_person_name} / {property?.contact_person_cell_no}</td>
                      <td>{property.legal_address}</td>
                      <td>{property?.branch?.branch_name}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            </div>
          </Col>
          <Col md={12}>
            <Button
              size="small"
              color="error"
              variant="contained"
              fullWidth
              onClick={() => toggle()}
            >
              Close
            </Button>
          </Col>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewAllocatedCases;
