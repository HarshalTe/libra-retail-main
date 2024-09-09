import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

//*compoenet
import Header from "../../Header/Header";
import FormAnnexure from "./FormAnnexure";

export default function Annexure() {
  return (
    <div>
      <br />
      <br />
      <br />
      <Card>
        <CardHeader className="ml-4 mr-4 mt--6 pb-0 bg-gradient-info text-white">
          <Header />
        </CardHeader>
        <CardBody className="px-4">
          <FormAnnexure />
        </CardBody>
      </Card>
    </div>
  );
}
