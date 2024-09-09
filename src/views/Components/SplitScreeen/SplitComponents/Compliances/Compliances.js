import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

//*Components
import Header from "../../Header/Header";
import FormCompliances from "./FormCompliances";

export default function Compliances() {
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
          <FormCompliances />
        </CardBody>
      </Card>
    </div>
  );
}
