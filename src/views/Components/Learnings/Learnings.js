import React, { useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

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
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

function Learnings() {
  const [employee, setEmployee] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (event) => {
    setEmployee(event.target.value);
  };

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div className="container-fluid">
      <br />
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Create Learnings</ModalHeader>
        <ModalBody>
          <h3>Create Learnings</h3>
        </ModalBody>
      </Modal>
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>{/* <strong>Page Rights</strong> */}</Col>
            <Col md={10}></Col>
            <Col>
              <Button size="sm" color="success" onClick={() => toggle()}>
                Create
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12}>
              <Box sx={{ minWidth: 20 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={employee}
                    label="types"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value={""}>Select Type</MenuItem>
                    <MenuItem value={"Circulars"}>Circulars</MenuItem>
                    <MenuItem value={"Building Bye-laws"}>
                      Building Bye-laws
                    </MenuItem>
                    <MenuItem value={"Court Judgment Copy"}>
                      Court Judgment Copy
                    </MenuItem>
                    <MenuItem value={"Guidlines"}>Guidlines</MenuItem>
                    <MenuItem value={"Guidlines For NOC"}>
                      Guidlines For NOC
                    </MenuItem>
                    <MenuItem value={"Industry Research Report"}>
                      Industry Research Report
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col>
          </Row>

          <Row>
            <br />
            <div
              style={{
                width: "100%",
                // overflow: "scroll",
                // overflowY: "hidden",
              }}
            >
              <Table
                className="table table-sm"
                style={{ fontSize: "12px", textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th scope="col">Type Date</th>
                    <th scope="col">Notification No.</th>
                    <th scope="col">Subject</th>

                    <th scope="col">City</th>
                    <th scope="col">Type</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>1 April, 2020</td>

                    <td>123</td>
                    <td>RBI Allowed Banks</td>
                    <td>DELHI</td>
                    <td>Court Judgment Copy</td>
                    <td>
                      <div className="d-flex">
                        <Button size="sm" color="success">
                          Download PDF
                        </Button>

                        <Button size="sm" color="warning">
                          Send Mail
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default Learnings;
