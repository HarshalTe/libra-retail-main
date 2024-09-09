import React from "react";
import { connect } from "react-redux";

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridToolbar,
  GridCallbackDetails,
} from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
//*actions
import LinerLoader from "../../../components/Loaders/LinerLoader";
import { getdropdownDetailsPage } from "../../../Redux/Creators/DropdownDetailsCreators";
import EditMasterDocuments from "./EditMasterDocuments";

const columns = [
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: true,
  },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 150,
  //     editable: false,
  //   },

  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: (params) => {
      console.log("params1", params);
      //   const onClick = (e) => {
      // console.log("params", params);
      // e.stopPropagation(); // don't select this row after clicking
      // const api: GridApi = params.api;
      // const thisRow: Record<string, GridCellValue> = {};
      // api
      //   .getAllColumns()
      //   .filter((c) => c.field !== "__check__" && !!c)
      //   .forEach(
      //     (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
      //   );
      // return alert(JSON.stringify(thisRow, null, 4));
      //   };
      //   return <Button onClick={onClick}>Click</Button>;
      return <EditMasterDocuments data={params?.row?.data} />;
    },
  },
];

function createData(id, description, type, data) {
  return {
    id,
    description,
    type,
    data,
  };
}

function MasterDocumentGrid(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (page) => {
    const token = props.login?.login?.token;
    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getdropdownDetailsPage(data);
  };

  const handleChangePage = (newPage) => {
    console.log("vvv", newPage);

    setPage(newPage);
    fetchData(newPage);
  };
  //   var rows = props.dropdownDetails.dropdownDetails.data.map((data) =>
  //     createData(data.id, data.name, data.dropdown.name)
  //   );
  //   console.log("row", rows);
  const rows = props.dropdownDetails.isLoading
    ? []
    : props.dropdownDetails.dropdownDetails.data.map((data) =>
        createData(data.id, data.name, data.dropdown.name, data)
      );

  return (
    <div>
      {props.dropdownDetails.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            // rows={rows}
            // loading={props.dropdownDetails.isLoading ? true : false}
            columns={columns}
            pageSize={rowsPerPage}
            rowsPerPageOptions={[1, 5, 10]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            style={{ border: "0px" }}
            rowCount={props?.dropdownDetails?.dropdownDetails?.total}
            page={page}
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    dropdownDetails: state.dropdownDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getdropdownDetailsPage: (data) => dispatch(getdropdownDetailsPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterDocumentGrid);
