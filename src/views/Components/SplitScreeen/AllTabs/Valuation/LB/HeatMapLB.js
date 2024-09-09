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
} from "reactstrap";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
// import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function HeatMapLB(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Tooltip title="Heat Map" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          // startIcon={<AddIcon fontSize="inherit" />}
        >
          Heat Map
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Heat Map Data</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>Heat Map Grpah</ModalBody>
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
    // editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatMapLB);
