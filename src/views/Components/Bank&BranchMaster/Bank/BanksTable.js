import * as React from "react";
import { connect } from "react-redux";
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

//*Actions
import { getBanksPage } from "../../../../Redux/Creators/BanksCreators";

//*Compoenets
import AddBank from "./AddBank";
import ViewBank from "./ViewBank";
import EditBank from "./EditBank";
import LinerLoader from "components/Loaders/LinerLoader";
import LoaderLiner from "components/Loaders/LoaderLiner";
import DeleteBanks from "./DeleteBanks";

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
  console.log("array", array);
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
    id: "bank_code",
    numeric: false,
    disablePadding: true,
    label: "Bank Code",
  },
  {
    id: "bank_name",
    numeric: false,
    disablePadding: false,
    label: "Bank Name",
  },
  {
    id: "no_of_branches",
    numeric: true,
    disablePadding: false,
    label: "No. Of Branches",
  },
  {
    id: "short_code",
    numeric: false,
    disablePadding: false,
    label: "Short Code",
  },
  {
    id: "agreement_end_date",
    numeric: false,
    disablePadding: false,
    label: "Agreement Renewal Date",
  },
  {
    id: "format",
    numeric: false,
    disablePadding: false,
    label: "Report Format",
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
  const { numSelected, pageno, pageSize, selected, setSelected, bank_page } =
    props;
  console.log("propssssss", props);

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
        >
          {/* User Creation */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex">
          {bank_page.delete_status == "1" ? (
            <DeleteBanks data={{ selected, pageno, pageSize, setSelected }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {bank_page.create_status == "1" ? (
            <Tooltip title="Add Bank">
              <AddBank
                data={{ pageno: props.pageno, pageSize: props.pageSize }}
              />
            </Tooltip>
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

function BankTable(props) {
  //*
  const bank_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "bank_page"
  );

  //*
  console.log("props", props.banks.banks.data);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("bank_code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (page) => {
    const token = props.login?.login?.token;

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getBanksPage(data);
  };

  const rows = [("ICICI123", "ICICI", 10, 123, "ICICI FORMAT")];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.banks?.banks?.data?.map((n) => n);

      setSelected(newSelecteds);
      console.log("selected:", newSelecteds);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected?.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props?.banks?.banks?.total)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selected?.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selected}
        setSelected={setSelected}
        bank_page={bank_page}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected?.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows?.length}
          />
          {props?.banks?.isLoading ? (
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
              {props?.banks?.banks !== null ||
              props?.banks?.banks !== undefined ? (
                stableSort(
                  props?.banks?.banks?.data,
                  // rows,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) => handleClick(event, row)}
                          />
                        </TableCell>

                        <TableCell padding="normal" align="center">
                          {row?.bank_code}
                        </TableCell>
                        <TableCell padding="normal" align="center">
                          {row?.bank_name}
                        </TableCell>
                        <TableCell padding="normal" align="center">
                          {row?.branches?.length}
                        </TableCell>
                        <TableCell padding="normal" align="center">
                          {row?.short_code}
                        </TableCell>
                        <TableCell padding="normal" align="center">
                          {row?.aggreements[0]?.end_date}
                        </TableCell>
                        <TableCell padding="normal" align="center">
                          {row?.format}
                        </TableCell>

                        <TableCell padding="normal" align="center">
                          <div className="d-flex">
                            <ViewBank
                              data={{
                                ...row,
                                pageno: page + 1,
                                pageSize: rowsPerPage,
                              }}
                            />

                            {bank_page.update_status == "1" ? (
                              <EditBank
                                data={{
                                  ...row,
                                  pageno: page + 1,
                                  pageSize: rowsPerPage,
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={14}>No Data</TableCell>
                </TableRow>
              )}

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
      <TablePagination
        rowsPerPageOptions={[2, 10, 25]}
        component="div"
        count={props?.banks?.banks?.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(BankTable);
