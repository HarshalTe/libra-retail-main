/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@material-ui/core";
import { getBranchesPage } from "./../../../../Redux/Creators/BranchesCreators";
import { connect } from "react-redux";
import ViewBranch from "./ViewBranch";
import EditBranch from "./EditBranch";

const dummyColorsDB = [
  { id: 1, color: "red" },
  { id: 2, color: "green" },
  { id: 3, color: "blue" },
  { id: 4, color: "violet" },
  { id: 5, color: "orange" },
  { id: 6, color: "burgundy" },
  { id: 7, color: "pink" },
  { id: 8, color: "yellow" },
  { id: 9, color: "magenta" },
  { id: 10, color: "random color" },
  { id: 11, color: "another random color" },
  { id: 12, color: "last one" },
];

function BranchTable3(props) {
  const [data, setData] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 15],
    pageSize: 2,
    page: 1,
  });

  const updateData = (k, v) => setData((prev) => ({ ...prev, [k]: v }));

  const branch_page = props.login?.login?.branch
    ? { update_status: 1 }
    : props?.login?.login?.user?.rights.find(
        (o) => o.page.name === "branch_page"
      );

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
                pageno: data.page + 1,
                pageSize: data.pageSize,
              }}
            />
            {branch_page.update_status == "1" ? (
              <EditBranch
                data={{
                  ...params.row,
                  pageno: data.page + 1,
                  pageSize: data.pageSize,
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

  useEffect(() => {
    updateData("loading", true);

    setTimeout(() => {
      console.log(data.page, data.pageSize, "");
      console.log(rows, dummyColorsDB.length);

      // updateData("rowCount", dummyColorsDB.length);

      setTimeout(() => {
        updateData("rows", rows);
        updateData("loading", false);
      }, 100);
    }, 500);
  }, [data.page, data.pageSize, props.approved]);

  const fetchData = (page) => {
    const token = props.login?.login?.token;

    // console.log("page", page);
    let pageno = page + 1;
    // console.log("pageno", pageno);
    let data2 = {
      pageno: pageno,
      pageSize: data.pageSize,
      token: token,
    };
    props.getBranchesPage(data2);
  };

  useEffect(() => {
    fetchData(data.page);
  }, []);

  return (
    <Box p={5}>
      <DataGrid
        density="compact"
        autoHeight
        rowHeight={50}
        pagination
        paginationMode="server"
        loading={props.branches?.isLoading ? true : false}
        rowCount={props?.branches?.branches?.total}
        rowsPerPageOptions={data.rowsPerPageOptions}
        page={data.page - 1}
        pageSize={data.pageSize}
        rows={rows}
        columns={columns}
        onPageChange={(data) => {
          updateData("page", data + 1);
          fetchData(data + 1);
        }}
        onPageSizeChange={(data) => {
          updateData("page", 1);
          updateData("pageSize", data);
        }}
      />
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable3);
