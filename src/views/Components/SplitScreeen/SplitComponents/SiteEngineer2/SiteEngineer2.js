import React, { useState } from "react";
import SiteErTabs2 from "./SiteErTabs2";
import { Card, CardBody, CardHeader } from "reactstrap";
import RateCard from "../SiteEngineer1/RateCard";
import Header from "../../Header/Header";

export default function SiteEngineer2() {
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => {
    setModal2(!modal2);
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <RateCard toggl2={toggle2} modal2={modal2} />
      <Card>
        <CardHeader className="ml-4 mr-4 mt--6 pb-0 bg-gradient-info text-white">
          <Header />
        </CardHeader>
        <CardBody className="px-0">
          <SiteErTabs2 toggle2={toggle2} modal2={modal2} />
        </CardBody>
      </Card>
    </div>
  );
}
