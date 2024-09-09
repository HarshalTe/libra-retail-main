import * as React from "react";
import PropTypes from "prop-types";

import { alpha } from "@mui/material/styles";
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
import Badge from "@material-ui/core/Badge";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";

//*Actions
import { connect } from "react-redux";
import { getUsersPage } from "../../../../Redux/Creators/UsersCreators";

//*compoenets
import EditPageRights from "./EditPageRights";
import LinerLoader from "components/Loaders/LinerLoader";

//* yaha se rows aur row ka function gaya
function createData(id, name, email, role, status) {
  return {
    id,
    name,
    email,
    role,
    status,
  };
}

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
    id: "page_name",
    numeric: false,
    disablePadding: true,
    label: "Pages",
  },
  {
    id: "create_status",
    numeric: false,
    disablePadding: false,
    label: "Create",
  },
  {
    id: "view_status",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
  {
    id: "update_status",
    numeric: false,
    disablePadding: false,
    label: "Update",
  },

  {
    id: "delete_status",
    numeric: true,
    disablePadding: false,
    label: "Delete",
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
        {/* <TableCell padding="checkbox">
         
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding="normal"
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
  const { numSelected } = props;

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
        <div className="d-flex"></div>
      ) : (
        <div className="d-flex"></div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function PageRightsTable(props) {
  //*
  const rights_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "rights_page"
  );
  //*
  console.log("props", props);

  // const [currentUser, setCurrentUser] = React.useState("demo");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      pageno: 1,
      pageSize: 1000,
      token: token,
    };
    props.getUsersPage(data);
  };

  const rows = props?.users?.isLoading
    ? []
    : props?.users?.users?.data?.filter((row) => row?.name == props?.currentUser);

  console.log(rows, "rowss");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n);
      setSelected(newSelecteds);
      console.log("selected:", newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    console.log("new page:", newPage);
    setPage(newPage);
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 1));
    // setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
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
            rowCount={rows?.length}
          />
          {props?.users?.isLoading ? (
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
              {/* if you don't need to support IE11, you can replace the
              `stableSort` call with: rows.slice().sort(getComparator(order,
              orderBy)) */}

              {
                // stableSort(rows, getComparator(order, orderBy))
                rows[0]?.rights?.map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.name}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox"></TableCell> */}

                      <TableCell padding="normal" align="center">
                        {row?.page?.name}
                      </TableCell>
                      <TableCell padding="normal" align="center">
                        {row?.create_status == 1 ? (
                          <Badge color="primary" variant="dot"></Badge>
                        ) : (
                          <Badge color="error" variant="dot"></Badge>
                        )}
                      </TableCell>
                      <TableCell padding="normal" align="center">
                        {row?.view_status == 1 ? (
                          <Badge color="primary" variant="dot"></Badge>
                        ) : (
                          <Badge color="error" variant="dot"></Badge>
                        )}
                      </TableCell>
                      <TableCell padding="normal" align="center">
                        {row?.update_status == 1 ? (
                          <Badge color="primary" variant="dot"></Badge>
                        ) : (
                          <Badge color="error" variant="dot"></Badge>
                        )}
                      </TableCell>

                      <TableCell padding="normal" align="center">
                        {row?.delete_status == 1 ? (
                          <Badge color="primary" variant="dot"></Badge>
                        ) : (
                          <Badge color="error" variant="dot"></Badge>
                        )}
                      </TableCell>

                      <TableCell
                        padding="normal"
                        align="center"
                        className="d-flex"
                      >
                        {rights_page.update_status == "1" ? (
                          <EditPageRights data={row} />
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersPage: (data) => dispatch(getUsersPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRightsTable);
