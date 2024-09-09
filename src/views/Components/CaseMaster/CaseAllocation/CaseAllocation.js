import React from "react";
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
  Form,
} from "reactstrap";

import CaseAllocationTable from "./CaseAllocationTable/CaseAllocationTable";
import CaseAllocationTable2 from "./CaseAllocationTable/CaseAllocationTable2";
import SiteInspectorTable2 from "./SiteInspectorTable";
import CaseAllocationMap from "./CaseAllocationMap";

export default function CaseAllocation() {
  return (
    <div className="px-4">
      <br />
      <Row>
        <Col md={12} className="pb-4">
          <Card>
            <CardHeader>
              Case Allocation</CardHeader>
            <CardBody><strong>
              Remarks: Cases Shown below are the one not having pincode mapped with Engineer
            </strong>
              <CaseAllocationTable2 />
              {/* <CaseAllocationTable /> */}
            </CardBody>
          </Card>
        </Col>

        {/* <Col md={12} className="pb-4">
          <Card>
            <CardHeader>Site Inspectors</CardHeader>
            <CardBody>
              <SiteInspectorTable2 />
            </CardBody>
          </Card>
        </Col> */}
      </Row>
      {/* <Row>
        <Col>
          <CaseAllocationMap />
        </Col>
      </Row> */}
    </div>
  );
}
