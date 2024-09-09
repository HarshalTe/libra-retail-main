import React from "react";
import SiteErTabs1 from "./SiteErTabs1";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Typography } from "@material-ui/core";
import RateCard from "./RateCard";
import SpeedDials from "./SpeedDials";
import Header from "../../Header/Header";

export default function SiteEngineer1() {
  const [modal2, setModal2] = React.useState(false);
  const toggle2 = () => {
    setModal2(!modal2);
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <RateCard modal2={modal2} toggle2={toggle2} />
      <Card>
        <CardHeader className="ml-4 mr-4 mt--6 pb-0 bg-gradient-info text-white">
          <Header />
        </CardHeader>

        <CardBody className="px-0">
          <div>
            <SiteErTabs1 modal2={modal2} toggle2={toggle2} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
