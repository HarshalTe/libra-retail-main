/* eslint-disable eqeqeq */
import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { getBanksPage } from "Redux/Creators/BanksCreators";
import { connect } from "react-redux";

import ViewBranch from "./ViewBranch";
import EditBranch from "./EditBranch";
import { getBranchesPage } from "Redux/Creators/BranchesCreators";

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

function BranchTable2(props) {
  const [pageSize, setPageSize] = React.useState(10000);
  const mapPageToNextCursor = React.useRef({});

  const [page, setPage] = React.useState(0);

  const branch_page = props.login?.login?.branch
    ? { update_status: 1 }
    : props?.login?.login?.user?.rights.find(
        (o) => o.page.name === "branch_page"
      );

  const fetchData = (page) => {
    const token = props.login?.login?.token;

    // console.log("page", page);
    let pageno = page + 1;
    // console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: pageSize,
      token: token,
    };
    props.getBranchesPage(data);
  };

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const fetchDataCall = React.useCallback(() => fetchData(page), [page]);

  const handleChangePage = (newPage) => {
    console.log("new page:", newPage);
    setPage(newPage);
    // fetchDataCall();
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("event", event);
    // setPage(1);
    setPageSize(event);
  };

  console.log("props.branches", props.branches);
  const columns = [
    { field: "branch_code", headerName: "Branch Code", flex: 1 },
    {
      field: "branch_name",
      headerName: "Branch Name",
      flex: 1,
    },
    { field: "bank_code", headerName: "Bank Code", flex: 1 },

    {
      field: "vertical",
      headerName: "Vertical",
      flex: 1,
      valueFormatter: (cell) => {
        return "Vertical(manual)";
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <ViewBranch
              data={{
                ...params.row,
                pageno: page + 1,
                pageSize: pageSize,
              }}
            />
            {branch_page.update_status == "1" ? (
              <EditBranch
                data={{
                  ...params.row,
                  pageno: page + 1,
                  pageSize: pageSize,
                }}
              />
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  const rows = props.branches?.isLoading
    ? []
    : props.branches.branches?.data?.filter((b) =>
        props.approved
          ? b.is_approved_by_admin == 1
          : b.is_approved_by_admin == 0
      );

  console.log("pageSize", rows);
  console.log("page", page);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={props?.branches?.branches?.total}
      loading={props.branches?.isLoading ? true : false}
      // onPageSizeChange={(newPageSize) => {
      //   setPageSize(newPageSize);
      // }}
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
      pageSizeOptions={[10, 20, 50]}
      pagination
      components={{
        Toolbar: CustomToolbar,
      }}
      checkboxSelection
      disableSelectionOnClick
      autoHeight
      page={page}
      paginationMode="server"
      onPageChange={handleChangePage}
      onPageSizeChange={handleChangeRowsPerPage}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    branches: state.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable2);
