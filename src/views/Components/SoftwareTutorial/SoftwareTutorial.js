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

function SoftwareTutorial() {
  return (
    <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col>{/* <strong>Page Rights</strong> */}</Col>
            <Col md={4}></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12}>
              <Row>

              <Col md={4}>
                <h3>Overall Explantaion(Without Case)</h3>
              </Col>
              <Col md={4}>
                <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
                {/* <a
                  target="_blank"
                  href="https://drive.google.com/file/d/1_UcRMvl9d7TsQcnqZZbCgnFW6iUGFKkz/view?usp=share_link"
                  >
                  <Button width="540" height="450" color="info">
                    Click Here To see
                  </Button>
                </a> */}
              </Col>
                  </Row>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={4}>
                  <h3>Inside Case Explantion </h3>
                </Col>
                <Col md={4}>
                <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
                  {/* <a
                    href="https://drive.google.com/file/d/1KtsElhubKfXMJqnHCURyb9DwF044XXA1/view?usp=share_link"
                    target="_blank"
                  >
                    <Button width="540" height="450" color="info">
                      Click Here To see
                    </Button>
                  </a> */}
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={4}>
                  <h3>Case Initiation and Dedupe Video</h3>
                </Col>
                <Col md={6}>
                <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
                  {/* <a
                    target="_blank"
                    href="https://drive.google.com/file/d/1_zTI8v892zJM3at0-kCYSKnx4Nxv_3Gv/view?usp=share_link"
                  >
                    <Button width="540" height="450" color="info">
                      Click Here To see
                    </Button>
                  </a> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default SoftwareTutorial;
