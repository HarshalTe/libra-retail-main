import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

//*Components
import Header from "../../Header/Header";
import FormRemark from "./FormRemark";

export default function Remark() {
  return (
    <div>
      <br />
      <br />
      <br />
      <Card>
        <CardHeader className="ml-4 mr-4 mt--6 pb-0 bg-gradient-info text-white">
          <Header />
        </CardHeader>
        <CardBody>
          <FormRemark />
        </CardBody>
      </Card>
    </div>
  );
}
