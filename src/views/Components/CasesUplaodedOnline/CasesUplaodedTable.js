/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHardCopiesPage } from "Redux/Entites/HardCopies";
import { getCompletedPropertiesPage } from "../../../Redux/Creators/PropertiesCompletedCreators";
import { getPropertiesPage } from "../../../Redux/Creators/PropertiesCreators";



import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import CaseUploaded from "./CaseUploaded"

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

function CasesUplaodedTable(props) {
  const [pageSize, setPageSize] = React.useState(10);

  const columns = [
    {
      field: "application_no",
      width:120,
  
      headerName: "Application No.",
      
    },
    {
      field: "name_of_project",
      width:150,
      headerName: "Project/Property Name",
      renderCell: (row) => {
        return row.row?.project?.project_name
      },
    },
    {
      field: "type",
      width:70,
      headerName: "Type",
    },
    
    {
      field: "branch_name",
      width:130,
      headerName: "Branch Name",
      renderCell: (row) => {
        return row.row?.branch?.branch_name
      },
    },
    {
      field: "assigned_to",
      headerName: "Assigned to",
    },
    {
      field: "completed_date",
      width:170,
      headerName: "Completed Date",
    },
    
    {
      field: "actions",
      headerName: "Actions",
    align: "center",
    headerAlign: "center",
  
    width:250,
      renderCell: (row) => {
        return <div className="d-flex">
        {/* {work_in_progress_case_page.view_status == "1" ? (
          <DomLink
            to={`/admin/viewWorkInProgress/${row?.id}`}
          >
            <VisibilityIcon
              color="success"
              className="mt-1"
            />
          </DomLink>
        ) : (
          ""
        )}
  
                              <ReopenButton data={row} />
        <HistoryWIP data={row} />
        <Courier data={row} />
        <CompletedSendMail data={row}  /> */}
        <CaseUploaded data={row}/>

      </div>
      }  
  },
  ];

  const rows = props.completedProperties?.isLoading
    ? []
    : props.completedProperties?.completedProperties?.data?.length > 0
    ? props.completedProperties?.completedProperties?.data.filter((pur)=>{
      return(pur?.is_online_file_uploads==0)
    })
    : [];

  useEffect(() => {
    const token = props.login?.login?.token;
    let data = {
      token: token,
      pageno: 1,
      pageSize: 100,
    };
    props.getHardCopiesPage(data);
    props.getCompletedPropertiesPage(data);
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={props.completedProperties?.isLoading ? true : false}
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
    completedProperties: state.completedProperties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHardCopiesPage: (data) => dispatch(getHardCopiesPage(data)),
    getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
       getCompletedPropertiesPage: (data) =>
      dispatch(getCompletedPropertiesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CasesUplaodedTable);
