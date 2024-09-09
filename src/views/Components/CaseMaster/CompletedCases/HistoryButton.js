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

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

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
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HistoryIcon from "@mui/icons-material/History";
import MenuItem from "@mui/material/MenuItem";

//*compo
import HistoryTable from "./HistoryTable";

function HistoryButton(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Bank Add:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
    };

    // props.banksEditData(data);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <MenuItem
        disableRipple
        // className="ml-2"
        color="warning"
        onClick={() => {
          setModal(!modal);
        }}
      >
        <HistoryIcon color="info" />
      </MenuItem>

      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Case History</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <HistoryTable data={props.data} />
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
    // banksEditData: (data) => dispatch(banksEditData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryButton);
