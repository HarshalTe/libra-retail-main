/* eslint-disable eqeqeq */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { getBanksPage } from "Redux/Creators/BanksCreators";
import { connect } from "react-redux";
import ViewBank from "./ViewBank";
import EditBank from "./EditBank";

const PAGE_SIZE = 2;

const SERVER_OPTIONS = {
  useCursorPagination: true,
};

const { initialState, useQuery } = createFakeServer({}, SERVER_OPTIONS);

function CursorPaginationGrid(props) {
  const mapPageToNextCursor = React.useRef({});
  const bank_page = props.login?.login?.branch
    ? { update_status: 1 }
    : props?.login?.login?.user?.rights.find(
        (o) => o.page.name === "bank_page"
      );

  const [page, setPage] = React.useState(0);

  const queryOptions = React.useMemo(
    () => ({
      cursor: mapPageToNextCursor.current[page - 1],
      pageSize: PAGE_SIZE,
    }),
    [page]
  );

  const { isLoading, data, pageInfo } = useQuery(queryOptions);

  const handlePageChange = (newPage) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
  };

  React.useEffect(() => {
    if (!isLoading && pageInfo?.nextCursor) {
      // We add nextCursor when available
      mapPageToNextCursor.current[page] = pageInfo?.nextCursor;
    }
  }, [page, isLoading, pageInfo?.nextCursor]);

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(
    props?.banks?.banks?.total || 0
  );

  const columns = [
    { field: "bank_code", headerName: "Bank Code", flex: 1 },
    {
      field: "bank_name",
      headerName: "Bank Name",
      flex: 1,
    },
    { field: "no_of_branches", headerName: "No. Of Branches", flex: 1 },
    { field: "short_code", headerName: "Short Code", flex: 1 },
    {
      field: "agreement_end_date",
      headerName: "Agreement Renewal Date",
      flex: 1,
    },
    { field: "format", headerName: "Report Format", flex: 1 },

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
            <ViewBank
              data={{
                ...params.row,
                pageno: page + 1,
                // pageSize: rowsPerPage,
              }}
            />

            {bank_page.update_status == "1" ? (
              <EditBank
                data={{
                  ...params.row,
                  pageno: page + 1,
                  // pageSize: rowsPerPage,
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

  const rows = props.banks?.isLoading
    ? []
    : props.banks.banks?.data?.filter((b) =>
        props.approved
          ? b.is_approved_by_admin == 1
          : b.is_approved_by_admin == 0
      );

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      props?.banks?.banks?.total !== undefined
        ? props?.banks?.banks?.total
        : prevRowCountState
    );
  }, [props?.banks?.banks?.total, setRowCountState]);

  console.log("pageInfo", pageInfo);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        rowCount={rowCountState}
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        loading={isLoading}
      />
    </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CursorPaginationGrid);
