import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

// import ViewExternalDataUpload from "./View";
// import EditUnderConstructProjects from "./Edit";
// import Actions from "./Actions";

//* Actions
import { getProjects } from "../../../Redux/Creators/ProjectsCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateTaskManagement from "./CreateTaskManagement";
import TaskManagementDeleteAll from "./TaskManagementDeleteAll";
import EditTaskManagement from "./EditTaskManagement";
import { DataGrid } from '@mui/x-data-grid';


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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "project_name",
    numeric: true,
    disablePadding: false,
    label: "Task Name",
  },

  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Task Detail",
  },

  {
    id: "amenities",
    numeric: false,
    disablePadding: false,
    label: "Assigned By",
  },
  {
    id: "localities",
    numeric: false,
    disablePadding: false,
    label: "Deadline",
  },
  {
    id: "surrounding",
    numeric: false,
    disablePadding: false,
    label: "Status",
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
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells?.map((headCell) => (
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
  const { numSelected, pageno, pageSize, selected, project_page } = props;

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
          {project_page.delete_status == "1" ? (
            <TaskManagementDeleteAll data={{ pageno, pageSize, selected }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {project_page.create_status == "1" ? (
            <CreateTaskManagement data={{ pageno, pageSize }} />
          ) : (
            ""
          )}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function TaskManagementTable(props) {

  const rows2 = props.projects?.isLoading
  ? []
  : props.projects?.projects?.data?.length > 0
  ? props.projects?.projects  ?.data
  : [];
  console.log(rows2,"hhhhhh")

  const columns2 = [
    {
      field: "project_name",
      width:158,
      headerName: "Task Name",
    },
  
    {
      field: "address",
      width:158,
      headerName: "Task Detail",
    },
  
    {
      field: "amenities",
      width:158,
      headerName: "Assigned By",
    },
    {
      field: "localities",
      width:158,
      headerName: "Deadline",
    },
    {
      field: "surrounding",
      width:158,
      headerName: "Status",
    },
    {field: "actions",
      headerName: "Actions",
      disableExport: true,
      width: 120,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      // align: "center",
      disableClickEventBubbling: true,
      renderCell: (data) => {
        return <EditTaskManagement data={data.row} index={data.row.id}/>; 
        // return <MenuActionBtn data={params.row} index={params.row.id} />;
      },
    }
    // { field: 'id', headerName: 'ID', width: 100 },
    // { field: 'pincode', headerName: 'Pincode', width: 400 },
    // { field: 'instructions', headerName: 'Instructions', width: 500 },
  ]

  const project_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "project_page"
  );
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

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
    props.getProjects(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.projects?.projects?.data?.map((row) => row);
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
          (1 + page) * rowsPerPage - props?.projects?.projects?.data?.length
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows2}
        columns={columns2}
        loading={props?.projects?.isLoading ? true : false}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
      <EnhancedTableToolbar
        numSelected={selected.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selected}
        project_page={project_page}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props?.projects?.projects?.data?.length}
          />
          {props?.projects?.isLoading ? (
            <TableBody>
              <TableCell
                colSpan={12}
                style={{ borderBottom: "none", padding: "0px" }}
              >
                <LinerLoader />
              </TableCell>
            </TableBody>
          ) : (
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(
                props?.projects?.projects?.data,
                getComparator(order, orderBy)
              )?.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell align="center" padding="none">
                      {row?.project_name}
                    </TableCell>
                    <TableCell align="center" padding="none">
                      {row?.address}
                    </TableCell>
                    <TableCell align="center" padding="none">
                      {row?.amenities}
                    </TableCell>
                    <TableCell align="center" padding="none">
                      {row?.localities}
                    </TableCell>
                    <TableCell align="center" padding="none">
                      {row?.surrounding}
                    </TableCell>

                    <TableCell align="center" padding="none">
                      <div className="d-flex">
                        {project_page.update_status == "1" ? (
                          <EditTaskManagement data={row} />
                        ) : (
                          ""
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={rowsPerPage} />
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 10, 20]}
        component="div"
        count={props?.projects?.projects?.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (data) => dispatch(getProjects(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskManagementTable);
