import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link as DomLink, Link } from "react-router-dom";
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

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postPropertiesData } from "../../../../Redux/Creators/PropertiesCreators";

//*Components
import DedupeTable from "./DedupeTable";

function CreateCase(props) {
  const token = props.login?.login?.token;
  console.log("dedupe", props.data.project_id);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = () => {
    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      user_id: props.login?.login?.user?.id,
      employee_id: props.login?.login?.user?.id,
      status: props.login?.login?.user?.status,
      prospect_no: props?.data?.prospect_no,
      project_id: props?.data?.project_id,
      customer_name: props?.data?.customer_name,
      surname: props?.data?.surname,
      contact_person_name: props?.data?.contact_person_name,
      contact_person_cell_no: props?.data?.contact_person_cell_no,
      location: props?.data?.location,
      legal_address: props?.data?.legal_address,
      state: props?.data?.state,
      city: props?.data?.city,
      pincode: props?.data?.pincode,
      country: props?.data?.country,
      tp_no: props?.data?.tp_no,
      survey_no: props?.data?.survey_no,
      fp_no: props?.data?.fp_no,
      sp_no: props?.data?.sp_no,
      op_no: props?.data?.op_no,
      plot_no: props?.data?.plot_no,
      block_no: props?.data?.block_no,
      flat_no: props?.data?.flat_no,
      khasra_no: props?.data?.khasra_no,
      nearby_landmark: props?.data?.nearby_landmark,
      latitude: props?.data?.latitude,
      longitude: props?.data?.longitude,
      postal_address: props?.data?.postal_address,
      remarks: props?.data?.remarks,
      vertical: props?.data?.vertical,
      product: props?.data?.product,
      bank_vertical_id: props?.data?.bank_vertical_id,
      bank_product_id: props?.data?.bank_product_id,
      branch_name: props?.data?.branch_name,
      branch_id: props?.data?.branch_id,
      bank_id: props?.data?.bank_id,
      bank_no: props?.data?.bank_no,
      property_type: props?.data?.property_type,
      configuration: props?.data?.configuration,
      inspection_date_time: props?.data?.inspection_date_time,
      district_name: props?.data?.district_name,
      document_details: [
        { document_name: "Pan Card", status: props?.data?.pancard_status },
        { document_name: "Adhar Card", status: props?.data?.adharcard_status },
        {
          document_name: "Tax Details",
          status: props?.data?.taxdetails_status,
        },
        { document_name: "Index XI", status: props?.data?.index11_status },
        { document_name: "Sale Deed", status: props?.data?.saledeed_status },
        {
          document_name: "Sale Certificate",
          status: props?.data?.salecertificate_status,
        },
      ],
    };

    console.log("submit data", data);

    props.postPropertiesData(data);
  };

  return (
    <div>
      <Tooltip title="Create Case" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="success"
          size="small"
          className="ml-3"
          onClick={() => handleSubmit()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create Case Without Clone
        </Button>
      </Tooltip>
      {/* <Button size="small" variant="contained" color="info">
        <DomLink to={`/admin/viewWorkInProgress/20`}>Create Case</DomLink>
      </Button> */}
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
    postPropertiesData: (data) => dispatch(postPropertiesData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCase);
