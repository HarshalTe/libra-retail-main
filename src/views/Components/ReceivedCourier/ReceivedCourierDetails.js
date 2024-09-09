import React from "react";
import CourierTable from "./CourierTable";
import Courier from "./Courier";
import { Card, CardBody, CardHeader } from "reactstrap";


function ReceivedCourierDetails() {
  return (
    <Card className="m-4">
      <CardHeader className="bg-gradient-yellow">
        <strong>Received Courier</strong>
        <Courier/>
      </CardHeader>
      <CardBody>
        <CourierTable />
      </CardBody>
    </Card>
  );
}

export default ReceivedCourierDetails;
