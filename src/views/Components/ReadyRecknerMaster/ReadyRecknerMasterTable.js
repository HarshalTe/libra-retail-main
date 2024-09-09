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
import {getReadyrecknersList} from "../../../Redux/Creators/ReadyRecknersCreators"
import {readyrecknersEditData} from "../../../Redux/Creators/ReadyRecknersCreators"
import {readyrecknersPostData} from "../../../Redux/Creators/ReadyRecknersCreators"
import {DeleteReadyreckners} from "../../../Redux/Creators/ReadyRecknersCreators"
import EditReadyReackner from "./EditReadyReackner"
import DeleteReadyReckner from "./DeleteReadyReckner"
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

function ReadyRecknerMasterTable(props) {
  const [pageSize, setPageSize] = React.useState(10);

  let ready_reckner_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "ready_reckner_master"//r
  );

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      width: 150,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (data) => {
        return <div className="d-flex">
          {ready_reckner_master.update_status=="1"?(
          <EditReadyReackner  data={data.row} index={data.row.id}/>
          ):("")}
          {ready_reckner_master.delete_status=="1"?(
          <DeleteReadyReckner  data={data.row} index={data.row.id}/>
          ):("")}
          </div>;
        },
      },
      { field: "id", headerName: "ID", width: 50 },
    {
      field: "village_name",
      headerName: "Village Name",
      width: 180,
    },

    {
      field: "area_type",
      headerName: "Area Type",
      width: 100,
    },
    {
      field: "local_body_type",
      headerName: "Local Body Type",
      width: 150,
    },
    {
      field: "local_body_name",
      headerName: "Local Body Name",
      width: 120,
    },
    {
      field: "landmark",
      headerName: "Landmark",
      width: 120,
    },
    {
      field: "zone",
      headerName: "Zone",
      width: 100,
    },
    {
      field: "subzone",
      headerName: "Subzone",
      width: 100,
    },
    {
      field: "land",
      headerName: "Land",
      width: 170,
    },
    {
      field: "residential",
      headerName: "Residential",
      width: 190,
    },
    {
      field: "office",
      headerName: "Office",
      width: 100,
    },
    {
      field: "shop",
      headerName: "Shop",
      width: 100,
    },
    {
      field: "industrial",
      headerName: "Industrial",
      width: 180,
    },
    {
      field: "tps_no",
      headerName: "TPS No.",
      width: 180,
    },
    {
      field: "cs_no",
      headerName: "CS No",
      width: 180,
    },
  ];
  
  const rows = props.readyReckners?.isLoading
  ? []
  : props.readyReckners?.readyReckners?.length > 0
    ? props.readyReckners?.readyReckners
    : [];
console.log("objectprops",rows,props)
useEffect(() => {
  const token = props.login?.login?.token;
  let data = {
    token: token,
  };
  props.getReadyrecknersList(data);
}, []);

return (
  <DataGrid
  rows={rows}
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
    readyReckners: state.readyReckners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReadyrecknersList: (data) => dispatch(getReadyrecknersList(data)),
    readyrecknersEditData: (data) => dispatch(readyrecknersEditData(data)),
    readyrecknersPostData: (data) => dispatch(readyrecknersPostData(data)),
    DeleteReadyreckners: (data) => dispatch(DeleteReadyreckners(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyRecknerMasterTable);
