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

//* Actions
import { getCompaniesPage } from "../../../Redux/Creators/CompanyMasterCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CompanyMasterCreate from "./CompanyMasterCreate";
import CompanyMasterEdit from "./CompanyMasterEdit";
import CompanyMasterDelete from "./ComapnyMasterDelete";
import { DataGrid } from '@mui/x-data-grid';
import DeleteButton from 'Helpers/DeleteButton';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
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
    id: "company_detail",
    numeric: false,
    disablePadding: false,
    label: "Company Name",
  },
  // {
  //   id: "account",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Account",
  // },
  // {
  //   id: "ifsc_code",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "IFSC Code",
  // },
  {
    id: "gstin",
    numeric: true,
    disablePadding: false,
    label: "GSTIN",
  },
  {
    id: "pan",
    numeric: false,
    disablePadding: false,
    label: "Pan",
  },
  {
    id: "state_code",
    numeric: true,
    disablePadding: false,
    label: "State Code",
  },
  {
    id: "state",
    numeric: true,
    disablePadding: false,
    label: "State",
  },
  {
    id: "sac",
    numeric: true,
    disablePadding: false,
    label: "SAC",
  },
  {
    id: "composition_scheme",
    numeric: true,
    disablePadding: false,
    label: "Composition Scheme",
  },
  {
    id: "msme_no",
    numeric: true,
    disablePadding: false,
    label: "MSME No.",
  },
  {
    id: "encl",
    numeric: true,
    disablePadding: false,
    label: "ENCL",
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
  const { numSelected, pageno, pageSize, selected, company_master } = props;

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
          {company_master.delete_status == "1" ? (
            <CompanyMasterDelete data={selected} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {company_master.create_status == "1" ? <CompanyMasterCreate /> : ""}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function CompanyMasterTable(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);



  const rows2 = props.companies?.isLoading
  ? []
  : props.companies?.companies?.data?.length > 0
  ? props.companies?.companies?.data?.filter((pur)=>{
    console.log("hhhhhh",props.searchTerm, pur?.company_detail)
    return(
      (props.searchTerm
        ? pur?.company_detail
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.gstin
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.pan
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.state_code
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.state
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.msme_no
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.encl
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.owner_name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.sac
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur)
    )
  })
  : [];
  console.log("hhhhhh",props.searchTerm,rows2)
  
  const columns2 = [
    {
      field: "company_detail",
      headerName: "Company Name",
    },
    {
      field: "gstin",
      headerName: "GSTIN",
    },
    {
      field: "pan",
      headerName: "Pan",
    },
    {
      field: "state_code",
      headerName: "State Code",
    },
    {
      field: "state",
      headerName: "State",
    },
    {
      field: "sac",
      headerName: "SAC",
    },
    {
      field: "composition_scheme",
      headerName: "Composition Scheme",
    },
    {
      field: "msme_no",
      headerName: "MSME No.",
    },
    {
      field: "encl",
      headerName: "ENCL",
    },
    {
      field: "owner_name",
      headerName: "Owner Name / Partner Name",
    },
    {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 70,
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return <CompanyMasterEdit 
      data={params.row} index={params.row.id} data2={{
        pageno: page + 1,
        pageSize: rowsPerPage}}
        />; 
    },
  },
    
  ]
  //*
  const company_master = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "company_master"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("state_code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  // React.useEffect(() => {
  //   fetchData(page, rowsPerPage);
  // }, []);

  // const fetchData = (page, rowsPerPage) => {
  //   console.log("petaaa");
  //   const token = props.login?.login?.token;

  //   console.log("page", page);
  //   let pageno = page + 1;
  //   console.log("pageno", pageno);
  //   let data = {
  //     pageno: pageno,
  //     pageSize: rowsPerPage,
  //     token: token,
  //   };
  //   props.getCompaniesPage(data);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.companies?.companies?.data?.map((row) => row);
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
    // fetchData(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    //!ye change hai
    // fetchData(0, event.target.value);
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
          (1 + page) * rowsPerPage - props?.companies?.companies?.data?.length
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          numSelected={selectionModel.length}
          pageno={page + 1}
          pageSize={rowsPerPage}
          selected={selectionModel}
          company_master={company_master}
        />
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows2}
        columns={columns2}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
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
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompaniesPage: (data) => dispatch(getCompaniesPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyMasterTable);
