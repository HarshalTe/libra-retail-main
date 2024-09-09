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
import EditBank from "./EditBank";
import ViewBank from "./ViewBank";

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

function BankTable2(props) {
  const [pageSize, setPageSize] = React.useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [page, setPage] = React.useState(0);

  const bank_page = props.login?.login?.branch
    ? { update_status: 1 }
    : props?.login?.login?.user?.rights.find(
        (o) => o?.page?.name === "bank_page"
      );

  const fetchData = (page) => {
    const token = props.login?.login?.token;

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: 1000000,
      token: token,
    };
    props.getBanksPage(data);
  };

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("new page:", newPage);
    setPage(newPage);
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 1));
    // setPage(0);
  };

  console.log("props.banks", props.banks);
  const columns = [
    // { field: "bank_code", headerName: "Bank Code" },
    {
      field: "bank_name",
      headerName: "Bank Name",
      width: "200",
    },
    {
      field: "branches",
      headerName: "No. Of Branches",
      width: "150",
      valueFormatter: (value) => {
        return value?.value?.length;
      },
    },
    { field: "short_code", headerName: "Short Code" },
    {
      field: "agreement_end_date",
      headerName: "Agreement Renewal Date",
    },
    { field: "format", headerName: "Report Format" },
    { field: "address", headerName: "Address" },

    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,

      width: "200",
      sortable: false,
      headerAlign: "center",
      justifyContent: "flex-start",
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <ViewBank
              data={{
                ...params?.row,
                pageno: page + 1,
                pageSize: rowsPerPage,
              }}
            />

            {bank_page?.update_status == "1" ? (
              <EditBank
                data={{
                  ...params?.row,
                  pageno: page + 1,
                  pageSize: rowsPerPage,
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

  const rows = props?.banks?.isLoading || props.banks?.banks.length == 0
    ? []
    : props.banks?.banks?.data
        ?.filter((b) =>
          props?.approved
            ? b?.is_approved_by_admin == 1
            : b?.is_approved_by_admin == 0
        )
        .filter((pur) => {
          // console.log(pur?.application_no,props.searchTerm,"searchTerm")
          return (
            (props.searchTerm
              ? pur?.bank_code
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.bank_name
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.address
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur)
          );
        });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      // rowCount={props?.banks?.banks?.total}
      loading={props.banks?.isLoading ? true : false}
      pageSize={pageSize}
      rowsPerPageOptions={[10, 20, 50]}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      pagination
      components={{
        Toolbar: CustomToolbar,
      }}
      checkboxSelection
      disableSelectionOnClick
      autoHeight
      // page={page}
      // paginationMode="server"
      // onPageChange={handleChangePage}
      // onPageSizeChange={handleChangeRowsPerPage}

      // initialState={initialState}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    banks: state.banks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanksPage: (data) => dispatch(getBanksPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BankTable2);
