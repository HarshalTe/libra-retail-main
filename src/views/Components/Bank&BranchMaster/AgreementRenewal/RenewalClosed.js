import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Modal, ModalHeader, ModalBody } from "reactstrap";

import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@material-ui/core";

import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*
import moment from "moment";

//* Actions
import { agreementClose } from "../../../../Redux/Creators/AgreementRenewalCreators";
// import { getBranchesPage } from "../../../Redux/Creators/BranchesCreators";

function RenewalClosed(props) {
  const token = props.login?.login?.token;

  
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const closeRenewal = () => {
    //form data mai aayega
    // const data = new FormData();
    // data.append("token", token);
    // data.append("bank_id", props?.data?.bank_id);
    // data.append("start_date", props?.data?.start_date);
    // data.append("end_date", props?.data?.end_date);
    // data.append("aggrement_copy", props?.data?.aggrement_copy);
    // data.append("rate_card", props?.data?.rate_card);
    // data.append("is_close", "1");

    const data={
      token:token,
      id:props?.data?.id,
      is_close:1,
      bank_id: props?.data?.bank_id

    }
    console.log(props,"selected")
    
    props.agreementClose(data);
  };

  const flatProps = {
    options: props?.banks?.isLoading
      ? []
      : props.banks.banks.data.map((bank) => bank.bank_name),
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        className="ml-2"
        color="warning"
        onClick={() => {
          closeRenewal();
        }}
      >
        {props.data.is_close==1?"closed":"close"}
        {/* Close */}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    banks: state.banks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    agreementClose: (data) => dispatch(agreementClose(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenewalClosed);
