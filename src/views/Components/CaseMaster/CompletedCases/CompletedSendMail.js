import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  // Button,
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
import { baseUrl } from "../../../../shared/baseURL";
import Swal from "sweetalert2";


//*Actions
//  send mail new added
function CompletedSendMail(props) {
  const token = props.login?.login?.token;

  console.log("object",props,props?.data?.row?.property_id,props?.data?.row.bank_id)
  const [modal, setModal] = useState(false);
  const toggle = () => {
    let data ={
      email_reports:1,
      property_id:props?.data?.row?.id
    }
    // console.log("object",props,data,props?.data?.row?.property_id,props?.data?.row)
    SendMail(data)
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Bank Add:", values);

    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
    };
    let user = {
      tracking: values.tracking,
      options: values.options,
      company_name: values.company_name,
      delivery: values.delivery,
      tracking_link: values.tracking_link,
      property_id: values.property_id,
      bank_id: values.bank_id,
      branch_id: values.branch_id,
    };

    // props.hardCopiesPostData(data, user, setSubmitting, toggle);
    setSubmitting(true);
  };

  const SendMail = (data) => {
      const myheader = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      });
    
      return fetch(baseUrl + "send-mail", {
        method: "post",
        headers: myheader,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          let error = new Error(
            "Error:" + response.status + "Error Text: " + response.statusText
          );
    
          error.response = response;
          throw error;
        })
        .then((response) => response.json())
        .then((graphData) => {
          console.log("post mail Send data", graphData);
          Swal.fire({
            position: "success",
            icon: "success",
            title: "Successfully Mail Send!",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.isDismissed) {
            }
          });
        })
    };
    
  return (
    <div>
      <Button
        variant="outlined"
        // color="info"
        size="small"
        className="ml-3 p-2"
        onClick={() => toggle()}
      >
        Send Mail
      </Button>
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
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedSendMail);
