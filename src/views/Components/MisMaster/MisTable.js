import * as React from "react";
import { connect } from "react-redux";
import { Link as DomLink, Link } from "react-router-dom";
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
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";

import { visuallyHidden } from "@mui/utils";

//* Actions
import { getPropertiesPage } from "../../../Redux/Creators/PropertiesCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";

import HistoryMis from "./HistoryMis";

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
    label: "Application No.",
  },
  {
    id: "customer_name",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "bank_name",
    numeric: false,
    disablePadding: false,
    label: "Bank Name",
  },

  {
    id: "branch_name",
    numeric: true,
    disablePadding: false,
    label: "Branch Name",
  },
  {
    id: "created_date",
    numeric: false,
    disablePadding: false,
    label: "Created Date",
  },
  {
    id: "postal_address",
    numeric: false,
    disablePadding: false,
    label: "Postal Address",
  },
  {
    id: "vertical",
    numeric: false,
    disablePadding: false,
    label: "Vertical",
  },
  {
    id: "product",
    numeric: false,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "rate",
    numeric: false,
    disablePadding: false,
    label: "Rate",
  },
  {
    id: "no_of_km",
    numeric: false,
    disablePadding: false,
    label: "No. of KM",
  },
  {
    id: "cost",
    numeric: false,
    disablePadding: false,
    label: "Cost",
  },
  {
    id: "final_value",
    numeric: false,
    disablePadding: false,
    label: "Final Value",
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

function MisTable(props) {
  //*
  const mis_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "mis_page"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("application_no");
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
    props.getPropertiesPage(data);
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

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selected}
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
            rowCount={props?.properties?.properties?.data?.length}
          />
          {props.properties.isLoading ? (
            <TableBody>
              <TableCell
                colSpan={30}
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
                props?.properties?.properties?.data,
                // rows,
                getComparator(order, orderBy)
              )
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                        {row?.application_no}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.customer_name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.bank?.bank_name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.branch?.branch_name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.created_at}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.postal_address}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.bank_vertical?.name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.bank_product?.name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row?.bank_product?.rate}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {/* {row?.bank_product?.rate} */}0 static
                      </TableCell>

                      <TableCell align="center" padding="none">
                        {/* {row?.bank_product?.rate} */}0 static
                      </TableCell>

                      <TableCell align="center" padding="none">
                        {row?.valuation?.type?.final_value}
                      </TableCell>

                      <TableCell align="center" padding="none">
                        <div className="d-flex">
                          <HistoryMis data={row} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 10, 20]}
        component="div"
        count={props?.properties?.properties?.total}
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
    properties: state.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MisTable);
