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
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import CustomeInput from "views/Views/CustomeInput";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//*
import BillLevel3AllTable from "./BillLevel3All/BillLevel3AllTable";
import ProcessedBillTable from "./ProcessedBills/ProcessedBillTable";
import ReopenBillsTable from "./ReopenBillsTable/ReopenBillsTable";
import CancelledBillsTables from "./ReopenBillsTable/CancelledBillsTables";
import TDSNotRecivedTable from "./TDSTables/TDSNotRecivedTable";
import TDSReceivedTable from "./TDSTables/TDSReceivedTable";

function BillLevel3() {
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
              <strong>CA Level</strong>
            </Col>
            <Col md={4}></Col>

            <Col></Col>
            <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-BillLevel3AllTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download Completed Bill"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel
                    </Button>
                    </ReactHTMLTableToExcel>
                  </div>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <br />

          <div>
            <BillLevel3AllTable />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Processed Bills (GST paid)</strong>
            </Col>
            <Col md={4}></Col>

            <Col></Col>
            <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-ProcessedBillTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                      >
                      Download Excel
                    </Button>
                      </ReactHTMLTableToExcel>
                  </div>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <br />

          <div>
            <ProcessedBillTable />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Cancelled Bills</strong>
            </Col>
            <Col md={4}></Col>

            <Col></Col>
            <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-ReopenBillsTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                      >
                      Download Excel
                    </Button>
                      </ReactHTMLTableToExcel>
                  </div>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
         
          <br />

          <div>
            <ReopenBillsTable />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Cancelled Bill Process- GST to be Collected</strong>
            </Col>
            <Col md={4}></Col>

            <Col></Col>
            <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-CancelledBillsTables"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel
                    </Button>
                      </ReactHTMLTableToExcel>
                  </div>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
        
          <br />

          <div>
            <CancelledBillsTables />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>Pending TDS</strong>
            </Col>
            <Col md={4}></Col>

            <Col>
             
            </Col>
            <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-TDSNotRecivedTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                      >
                      Download Excel
                    </Button>
                      </ReactHTMLTableToExcel>
                  </div>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
          
          <br />

          <div>
            <TDSNotRecivedTable />
          </div>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>
              <strong>TDS Recived</strong>
            </Col>
            <Col md={4}></Col>

            <Col></Col>
            <Col>
                  <div className="d-flex">
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-sm-button btn-success"
                  table="table-TDSReceivedTable"
                  filename="members"
                  sheet="tablecsv"
                  buttonText="Download"
                >
                    <Button
                      className="ml-3"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Download Excel
                    </Button>
                      </ReactHTMLTableToExcel>
                  </div>
                </Col>
          </Row>
        </CardHeader>
        <CardBody>
         
          <br />

          <div>
            <TDSReceivedTable />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default BillLevel3;
