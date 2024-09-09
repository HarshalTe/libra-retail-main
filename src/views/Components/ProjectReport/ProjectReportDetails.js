import React from "react";
import ProjectReportTable from "./ProjectReportTable";
import { Card, CardBody, CardHeader } from "reactstrap";

function ProjectReportDetails() {
  return (
    <Card className="m-4">
      <CardHeader className="bg-gradient-yellow">
        <strong>Project Report Details</strong>
      </CardHeader>
      <CardBody>
        <ProjectReportTable />
      </CardBody>
    </Card>
  );
}

export default ProjectReportDetails;
