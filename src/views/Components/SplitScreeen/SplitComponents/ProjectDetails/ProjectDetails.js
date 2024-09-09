import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

//*compoenet
import Header from "../../Header/Header";
import ProjectDetailsTabs from "./ProjectDetailsTabs";

function ProjectDetails(props) {
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
          <ProjectDetailsTabs />
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties,
  };
};

export default connect(mapStateToProps, null)(ProjectDetails);
