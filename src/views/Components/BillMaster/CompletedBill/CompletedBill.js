import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "../../../../components/Headers/Header";
import TextField from "@mui/material/TextField";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  Container,
  PaginationLink,
  Pagination,
  PaginationItem,
} from "reactstrap";

import CustomeInput from "views/Views/CustomeInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import BillPaidConfirm from "./BillPaidConfirm";
import Actions from "./Actions";
import ViewBill from "./ViewFinalBill";
// import CancelSelected from "./CancelSelected";
import FinalBillsApprovedTable from "./FinalBillsApprovedTable";
import PreLoader from "components/Loaders/PreLoader";

//*Actions
import { getPaymentMasterList } from "../../../../Redux/Creators/PaymentMasterCreators";

function CompletedBill(props) {
  const token = props.login?.login?.token;
  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.getPaymentMasterList(data);
  }, []);
  const [modal, setModal] = useState(false);

  const [action, setAction] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeAction = (event) => {
    console.log("Value", event.target.value);

    setAction(event.target.value);
    console.log(action);
  };
  
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      {props?.paymentMaster?.isLoading ? (
        <div>
          <PreLoader />
        </div>
      ) : (
        <div className="container-fluid">
          <br />
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>{/* <strong>BANK</strong> */}</Col>
                <Col md={4}></Col>
                    {/* <CancelSelected /> */}
                <Col md={2}>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-to-xls"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                  <Button size="sm" color="success">
                    Download Excel
                  </Button>
                  </ReactHTMLTableToExcel>
                </Col>
                {/* <Col md={2}>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-to-xls"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                />
              </Col> */}
                <Col md={2}>
                  <InputGroup>
                    <Input
                      type="select"
                      size="sm"
                      // value={filter}
                      // onChange={(event) => onChangeAction(event)}
                    >
                      <option value="">Select Filter</option>
                      <option value={"paid"}>Paid</option>
                      <option value={"unpaid"}>Unpaid</option>
                      {/* <option value={"cancel"}>Cancel</option> */}
                    </Input>
                  </InputGroup>
                </Col>

                {/* <Col md={4}>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="search by name"
                  size="sm"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col> */}

                {/* <Col>
              <Button
                className="btn-success  float-right"
                onClick={() => {
                  toggle();
                }}
              >
                Create Bill
              </Button>
            </Col> */}
              </Row>
              <Modal
                className="modal-info modal-lg"
                isOpen={modal}
                toggle={toggle}
              >
                <ModalHeader toggle={toggle}>Create New Bill</ModalHeader>
                <ModalBody>
                  <h1>Create New Bill</h1>
                </ModalBody>
              </Modal>
            </CardHeader>
            <CardBody>
              {/* <Row>
            <Col md={8}></Col>
            <Col md={2}>
              <Button color="success" size="sm" block>
                Paid All
              </Button>
            </Col>
            <Col md={2}>
              <Button color="danger" size="sm" block>
                Inactive All
              </Button>
            </Col>
          </Row> */}
              <Row>
                {/* <Col md={2}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth size="sm">
                  <InputLabel id="demo-simple-select-label">Bank</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Bank"
                  >
                    <MenuItem value={""}>Select Bank</MenuItem>
                    <MenuItem value={"ICICI"}>ICICI</MenuItem>
                    <MenuItem value={"SBI"}>SBI</MenuItem>
                    <MenuItem value={"KOTAK"}>KOTAK</MenuItem>
                    <MenuItem value={"RBL"}>RBL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col>

            <Col md={2}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth size="sm">
                  <InputLabel id="demo-simple-select-label">Branch</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Branch"
                  >
                    <MenuItem value={""}>Select Branch</MenuItem>
                    <MenuItem value={"Branch 1"}>Branch 1</MenuItem>
                    <MenuItem value={"Branch 2"}>Branch 2</MenuItem>
                    <MenuItem value={"Branch 3"}>Branch 3</MenuItem>
                    <MenuItem value={"Branch 4"}>Branch 4</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col> */}
                {/* <Col md={4}>
                  <Box sx={{ minWidth: 50 }}>
                    <FormControl fullWidth size="sm">

                      <TextField
                        id="outlined-basic"
                        label="Bill Number"
                        variant="outlined"
                        placeholder="Enter Bill Number"
                      />
                    </FormControl>
                  </Box>
                </Col>

                <Col md={4}>
                  <Box sx={{ minWidth: 50 }}>
                    <FormControl fullWidth size="sm">

                      <TextField
                        id="outlined-basic"
                        label="Branch Number"
                        variant="outlined"
                        placeholder="Enter Branch Number"
                      />
                    </FormControl>
                  </Box>
                </Col>

                <Col md={2}>
                  <Box sx={{ minWidth: 50 }}>
                    <FormControl fullWidth size="sm">

                      <TextField
                        id="outlined-basic"
                        label="Year"
                        variant="outlined"
                        placeholder="Enter Year"
                      />
                    </FormControl>
                  </Box>
                </Col>

                <Col md={2}>
                  <Box sx={{ minWidth: 50 }}>
                    <FormControl fullWidth size="sm">
                      <InputLabel id="demo-simple-select-label">
                        Month
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Month"
                      >
                        <MenuItem value={""}>Select Month</MenuItem>
                        <MenuItem value={"January"}>January</MenuItem>
                        <MenuItem value={"February"}>February</MenuItem>
                        <MenuItem value={"March"}>March</MenuItem>
                        <MenuItem value={"April"}>April</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Col> */}
              </Row>
              <br />

              <FinalBillsApprovedTable />
            </CardBody>
          </Card>
        </div>
      )}
    </>
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
    getPaymentMasterList: (data) => dispatch(getPaymentMasterList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedBill);
