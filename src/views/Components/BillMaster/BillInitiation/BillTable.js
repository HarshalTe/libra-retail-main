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
import {
  Row,
  Col,
  Card,
  // Table,
  Label,
  // Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Divider from "@mui/material/Divider";
// import { Typography } from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";

import LV from "../../../../assets/libra_logo1.png";

// import Button from "@material-ui/core/Button";

import { Button } from "reactstrap";

//*components

//*Actions
import { getBillsList } from "../../../../Redux/Creators/BIllCreators";

function createData(
  application_no,
  customer_name,
  bank_name,
  branch_name,
  created_date,
  postal_address,
  plot_area,
  construction_area,
  property_type,
  verticals,
  product,
  rate,
  km,
  bank_km,
  cost,
  final_value
) {
  return {
    application_no,
    customer_name,
    bank_name,
    branch_name,
    created_date,
    postal_address,
    plot_area,
    construction_area,
    property_type,
    verticals,
    product,
    rate,
    km,
    bank_km,
    cost,
    final_value,
  };
}

const rows = [
  createData(
    "LVPL2021092358934",
    "Udit",
    "HDFC Bank Limited",
    "HDFC-Andheri-LAP",
    "23/09/2021",
    "Borivali",
    1000,
    850,
    "property",
    "LAP",
    "LAP",
    1200,
    0,
    2,
    0,
    1200
  ),
  createData(
    "LVPL2021092358934",
    "Messi",
    "HDFC Bank Limited",
    "HDFC-Andheri-LAP",
    "23/09/2021",
    "Borivali",
    1000,
    850,
    "property",
    "LAP",
    "LAP",
    1200,
    0,
    2,
    0,

    1200
  ),
  createData(
    "LVPL2021092358934",
    "Ronaldo",
    "HDFC Bank Limited",
    "HDFC-Andheri-LAP",
    "23/09/2021",
    "Borivali",
    1000,
    850,
    "property",
    "LAP",
    "LAP",
    1200,
    0,
    2,
    0,

    1200
  ),
  createData(
    "LVPL2021092358934",
    "Atul",
    "HDFC Bank Limited",
    "HDFC-Andheri-LAP",
    "23/09/2021",
    "Borivali",
    1000,
    850,
    "property",
    "LAP",
    "LAP",
    1200,
    0,
    2,
    0,

    1200
  ),
];

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
    disablePadding: true,
    label: "Application Number",
  },
  {
    id: "customer_name",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },

  {
    id: "branch_name",
    numeric: false,
    disablePadding: false,
    label: "Branch Name",
  },
  {
    id: "created_date",
    numeric: true,
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
    id: "plot_area",
    numeric: true,
    disablePadding: false,
    label: "Plot Area",
  },
  {
    id: "construction_area",
    numeric: true,
    disablePadding: false,
    label: "Construction Area",
  },
  {
    id: "property_type",
    numeric: false,
    disablePadding: false,
    label: "Property Type",
  },
  {
    id: "verticals",
    numeric: false,
    disablePadding: false,
    label: "Verticals",
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
    id: "km",
    numeric: false,
    disablePadding: false,
    label: "No. of KM",
  },
  {
    id: "bank_km",
    numeric: true,
    disablePadding: false,
    label: "KMs from Bank",
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
            // align={headCell.numeric ? "right" : "left"}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
        >
          {/* Nutrition */}
        </Typography>
      )}

      {numSelected > 0 ? (
        // <Tooltip title="Delete">
        //   <IconButton>
        //     <DeleteIcon />
        //   </IconButton>
        // </Tooltip>

        <div>
          {/* <CreateBill /> */}
          <div className="d-flex">
            <Button
              size="sm"
              color="success"
              onClick={() => props.setModal(true)}
            >
              Create
            </Button>

            <Button size="sm" color="warning">
              Case on hold
            </Button>

            <Button size="sm" color="info">
              Move to unbilled
            </Button>
          </div>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function BillTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modal, setModal] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Bill</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Table bordered>
            <thead>
              <tr>
                <th
                  colSpan={18}
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  {/* <strong>Libra Valuers</strong> */}
                  <img src={LV} height="70px" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    marginBottom: "0px",
                  }}
                >
                  <h6>SR No.</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  <h6>Verticals</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  <h6>Products</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  <h6>No. Of Cases</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  <h6>Rate Per Case</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "900",
                    padding: "0px",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                    marginBottom: "0px",
                  }}
                >
                  {" "}
                  <h6>Amount Payable</h6>
                </td>
              </tr>

              <tr>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  <h6>1</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  {" "}
                  <h6>HL</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  {" "}
                  <h6>HL</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  {" "}
                  <h6>2</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  {" "}
                  <h6>1500</h6>
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  {" "}
                  <h6>300</h6>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                ></td>
                <td
                  colSpan={6}
                  style={{
                    padding: "5px",
                    textAlign: "right",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  Total
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  3000
                </td>
              </tr>
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                ></td>
                <td
                  colSpan={6}
                  style={{
                    padding: "5px",
                    textAlign: "right",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  SGST
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  9%
                </td>
              </tr>
              <tr>
                {" "}
                <td
                  colSpan={9}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                ></td>
                <td
                  colSpan={6}
                  style={{
                    padding: "5px",
                    textAlign: "right",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  CGST
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  9%
                </td>
              </tr>
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                ></td>
                <td
                  colSpan={6}
                  style={{
                    padding: "5px",
                    textAlign: "right",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  Grand Total
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  3540
                </td>
              </tr>

              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                ></td>
                <td
                  colSpan={6}
                  style={{
                    padding: "5px",
                    textAlign: "right",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  TDS Amount
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  354
                </td>
              </tr>
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                ></td>
                <td
                  colSpan={6}
                  style={{
                    padding: "5px",
                    textAlign: "right",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  Net Amount Receivable
                </td>
                <td
                  colSpan={3}
                  style={{
                    padding: "5px",
                    textAlign: "center",
                    border: "2px",
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  3186
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <Divider />
        <ModalFooter className="pt-2 pb-2 pr-2">
          <Button
            size="sm"
            className="float-right"
            // block
            color="success"
            onClick={() => setModal(!modal)}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
      <EnhancedTableToolbar numSelected={selected.length} setModal={setModal} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          className="table-responsive-sm"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell> */}

                    <TableCell align="center">{row.application_no}</TableCell>
                    <TableCell align="center">{row.customer_name}</TableCell>
                    {/* <TableCell align="center">{row.bank_name}</TableCell> */}
                    <TableCell align="center">{row.branch_name}</TableCell>
                    <TableCell align="center">{row.created_date}</TableCell>
                    <TableCell align="center">{row.postal_address}</TableCell>
                    <TableCell align="center">{row.plot_area}</TableCell>
                    <TableCell align="center">
                      {row.construction_area}
                    </TableCell>
                    <TableCell align="center">{row.property_type}</TableCell>
                    <TableCell align="center">{row.verticals}</TableCell>
                    <TableCell align="center">{row.product}</TableCell>
                    <TableCell align="center">{row.rate}</TableCell>
                    <TableCell align="center">{row.km}</TableCell>
                    <TableCell align="center">{row.bank_km}</TableCell>
                    <TableCell align="center">{row.cost}</TableCell>
                    <TableCell align="center">{row.final_value}</TableCell>
                  </TableRow>
                );
              })}
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
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Paper> */}
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
