import * as React from "react";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
//* Actions
import { getBrokers } from "../../../../../Redux/Creators/BrokersCreators";
//*Compoenets

function NewTable(props) {
  const rows = props.brokers?.isLoading
    ? []
    : props.brokers?.brokers?.data?.length > 0
    ? props.brokers?.brokers?.data
    : [];

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "about", headerName: "About", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dealing_in", headerName: "Dealing In", flex: 1 },
    { field: "rera_no", headerName: "Rera No.", flex: 1 },
    { field: "nar_no", headerName: "Nar No.", flex: 1 },
    { field: "tread_no", headerName: "Tread No.", flex: 1 },
    { field: "propertyforsell", headerName: "Property For Sell", flex: 1 },
    { field: "propertyforrent", headerName: "Property For Rent", flex: 1 },
    { field: "serviceprovided", headerName: "Service Provided", flex: 1 },
    { field: "expert_in", headerName: "Expert in", flex: 1 },
    { field: "operate_in", headerName: "Operate in", flex: 1 },
  ];

  return (
    <>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={props?.brokers?.isLoading ? true : false}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    brokers: state.brokers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBrokers: (data) => dispatch(getBrokers(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewTable);
