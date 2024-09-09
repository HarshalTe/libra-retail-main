import React from "react";
import CasesUplaodedTable from "./CasesUplaodedTable";
import { Card, CardBody, CardHeader } from "reactstrap";

function CasesUplaodedOnlineDetails() {
  return (
    <Card className="m-4">
      <CardHeader className="bg-gradient-yellow">
        <strong>Cases Uplaoded Table Filed</strong>
      </CardHeader>
      <CardBody>
        <CasesUplaodedTable />
      </CardBody>
    </Card>
  );
}

export default CasesUplaodedOnlineDetails;
