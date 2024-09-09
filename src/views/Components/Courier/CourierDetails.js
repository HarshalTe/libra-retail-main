import React from "react";
import CourierTable from "./CourierTable";
import { Card, CardBody, CardHeader } from "reactstrap";

function CourierDetails() {
  return (
    <Card className="m-4">
      <CardHeader className="bg-gradient-yellow">
        <strong>Courier Details</strong>
      </CardHeader>
      <CardBody>
        <CourierTable />
      </CardBody>
    </Card>
  );
}

export default CourierDetails;
