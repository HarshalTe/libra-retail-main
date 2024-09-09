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

//* Actions
import { getBillsList } from "../../../../Redux/Creators/BIllCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";

import CreateBill2 from "./CreateBill2";
import UnbilledBill2 from "./UnbilledBill2";
import MoveToInitiate from "./MoveToInitiate";
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function createData(
  project_name,
  address,
  tower_name,
  location,
  carpet_area,
  rent,
  market_value,
  floor,
  flat_no,
  property_type
) {
  return {
    project_name,
    address,
    tower_name,
    location,
    carpet_area,
    rent,
    market_value,
    floor,
    flat_no,
    property_type,
  };
}

const rows = [
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
  ),
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
  ),
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
  ),
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
  ),
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
  ),
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
  ),
  createData(
    "Lodha The Park",
    "Borivali",
    "Lodha Heights",
    "Mumbai",
    925,
    40000,
    30000000,
    "6th",
    602,
    "commercial"
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
        >
          {/* Un-Billed */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex">
          {bill_initiation_page.create_status == "1" ? (
            <CreateBill2 data={{ selected }} />
          ) : (
            ""
          )}

          {bill_initiation_page.update_status == "1" ? (
            <UnbilledBill2 data={{ selected }} />
            ) : (
              ""
              )}
              <MoveToInitiate data={{ selected }} />
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

function OnHoldBillsTable(props) {
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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);

  const rows2 = props?.bills?.bills?.isLoading
? []
: props.bills.bills.length > 0
  ? props.bills.bills?.filter((item) => {
    // console.log("object123",item?.property_transactions.length,item)
    return (
      (item?.bill_status == "case_on_hold"
  ))
})
  : [];
console.log(rows2, "hhhhhhggg")

const columns2 = [
  {
    field: "application_no",
    headerName: "Application No.",
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
    field: "holding_since",
    headerName: "Holding since",
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
    headerName: "No. of kms",
  },

  {
    field: "kms_from_bank",
    headerName: "Kms from bank",
  },

  {
    field: "cost",
    headerName: "Cost",
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
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getBillsList(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.bills?.bills?.map((row) => row);
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

  //   const handleChangePage = (event, newPage) => {
  //     fetchData();
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(event.target.value);
  //     setPage(0);
  //     //!ye change hai
  //     fetchData(0, event.target.value);
  //   };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props?.bills?.bills?.length)
      : 0;
      const rowsCopy = [...rows2];
  const reversedRows = rowsCopy.reverse();

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        bill_initiation_page={bill_initiation_page}
      />
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
          console.log(params,"WWW", params.row.priority)
          if (params.row.customer_name === "Spiderman") {
            return "bg-red";
          } else if (
            params.row.customer_name === "Bablu"
          ) {
            return "bg-green";
            console.log("lowhai")
          }
          // else if (params.row.no_purchase_orders < params?.row?.psi_count) {
          //   return "bg-yellow-2";
          // }
          else {
            return "bg-white";
          }
        }}
        />
      </div>
     
      {/* <TablePagination
        rowsPerPageOptions={[1, 10, 20]}
        component="div"
        //*change
        count={props?.bills?.last_page}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    bills: state.bills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillsList: (data) => dispatch(getBillsList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OnHoldBillsTable);
