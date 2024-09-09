/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHardCopiesPage } from "Redux/Entites/HardCopies";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EditCorier from "./EditCorier";
import DeleteCourier from "./DeleteCourier";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CourierTable(props) {
  const [pageSize, setPageSize] = React.useState(10);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "tracking",
      headerName: "Tracking Number",
      flex: 1,
      // valueFormatter: ({ value }) => `${value.name}`,
      // renderCell: ({ value }) => value.name,
    },

    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
    {
      field: "delivery",
      headerName: "Delivery",
      flex: 1,
    },
    {
      field: "tracking_link",
      headerName: "Tracking Link",
      flex: 1,
    },
    {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 160,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return <div className="d-flex">
           <EditCorier  data={params.row} index={params.row.id}/>
        <DeleteCourier index={params.row.id}/>
        </div>
    },
  },
  ];

  const rows = props.hardCopies?.isLoading
    ? []
    : props.hardCopies?.hardCopies?.data?.length > 0
    ? props.hardCopies?.hardCopies?.data
    : [];

    const isZero = function (params) {
      console.log("params",params)
      return params?.is_sent == 0
    }

    const filterRow = rows.filter(isZero)

  useEffect(() => {
    const token = props.login?.login?.token;
    let data = {
      token: token,
      pageno: 1,
      pageSize: 100,
    };
    props.getHardCopiesPage(data);
  }, []);

  return (
    <DataGrid
      rows={filterRow}
      columns={columns}
      loading={props.hardCopies?.isLoading ? true : false}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 20, 50]}
      pagination
      components={{
        Toolbar: CustomToolbar,
      }}
      checkboxSelection
      disableSelectionOnClick
      autoHeight
    />
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    hardCopies: state.hardCopies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHardCopiesPage: (data) => dispatch(getHardCopiesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierTable);
