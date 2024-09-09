import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
//*Actions
// this components is ues for only view full address on hower
function ViewAddress(props) {
  console.log(props,"ssssssssss")
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      id: props?.data?.id,
      company_detail_id: values.company_detail_id,
      account_no: values.account_no,
      account_name: values.account_name,
      ifsc_code: values.ifsc_code,
      account_type: values.account_type,
      amount: null,
      remark: null,
      qr_code: values.qr_code,
    };

    // props.editPaymentMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title={props.data.legal_address} placement="left">
        <Button
        //   variant="outlined"
        //   color="warning"
        //   size="small"
        //   className="p-1"
          onClick={() => toggle()}
        >
          <VisibilityIcon fontSize="medium" />
        </Button>
      </Tooltip>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAddress);
