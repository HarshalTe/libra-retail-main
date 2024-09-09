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
import { DataGrid } from '@mui/x-data-grid';

//* Actions
import { getPropertiesPage } from "../../../../../Redux/Creators/PropertiesCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import AllocateCase from "../SiteInspectorsTable/AllocateCase";

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
    numeric: true,
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
    id: "legal_address",
    numeric: false,
    disablePadding: false,
    label: "Address",
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
  const { numSelected, pageno, pageSize, selected,selectionModel } = props;

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
          <AllocateCase data={selectionModel} />
          {/* <AllocateCase data={selected} /> */}
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

function CaseAllocationTable2(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  console.log(selectionModel,"dddddd")

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

  function formatDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());
      
      return `${day}-${month}-${year}`;
    } else {
      return "N/A"
    }
  }

  const columns2 = [
    {
      field: "application_no",
        width: 250,
      headerName: "Application No.",
    },
    {
      field: "customer_name",
        width: 250,
      headerName: "Customer Name",
    },
  
    {
      field: "branch",
        width: 250,
      headerName: "Branch Name",
      renderCell: (params) => {
        // console.log(params,"mmm")
        return params.row.branch.branch_name;
      },
    },
    {
      field: "legal_address",
        width: 250,
      headerName: "Address",
      valueFormatter: ({ value }) => `${value}`,
      renderCell: ({ value }) => {
        return(
          // <Tooltip title={value}>
          <span>{value}</span>
        // </Tooltip>
        )
        }
    },
    {
      field: "location",
        width: 180,
      headerName: "Location",
    },
    {
      field: "pincode",
        width: 180,
      headerName: "Pincode",
    },
    {
      field: "created_at",
        width: 180,
      headerName: "Initiation Date",
      renderCell: (params) => {
        // console.log(params,"mmm")
        return formatDate(params.row.created_at) ;
      },
    },
    {
      field: "inspection_date",
        width: 180,
      headerName: "Expected Visited Date",
      renderCell: (params) => {
        // console.log(params,"mmm")
        return formatDate(params.row.inspection_date) ;
      },
    },
  ];
  const rows2 = props?.properties?.properties?.data?.isLoading
    ? []
    : props.properties.properties.data?.length > 0
      ? props.properties.properties.data
      ?.filter((item) => {
        return (
          (item?.property_transactions?.length == 0
      ))
    })
      : [];
  console.log(rows2, "hhhhhh")


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
      const rowsCopy = [...rows2];
      const reversedRows = rowsCopy.reverse();
  return (
    <Box sx={{ width: "100%" }}>
          {/* <AllocateCase data={selectionModel} /> */}

      <EnhancedTableToolbar
      selectionModel={selectionModel}
        numSelected={selected.length || selectionModel.length }
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selected}
      />
       <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={reversedRows.reverse()}
          columns={columns2}
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
          setSelectionModel(selectedRowData)
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseAllocationTable2);
