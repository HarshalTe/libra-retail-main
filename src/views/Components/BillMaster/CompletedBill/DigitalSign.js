import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
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
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//*Actions
import { billPaymentPost } from "../../../../Redux/Creators/FinalBillsCreators";

function DigitalSign(props) {
  const token = props.login?.login?.token;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  return (
    <div>
      <Tooltip title="Bill Paid" placement="top">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
        >
          Digital Sign 
        </Button>
      </Tooltip>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    paymentMaster: state.paymentMaster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    billPaymentPost: (data, token) => dispatch(billPaymentPost(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DigitalSign);
