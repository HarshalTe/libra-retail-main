import React, { useState } from "react";
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
import Typography from "@mui/material/Typography";

import BillApprovalTable from "./BillApprovalTable";
import BillInitiation from "./BillInitiation";

//*Components
import BillTableAll from "../BillInitiation/BillTableAll";
import OnHoldBillsTable from "../BillInitiation/OnHoldBillsTable";
import UnbilledTable from "../BillInitiation/UnbilledTable";
import FinalBillsTable from "./FinalBillsTable";

function BillInitiationAndApprove() {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div className="pt-4 px-3">
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Bill Approval</strong>
            </Col>
            <Col md={4}></Col>
          

            <Col>
          
            </Col>
          </Row>
          <Modal className="modal-info modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Bill</ModalHeader>
            <ModalBody>
              <h1>Create New Bill</h1>
            </ModalBody>
          </Modal>
        </CardHeader>
        <CardBody>
          
          <br />

          <div>
            {/* <BillApprovalTable /> */}
            <FinalBillsTable />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="shadow-sm border-dark p-2 pb-4">
          <Row>
            <Col md={9}>
              <Typography variant="h6">Bill Initiation</Typography>
            </Col>

            <Col>
              <Button
                className="ml-8"
                color="primary"
                variant="contained"
                size="small"
              >
                GST
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {/* <Row>
            <Col md={2}>
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
            </Col>

            <Col md={4}>
              <Box sx={{ minWidth: 50 }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    id="join_date"
                    name="join_date"
                    required
                    label="Date Range"
                    inputVariant="outlined"
                    showTodayButton={true}
                    format="MM/dd/yyyy"
                    size="medium"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </Col>

            <Col md={2}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth size="sm">
                  <TextField
                    id="outlined-basic"
                    label="Vertical"
                    variant="outlined"
                    placeholder="Enter Vertical"
                  />
                </FormControl>
              </Box>
            </Col>

            <Col md={2}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth size="sm">
                  <TextField
                    id="outlined-basic"
                    label="Product"
                    variant="outlined"
                    placeholder="Enter Product"
                  />
                </FormControl>
              </Box>
            </Col>
          </Row> */}

          <div>
            <BillTableAll />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="shadow-sm border-dark p-2 pb-4">
          <Row>
            <Col md={10}>
              <Typography variant="h6">Bills on hold</Typography>
            </Col>

            <Col>
              <div className="d-flex">
                <Button
                  className="ml-3"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Download Excel
                </Button>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            <OnHoldBillsTable />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="shadow-sm border-dark p-2 pb-4">
          <Row>
            <Col md={10}>
              <Typography variant="h6">Un-Billed</Typography>
            </Col>

            <Col>
              <div className="d-flex">
                <Button
                  className="ml-3"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Download Excel
                </Button>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            <UnbilledTable />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default BillInitiationAndApprove;
