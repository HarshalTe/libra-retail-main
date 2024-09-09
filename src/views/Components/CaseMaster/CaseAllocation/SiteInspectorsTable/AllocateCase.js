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

//*Components
import SiteInspectorsTable from "./SiteInspectorsTable";

function AllocateCase(props) {
  console.log("selected cases", props.data);
  console.log("selected casessssss", props);
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);

  const propertiesIDs = props.data.map((data) => data.id);
  console.log("propertiesIDS", propertiesIDs);
  // const selectionModelArray = React.useMemo(
  //   () => (props?.data?.length > 0 ? props.data : []),
  //   [props.data]
  // );

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="primary"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Allocate
      </Button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Allocate Case</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Typography variant="subtitle1">
            Selected Cases:{" "}
            {props.data.map((data) => (
              <div className="d-flex flex-wrap">
              <h6>Application No.: {data?.application_no}</h6> &nbsp; &nbsp;
              <h6>Customer Name: {data?.customer_name}</h6> &nbsp; &nbsp;
              <h6>Branch Name: {data?.branch?.branch_name}</h6> &nbsp; &nbsp;
              <h6>Address: {data?.legal_address}</h6> &nbsp; &nbsp;
              <h6>Location: {data?.location}</h6> &nbsp; &nbsp;
              <h6>Pincode: {data?.pincode}</h6> &nbsp; &nbsp;
              </div>
            ))}
          </Typography>

          <SiteInspectorsTable
            data={{ propertiesIDs: propertiesIDs, allocateCaseModal: setModal }}
          />

          <Col md={12}>
            <Button
              size="small"
              color="error"
              variant="contained"
              fullWidth
              onClick={() => setModal(!modal)}
            >
              Close
            </Button>
          </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllocateCase);
