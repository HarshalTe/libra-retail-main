import React from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { CardBody, Card, CardHeader, CardFooter, Row, Col ,
  Table,
  Label,
  Button,
  FormGroup,
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
  PaginationItem,} from "reactstrap";
  import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../../../variables/charts";

import { Bar } from "react-chartjs-2";

import PendingAmount from "./PendingAmount";
import CasesOnHold from "./CasesOnHold";
import PendingAmountPie from "./PendingAmountPie";
import TotalAmountPie from "./TotalAmountPie";

import PiTotalAmount from "./PiTotalAmount";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from "@mui/material/Tooltip";
//*Actions
import { getBillDashboard } from "../../../../Redux/Creators/BillDashboardCreators";
import PreLoader from "components/Loaders/PreLoader";
import TDSNotRecivedTable from "../BillLevel3/TDSTables/TDSNotRecivedTable"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import TDSReceivedTable from "../BillLevel3/TDSTables/TDSReceivedTable";


function TdsDetails(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [modal, setModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndtDate] = React.useState();
  const toggle = () => setModal(!modal);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
console.log("objectstartDate",startDate,endDate)
  const options = [
    '',
    'Q1: January 1 - March 31.',
    'Q2: April 1 – June 3.',
    'Q3: July 1 – September 30.',
    'Q4: October 1 – December 31.',
  ];
  let date={
    "StartDate": startDate,
    "EndDate": endDate
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getBillDashboard(data);
  };
  const approveAll = (values, { setSubmitting }) => {
    setStartDate(values.startdate);
    setEndtDate(values.enddate);
    setModal(!modal)
   };

  return (
    <div>
      {props.billDashboard.isLoading ? (
        <div className="pt-4 px-3">
          <PreLoader />
        </div>
      ) : (
        <div className="pt-4 px-3">
          <Row className="pt-1 pb-1">
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>TDS To be Collected</strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.received_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-info text-white">
                  <strong>TDS Recevied </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.pending_amoumt}
                  </strong>
                </CardBody>
              </Card>
            </Col>

            <Col md={4} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>TDS Pending </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                    {props?.billDashboard?.billDashboard?.data?.tds_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>GST Ammount </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                  {props?.billDashboard?.billDashboard?.data?.gst_amount}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>GST Paid </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                  {props?.billDashboard?.billDashboard?.data?.gst_payed}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
                  <strong>GST Unpaid </strong>
                </CardHeader>
                <CardBody>
                  <strong>
                  {props?.billDashboard?.billDashboard?.data?.gst_unpayed}
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
              <Card>
                <CardHeader className="bg-info text-white">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => toggle()}
          >
          Select Date
        </Button>
      <Modal
        // className="modal-sm"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Enter Date</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              enddate: "",
              startdate: "",
            }}
            onSubmit={approveAll}
            validationSchema={Yup.object().shape({
              startdate: Yup.string().required("StartDate is required"),
              enddate: Yup.string().required("EndDate is required"),
            })}
          >
            {(formProps) =>{ 
              
            return(
              <Form enctype="multipart/form-data">
                <Row>
                  <Col md={1} ></Col>
                  <Col style={{fontSize:"20px", fontWeight:"700"}}>
                  Select Date?
                  </Col>
                </Row>
                <Row style={{marginBottom:"18px"}}>
                  {/* <Col md={1} ></Col> */}
                  <Col md={6} className="">
                  <Label>Start Date</Label>
                  <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="startdate"
                      name="startdate"
                      // label="StartDate"
                      value={formProps.values.startdate}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.startdate && Boolean(formProps.errors.startdate)
                      }
                      helperText={
                        formProps.touched.startdate && formProps.errors.startdate
                      }
                    />
                    </Col>
                  <Col md={6} className="">
                  <Label>End Date</Label>
                  <TextField
                      fullWidth
                      type="date"
                      size="small"
                      variant="outlined"
                      id="enddate"
                      name="enddate"
                      // label="EndDate"
                      value={formProps.values.enddate}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.enddate && Boolean(formProps.errors.enddate)
                      }
                      helperText={
                        formProps.touched.enddate && formProps.errors.enddate
                      }
                    />
                    </Col>
                </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      style={{backgroundColor:"#2dce89"}}
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      style={{backgroundColor:"#f5365c"}}
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}}
          </Formik>
        </ModalBody>
      </Modal>
                </CardHeader>
                <CardBody>
                  <strong>
                    
                  </strong>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} className="pt-2 pb-2">
            <div>
    </div>
              {/* <Card>
                <CardHeader className="bg-info text-white" onClick={handleClickListItem}>
                  <Button>Select EndDate</Button>
                </CardHeader>
                <CardBody>
                 
                </CardBody>
              </Card> */}
            </Col>
          </Row>

          <div>
        {/* <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: 'background.paper' }}
        >
          <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="When device is locked"
              secondary={options[selectedIndex]}
            />
          </ListItem>
        </List> */}
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>

    <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Pending TDS Details</strong>
            </Col>
            <Col md={4}></Col>
            <Col>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
            <TDSNotRecivedTable  DateData={date} />

          <div>
          </div>
        </CardBody>
      </Card>
    <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Recived TDS Details</strong>
            </Col>
            <Col md={4}></Col>
            <Col>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
            <TDSReceivedTable  DateData={date} />

          <div>
          </div>
        </CardBody>
      </Card>


         
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    billDashboard: state.billDashboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillDashboard: (data) => dispatch(getBillDashboard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TdsDetails);
