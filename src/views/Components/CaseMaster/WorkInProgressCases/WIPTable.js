import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { visuallyHidden } from "@mui/utils";

//* Actions
import { getPropertiesPage } from "../../../../Redux/Creators/PropertiesCreators";
import { getUsersPage } from "../../../../Redux/Creators/UsersCreators";

import LongMenu from "./LongMenu";
import WIPActionMenu from "./WIPActionMenu";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "application_no",
    numeric: true,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "name_of_project",
    numeric: false,
    disablePadding: false,
    label: "Project/Property Name",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },

  {
    id: "branch_name",
    numeric: true,
    disablePadding: false,
    label: "Branch Name",
  },
  {
    id: "priority ",
    numeric: false,
    disablePadding: false,
    label: "Priority ",
  },
  {
    id: "assigned_to",
    numeric: false,
    disablePadding: false,
    label: "Assigned to",
  },

  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, pageno, pageSize, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex">
          {/* delete */}
          {/* <DeleteWip data={{ selected }} /> */}
        </div>
      ) : (
        <div className="d-flex"></div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function WIPTable(props) {
  //*
  const work_in_progress_case_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "work_in_progress_case_page"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("application_no");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = React.useState(true);

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

  const columns2 = [
    {
      field: "application_no",
      width: 150,

      headerName: "Application no.",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
    },
    {
      field: "name_of_project",
      width: 150,
      headerName: "Project/Property Name",
      renderCell: (row) => {
        return row.row?.project?.project_name;
      },
    },
    {
      field: "type",
      headerName: "Type",
    },

    {
      field: "branch_name",
      width: 150,
      headerName: "Branch Name",
      renderCell: (row) => {
        return row.row?.branch?.branch_name;
      },
    },
    {
      field: "priority",
      headerName: "Priority ",
    },
    {
      field: "assigned_to",
      headerName: "Assigned to",
      renderCell: (row) => {
        const rows2 = props.users?.users?.data?.isLoading
        ? []
        : props.users?.users?.data?.length > 0
        ? props.users?.users?.data
        : [];
        let userId=row.row?.property_transactions[row.row?.property_transactions?.length - 1]?.assigned_to
        return(
          <div>
            {rows2?.find((row) => row?.id == userId)?.name} 
          </div>
        )
      },
    },

    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   align: "center",
    //   width: 280,
    //   headerAlign: "center",
    //   renderCell: (row) => {
    //     return (
    //       <div className="d-flex">
            
    //         {work_in_progress_case_page.view_status == "1" ? (
    //         <div className="d-flex">


    //         <LongMenu data={row}
    //         index={row.id}
    //         data2={{
    //           pageno: page + 1,
    //           pageSize: rowsPerPage,
    //         }}/>
    //         </div>
    //         ) : (
    //           ""
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      width: 80,
      headerAlign: 'center',
      renderCell: (row) => {
        return (
          <WIPActionMenu
          data={row}
          index={row.id}
                  data2={{
                    pageno: page + 1,
                    pageSize: rowsPerPage,
                  }}
          />
        );
      },
    },
  ];

  const rows2 = props?.properties?.isLoading
    ? []
    : props.properties.properties.data?.length > 0
    ? props.properties.properties.data
    : [];


  const rows = props?.properties?.isLoading
    ? []
    : props.properties.properties.data?.length > 0
    ? props.properties?.properties?.data?.filter((item) => {
        let index = item?.property_transactions?.length - 1;
        return (
          item?.property_transactions[index]?.assigned_to ==
          props?.login?.login?.user?.id
        );
      })
    : [];
  console.log(rows2, "hhhhhh", rows);

  const fetchData = (page, rowsPerPage) => {
    const token = props.login?.login?.token;

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getPropertiesPage(data);
    props.getUsersPage(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.properties?.properties?.data?.map(
        (row) => row
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    //!ye change hai
    fetchData(0, event.target.value);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - props?.properties?.properties?.data?.length
        )
      : 0;
  let row =
    props?.login?.login?.user?.role == "admin"
      ? rows2.filter((pur) => {
          console.log(pur?.application_no, props.searchTerm, "searchTerm");
          return (
            (props.searchTerm
              ? pur?.application_no
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.customer_name
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.branch?.branch_name
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.project?.project_name
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur)
          );
        })
      : rows.filter((pur) => {
          console.log(pur?.application_no, props.searchTerm, "searchTerm");
          return (
            (props.searchTerm
              ? pur?.application_no
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.branch?.branch_name
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur) ||
            (props.searchTerm
              ? pur?.customer_name
                  ?.toLowerCase()
                  .includes(props.searchTerm.trim().toLowerCase())
              : pur)
          );
        });

  const rowsCopy = [...row];
  const reversedRows = rowsCopy.reverse();
  const sortedData = reversedRows.sort((a, b) => {
    const priorities = { high: 1, medium: 2, low: 3 };
    return priorities[a.priority] - priorities[b.priority];
  });
  console.log("data223", row, props.searchTerm, props);

  const isCreatedAfter9AM = (created_at) => {
    const currentDate = new Date();
    const createdDate = new Date(created_at);
    const nineAM = new Date();
    nineAM.setHours(9, 0, 0, 0); // Set to 9:00:00 AM

    // console.log(createdDate ,">", nineAM ,"&&", createdDate.getDate() ,"===", currentDate.getDate(), "&&", createdDate.getMonth() ,"===", currentDate.getMonth(), "&&", createdDate.getFullYear(), "===", currentDate.getFullYear(), "created_at",created_at,"created_at",currentDate,"created_at",createdDate,"created_at",nineAM,"created_at",createdDate.getDate(),"created_at",currentDate.getDate(),currentDate.getFullYear())

    return (
      createdDate > nineAM &&
      createdDate.getDate() === currentDate.getDate() &&
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
      />
      <div style={{ textAlign: "end" }}>
        <button
          style={{
            color: "white",
            background: "#0288d1",
            border: "none",
            "margin-bottom": "4px",
            "border-radius": "5px",
          }}
          onClick={() => setData(!data)}
        >
          {data == true ? "Show Date Wise" : "Show Priority Wise"}
        </button>
      </div>
      <div
        style={
          data == false
            ? { height: 650, width: "100%", display: "none" }
            : { height: 650, width: "100%" }
        }
      >
        <DataGrid
          rows={sortedData}
          columns={columns2}
    loading={props?.properties?.isLoading ? true : false}
          getRowClassName={(params) => {
            if (
              isCreatedAfter9AM(
                params.row.property_transactions[
                  params.row.property_transactions.length - 1
                ]?.assigned_date
              )
            ) {
              return "bg-red"; // Add a class for rows created after 9 AM today
            } else if (params.row.priority === "Low") {
              return "bg-green";
            } else {
              return "bg-white";
            }
          }}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows2.filter((row) =>
              selectedIDs.has(row.id)
            );
            console.log(selectedRowData);
            setSelectionModel(selectedRowData);
          }}
        />
      </div>
      <div
        style={
          data == false
            ? { height: 650, width: "100%" }
            : { height: 650, width: "100%", display: "none" }
        }
      >
        <DataGrid
          rows={[...row].reverse()}
          columns={columns2}
    loading={props?.properties?.isLoading ? true : false}
         
          getRowClassName={(params) => {
            if (
              isCreatedAfter9AM(
                params.row.property_transactions[
                  params.row.property_transactions.length - 1
                ]?.assigned_date
              )
            ) {
              return "bg-red"; // Add a class for rows created after 9 AM today
            } else if (params.row.priority === "Low") {
              return "bg-green";
            } else {
              return "bg-white";
            }
          }}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows2.filter((row) =>
              selectedIDs.has(row.id)
            );
            console.log(selectedRowData);
            setSelectionModel(selectedRowData);
          }}
        />
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    properties: state.properties,
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WIPTable);
