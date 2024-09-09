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
import { DataGrid } from '@mui/x-data-grid';    
import { DateFormat } from "../../../../../components/DateFormat/DateFormat"



//* Actions
import { getFinalBillsPage } from "../../../../../Redux/Creators/FinalBillsCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import ViewBillLevel3 from "./ViewProcessedBill";
// import ProcessBill from "./ProcessBill";
import { Row, Col, Card, CardBody, CardHeader,InputGroup } from "reactstrap";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@material-ui/core";
import { Form, Formik } from "formik";

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
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "bill_no",
    numeric: true,
    disablePadding: false,
    label: "Bill No.",
  },
  {
    id: "bank_name",
    numeric: false,
    disablePadding: false,
    label: "Bank Name",
  },
  {
    id: "branch_name",
    numeric: false,
    disablePadding: false,
    label: "Branch Name",
  },

  {
    id: "grand_total",
    numeric: false,
    disablePadding: false,
    label: "Grand Total",
  },

  // {
  //   id: "actions",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Actions",
  // },

  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View/Save",
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
          {/* <ProcessBill data={{ selected }} /> */}
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

function ProcessedBillTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("application_no");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(100000)
  const [filter, setFilter] = React.useState(false);
  const [bank, setBank] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [vertical, setVertical] = React.useState("");
  const [product, setProduct] = React.useState("");
  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);
  const columns2 = [
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
    align: "center",
    width: 150,
      renderCell: (row) => {
        return DateFormat({ data: row.row?.created_at})
      }
    },
    {
      field: "bill_no",
      headerName: "Bill No.",
    width: 200,
      
    },
    {
      field: "bank_name",
      headerName: "Bank Name",
      renderCell: (row) => {
        return row.row?.bank?.bank_name
      }
    },
    {
      field: "branch_name",
    width: 200,
      headerName: "Branch Name",
      renderCell: (row) => {
        return row.row?.raw_bills[0]?.branch?.branch_name
      }
    },
  
    {
      field: "grand_total",
      headerName: "Grand Total",
    },
  
    // {
    //   id: "actions",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Actions",
    // },
  
    {field: "actions",
    headerName: "View/Save",
    disableExport: true,
    width: 200,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (row) => {
      return  <ViewBillLevel3 data={row.row} />
      // return <MenuActionBtn data={params.row} index={params.row.id} />;
    },
  },
  
    // {
    //   id: "actions",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Actions",
    // },
  ];
  // const rows2 = props?.finalBills?.finalBills?.data?.isLoading
  // ? []
  // : props.finalBills.finalBills.data?.length > 0
  //   ? props.finalBills.finalBills.data
  //   : [];
  const rows2 = props?.finalBills?.finalBills?.data?.isLoading
  ? []
  : props.finalBills.finalBills.data?.length > 0
    ? filter 
    ?  props?.finalBills?.finalBills?.data?.filter((pur) => {
        console.log("objectpur",pur)
        return(
          (bank
            ? pur?.bank?.bank_name
                ?.toLowerCase().includes(bank.trim().toLowerCase())
            : pur) &&
          (vertical
            ? pur?.raw_bills[0]?.verticals
                ?.toLowerCase().includes(vertical.trim().toLowerCase())
            : pur) &&
          (product
            ? pur.raw_bills[0]?.product
                ?.toLowerCase().includes(product.trim().toLowerCase())
            : pur) &&
          (year
            ? pur.created_date?.slice(-4)
                ?.toLowerCase().includes(year?.trim().toLowerCase())
            : pur) &&
          (month
            ? pur.created_date?.slice(-7,-5)
                ?.toLowerCase().includes(month?.trim().toLowerCase())
            : pur) &&
          (branch
            ? pur?.raw_bills[0]?.branch?.branch_name
                ?.toLowerCase().includes(branch.trim().toLowerCase())
            : pur)
        )
      })
      :props.finalBills.finalBills.data?.filter((pur,i)=>{
        return(
          pur?.is_processed == 1
          )
      })
    : [];
  console.log(rows2, "hhhhhh")
  const fetchData = () => {
    const token = props.login?.login?.token;

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);

    let data = {
      token: token,
      pageno: pageno,
      pageSize: rowsPerPage,
    };
    props.getFinalBillsPage(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.finalBills?.finalBills?.data
        ?.filter((row) => row.is_approved == 1 && row.is_processed == 1)
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

  const handleChangePage = (event, newPage) => {
    console.log("new page:", newPage);
    setPage(newPage);
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 1));
    // setPage(0);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            props?.finalBills?.finalBills?.data?.filter(
              (row) => row.is_approved == 1 && row.is_processed == 1
            ).length
        )
      : 0;

      const rowsCopy = [...rows2];
      const reversedRows = rowsCopy.reverse();

  return (
    <Box sx={{ width: "100%" }}>
      <div>
          <Formik
            initialValues={{
              bank: "",
              branch: "",
              month: "",
              year: "",
              vertical: "",
              product: "",
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

              // console.log(`formProps.values`, formProps.values);
              return (
                <Form>
                 
                  {/* {formProps.values.is_advance_search == 1 && ( */}
                    <>
                    <Row>
                      <Col md={10}>
                      <Row className="form-group">
                        <Col md={2}>
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
                        <Col md={2}>
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
                        <Col md={2}>
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
                        
                        <Col md={2}>
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


                        <Col md={2}>
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

                        <Col md={2}>
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
                        
                      </Row>
                        </Col>
                          <Col md={2}>
                      <Row>
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
      />
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rowsCopy}
          columns={columns2}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rowsCopy.filter((row) =>
            selectedIDs.has(row.id)
          );
          console.log(selectedRowData);
          setSelectionModel(selectedRowData)
        }}
        />
          <TableContainer style={{"display":"none"}} component={Paper}>
      <Table id="table-ProcessedBillTable" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Bill No.</TableCell>
            <TableCell align="right">Bank Name</TableCell>
            <TableCell align="right">Branch Name</TableCell>
            <TableCell align="right">Grand Total</TableCell>
            <TableCell align="right">View/Save</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              11-11-22
              </TableCell>
              <TableCell component="th" scope="row">
                {row.bill_no}
              </TableCell>
              <TableCell align="right">{row.bank?.bank_name}</TableCell>
              <TableCell align="right">{row.raw_bills[0]?.branch?.branch_name}</TableCell>
              <TableCell align="right">{row.grand_total}</TableCell>
              <TableCell align="right"><div className="d-flex">
                {/* <ViewFinalBill data={row.row} />
                <PaidBill data={row.row} />
                <DigitalSign data={row.row} />
                <EditBill data={row.row} /> */}
                </div></TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>

    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    finalBills: state.finalBills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFinalBillsPage: (data) => dispatch(getFinalBillsPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProcessedBillTable);
