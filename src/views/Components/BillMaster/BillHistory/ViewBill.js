import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  Table,
  ModalBody,
  ModalFooter,
  Label
} from "reactstrap";


import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

//*Actions

function ViewBill(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values);

   // ? FormData Chahiye File Upload hai
    const data = new FormData();
    data.append("pincode", values.pincode);
    data.append("instructions", values.instructions);
    // let data = {
      //   pincode:values.pincode,
      //   instrcutions: values.instrcutions,
      // };
      
      setSubmitting(true);
      setModal(false);
    };
    console.log("object111222",props)
  const columns = [
    { field: 'created_date', headerName: 'Bill Creation Date', width: 170,
    renderCell: (row) => {
      return row.row?.bank?.bank_name
    } 
   },
    { field: 'bill_account_number', headerName: 'Bill Created By', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];
  
  const rows = props?.data?.raw_bills
  console.log(rows, "hhhhhh",props.data)
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
  return (
    <div>
      <Tooltip title="Upload File" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
        //   startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          View
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>View</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
          >
           
              <Form enctype="multipart/form-data">
              <div style={{ height: 400, width: '100%' }}>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Bill Creation Date</th>
                    <th scope="col">Bill Created By</th>
                    <th scope="col">Bill Status</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="col">{formatDate(props?.data?.row?.created_at)}</th>
                    <th scope="col">{props?.data?.row?.user_id !== null ? props?.data?.row?.user_id?.user?.name : "" }</th>
                    <th scope="col">{props?.data?.row?.is_approved==0?"Not Approve":"Approved"}</th> *
                   </tr>

                  {/* {props?.graph?.EmployeeWiseStats?.initiated_case?.map((row,i)=>(
                  <tr key={i}>
                    <th scope="row">{row?.user_name}</th>
                    <td>{row?.prop_count}</td>
                    <td>{props?.graph?.EmployeeWiseStats?.completed_case[i]?.prop_count}</td>
                    <td>
                      <i className=" text-success mr-3" /> {Math.round(props?.graph?.EmployeeWiseStats?.percentage_case[i]?.percentage)}%
                    </td>
                  </tr>
                  ))} */}
                </tbody>
              </Table>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      
      /> */}
    </div>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="contained"
                      fullWidth
                      // type="submit"
                    onClick={() => toggle()}
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    finalBills: state.finalBills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBill);

