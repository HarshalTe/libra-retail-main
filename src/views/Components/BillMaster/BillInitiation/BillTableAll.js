import * as React from "react";
import { useEffect, useState } from "react";
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
import { Form, Formik } from "formik";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Autocomplete, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Badge from "@material-ui/core/Badge";
import { DataGrid } from '@mui/x-data-grid';    
import TextField from "@mui/material/TextField";
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

import { Row, Col, Card, CardBody, CardHeader,InputGroup } from "reactstrap";

import CustomeInput from "views/Views/CustomeInput";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem} from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
//* Actions
import { getBillsList } from "../../../../Redux/Creators/BIllCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateBill2 from "./CreateBill2";
import OnHoldBill2 from "./OnHoldBill2";
import UnbilledBill2 from "./UnbilledBill2";
import CreateBillInitiation from "./CreateBillInitiation";
import { getCompletedPropertiesPage } from "../../../../Redux/Creators/PropertiesCompletedCreators";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
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
    id: "branch_name",
    numeric: false,
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
    id: "plot_area",
    numeric: false,
    disablePadding: false,
    label: "Plot Area",
  },

  {
    id: "construction_area",
    numeric: false,
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
    id: "kms",
    numeric: false,
    disablePadding: false,
    label: "No. of kms",
  },

  {
    id: "kms_from_bank",
    numeric: false,
    disablePadding: false,
    label: "Kms from bank",
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

  // {
  //   id: "actions",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Actions",
  // },
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
  const { numSelected, pageno, pageSize, selected, bill_initiation_page } =
    props;

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
          {bill_initiation_page.create_status == "1" ? (
            <CreateBill2 data={{ selected }} />
          ) : (
            ""
          )}

          {bill_initiation_page.update_status == "1" ? (
            <OnHoldBill2 data={{ selected }} />
          ) : (
            ""
          )}

          {bill_initiation_page.update_status == "1" ? (
            <UnbilledBill2 data={{ selected }} />
          ) : (
            ""
          )}
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

function BillTableAll(props) {
  //*
  const bill_initiation_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "bill_initiation_page"
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
  const [filter, setFilter] = React.useState(false);
  const [bank, setBank] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [vertical, setVertical] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [billNo, setBillNo] = React.useState("");


  const rows2 = props?.bills?.isLoading
? []
: filter
  ? props.bills.bills.filter((pur) => {
    console.log("objectpur",pur.created_date.slice(-7,-5))
    return(
      (bank
        ? pur?.bank_name
            ?.toLowerCase().includes(bank.trim().toLowerCase())
        : pur) &&
      (vertical
        ? pur.verticals
            ?.toLowerCase().includes(vertical.trim().toLowerCase())
        : pur) &&
      (product
        ? pur.product
            ?.toLowerCase().includes(product.trim().toLowerCase())
        : pur) &&
      (year
        ? pur.created_date.slice(-4)
            ?.toLowerCase().includes(year.trim().toLowerCase())
        : pur) &&
      (month
        ? pur.created_date.slice(-7,-5)
            ?.toLowerCase().includes(month.trim().toLowerCase())
        : pur) &&
      (branch
        ? pur.branch_name
            ?.toLowerCase().includes(branch.trim().toLowerCase())
        : pur)&&
      (billNo
        ? pur.bill_no
            ?.toLowerCase().includes(billNo.trim().toLowerCase())
        : pur)
    )
  })
  : props.bills.bills?.filter((pur,i)=>{
    return(
      pur?.bill_status=="fresh"
      //  && pur?.is_completed == 1
      )
  });
//   const rows2 = props?.bills?.bills?.isLoading
// ? []
// : props.bills.bills.length > 0
//   ? props.bills.bills
//   : [];
console.log(rows2, "hhhhhhggg")

const columns2 = [
  {
    field: "application_no",
    headerName: "Application No.",
    width: 200,
  },
  {
    field: "customer_name",
    headerName: "Customer Name",
  },
  {
    field: "branch_name",
    headerName: "Branch Name",
  },

  {
    field: "created_date",
    headerName: "Created Date",
  },

  {
    field: "postal_address",
    headerName: "Postal Address",
  },

  {
    field: "plot_area",
    headerName: "Plot Area",
  },

  {
    field: "construction_area",
    headerName: "Construction Area",
  },

  {
    field: "property_type",
    headerName: "Property Type",
  },

  {
    field: "verticals",
    headerName: "Verticals",
  },

  {
    field: "product",
    headerName: "Product",
  },

  {
    field: "rate",
    headerName: "Rate",
  },

  {
    field: "kms",
    headerName: "No. of kms From Libra Office",
  },

  {
    field: "kms_from_bank",
    headerName: "Kms from bank",
  },

  {
    field: "cost",
    headerName: "Cost for Additional Distance",
  },

  {
    field: "final_value",
    headerName: "Final Value",
  },

  // {
  //   id: "actions",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Actions",
  // },
];
React.useEffect(() => {
  fetchData(page, rowsPerPage);
}, []);

const fetchData = (page, rowsPerPage) => {
  const token = props.login?.login?.token;

  let pageno = page + 1;
  console.log("pageno", pageno);
  let data = {
    pageno: pageno,
    pageSize: rowsPerPage,
    token: token,
  };
  props.getCompletedPropertiesPage(data);
};

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.bills?.bills
        ?.filter((row) => row.bill_status == "fresh")
        .map((row) => row);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            props?.bills?.bills?.filter((row) => row.bill_status == "fresh")
              ?.length
        )
      : 0;

      const rowsCopy = [...rows2];
  const reversedRows = rowsCopy.reverse();
  console.log("objectprops",rows2,props,reversedRows,filter)

  return (
    <Box sx={{ width: "100%" }}>
        <CreateBillInitiation/>

      <div>
          <Formik
            initialValues={{
              bank: "",
              branch: "",
              month: "",
              year: "",
              vertical: "",
              product: "",
              billNo: "",
            }}
            // onSubmit={handleSubmit}
          >
            {(formProps) => {
              setBank(formProps.values.bank);
              setMonth(formProps.values.month);
              setYear(formProps.values.year);
              setProduct(formProps.values.product);
              setVertical(formProps.values.vertical);
              setBranch(formProps.values.branch);
              setBillNo(formProps.values.bill_no);

              // console.log(`formProps.values`, formProps.values);
              return (
                <Form>
                 
                  {/* {formProps.values.is_advance_search == 1 && ( */}
                    <>
                    <Row>
                      <Col md={12}>
                      <Row className="form-group">
                        <Col md={3}>
                          <TextField
                            name="bank"
                            id="bank"
                            label="Bank"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.bank}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.bank &&
                              Boolean(formProps.errors.bank)
                            }
                            helperText={
                              formProps.touched.bank &&
                              formProps.errors.bank
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <TextField
                            name="branch"
                            id="branch"
                            label="Branch"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.branch}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.branch &&
                              Boolean(formProps.errors.branch)
                            }
                            helperText={
                              formProps.touched.branch &&
                              formProps.errors.branch
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <TextField
                            name="year"
                            id="year"
                            label="Year"
                            select
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.year}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.year &&
                              Boolean(formProps.errors.year)
                            }
                            helperText={
                              formProps.touched.year &&
                              formProps.errors.year
                            }
                            >
                            <MenuItem value={""}>Select Month</MenuItem>
                     <MenuItem value={"2020"}>2020</MenuItem>
                     <MenuItem value={"2021"}>2021</MenuItem>
                     <MenuItem value={"2022"}>2022</MenuItem>
                     <MenuItem value={"2023"}>2023</MenuItem>
                     <MenuItem value={"2024"}>2022</MenuItem>
                     </TextField>
                        </Col>
                        
                        <Col md={3}>
                          <TextField
                          select
                            name="month"
                            id="month"
                            label="Month"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.month}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.month &&
                              Boolean(formProps.errors.month)
                            }
                            helperText={
                              formProps.touched.month &&
                              formProps.errors.month
                            }
                          >
                           <MenuItem value={""}>Select Month</MenuItem>
                    <MenuItem value={"01"}>January</MenuItem>
                    <MenuItem value={"02"}>February</MenuItem>
                    <MenuItem value={"03"}>March</MenuItem>
                    <MenuItem value={"04"}>April</MenuItem>
                    <MenuItem value={"05"}>May</MenuItem>
                    <MenuItem value={"06"}>June</MenuItem>
                    <MenuItem value={"07"}>July</MenuItem>
                    <MenuItem value={"08"}>August</MenuItem>
                    <MenuItem value={"09"}>September</MenuItem>
                    <MenuItem value={"10"}>October</MenuItem>
                    <MenuItem value={"11"}>November</MenuItem>
                    <MenuItem value={"12"}>December</MenuItem>
                    </TextField>
                        </Col>


                        <Col md={3}>
                          <TextField
                            name="vertical"
                            id="vertical"
                            label="Vertical"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.vertical}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.vertical &&
                              Boolean(formProps.errors.vertical)
                            }
                            helperText={
                              formProps.touched.vertical &&
                              formProps.errors.vertical
                            }
                          />
                        </Col>

                        <Col md={3}>
                          <TextField
                            name="product"
                            id="product"
                            label="Product"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.product}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.product &&
                              Boolean(formProps.errors.product)
                            }
                            helperText={
                              formProps.touched.product &&
                              formProps.errors.product
                            }
                          />
                        </Col>
                        <Col md={4}>
                          <TextField
                            name="bill_no"
                            id="bill_no"
                            label="Bill No."
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formProps.values.bill_no}
                            onChange={formProps.handleChange}
                            error={
                              formProps.touched.bill_no &&
                              Boolean(formProps.errors.bill_no)
                            }
                            helperText={
                              formProps.touched.bill_no &&
                              formProps.errors.bill_no
                            }
                          />
                        </Col>
                        
                      
                        <Col md={2} className="align-self-end">
                          <Button
                            type="button"
                            disabled={formProps.isSubmitting}
                            className="bg-gradient-orange text-white"
                            onClick={() => setFilter(true)}
                          >
                            Search
                          </Button>
                        </Col>
                      </Row>

                      </Col>
                    </Row>
                    </>
                  {/* )} */}
                </Form>
              );
            }}
          </Formik>
        </div>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        bill_initiation_page={bill_initiation_page}
      />
              Note - to find out cases of reopened bill search by old bill no.

        <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={reversedRows}
          columns={columns2}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = reversedRows.filter((row) =>
            selectedIDs.has(row.id)
          );
          console.log(selectedRowData);
          setSelectionModel(selectedRowData)
        }}
        getRowClassName={(params) => {
          // console.log(params,"WWW", params.row.pending_amount)
          if (params.row.is_completed == "1") {
            return "bg-green";
          } 
          else if (params.row.bill_no != null) {
            return "bg-orange";
          } 
         
          else {
            return "bg-white";
          }
        }}
        />
      </div>
      
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    bills: state.bills,
    completedProperties: state.completedProperties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillsList: (data) => dispatch(getBillsList(data)),
    getCompletedPropertiesPage: (data) =>
    dispatch(getCompletedPropertiesPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BillTableAll);
