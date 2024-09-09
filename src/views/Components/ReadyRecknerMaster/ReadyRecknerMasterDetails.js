import React from "react";
import ReadyRecknerMasterTable from "./ReadyRecknerMasterTable";
import { Card, CardBody, CardHeader } from "reactstrap";
import CreateReadyReackner from "./CreateReadyReackner";
import { connect } from "react-redux";

function ReadyRecknerMasterDetails(props) {
  
  let ready_reckner_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "ready_reckner_master"//r
  );

  return (
    <Card className="m-4">
      <CardHeader className="bg-gradient-yellow">
        <strong>Ready Reckoner Master</strong>
      </CardHeader>
   {ready_reckner_master.update_status=="1"?(
      <CreateReadyReackner/>
   ):("")}

      <CardBody>

        <ReadyRecknerMasterTable />
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    readyReckners: state.readyReckners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyRecknerMasterDetails);
