import React from "react";

import TabsValuation from "./TabsValuation";
import { Card, CardBody, CardHeader } from "reactstrap";

//*Compoenets
import Header from "../../Header/Header";

export default function Valuation() {
  return (
    <div>
      <br />
      <br />
      <br />
      <Card>
        <CardHeader className="ml-4 mr-4 mt--6 pb-0 bg-gradient-info text-white">
          <Header />
        </CardHeader>
        <CardBody className="px-0">
          <TabsValuation />
        </CardBody>
      </Card>
    </div>
  );
}
