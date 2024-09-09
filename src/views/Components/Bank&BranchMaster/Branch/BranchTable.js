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
import { getBranchesPage } from "../../../../Redux/Creators/BranchesCreators";

//*Compoenets
import AddBranch from "./AddBranch";
import ViewBranch from "./ViewBranch";
import EditBranch from "./EditBranch";
import LinerLoader from "components/Loaders/LinerLoader";
import DeleteBranches from "./DeleteBranches";
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
    id: "branch_name",
    numeric: false,
    disablePadding: false,
    label: "Branch Name",
  },

  {
    id: "bank_code",
    numeric: false,
    disablePadding: false,
    label: "Bank Code",
  },

  {
    id: "vertical",
    numeric: false,
    disablePadding: false,
    label: "Vertical",
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
            // padding={headCell.disablePadding ? "none" : "normal"}
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
  const { numSelected, selected, pageno, pageSize, branch_page } = props;
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
          {branch_page.delete_status == "1" ? (
            <DeleteBranches data={{ selected, pageno, pageSize }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {/* {branch_page.create_status == "1" ? (
            <Tooltip title="Add Bank">
              <AddBranch
                data={{ pageno: props.pageno, pageSize: props.pageSize }}
              />
            </Tooltip>
          ) : (
            ""
          )} */}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function BranchTable(props) {
const [selectionModel, setSelectionModel] = React.useState([]); 
const [pageSize, setPageSize] = React.useState(10000);

  //*
  const branch_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "branch_page"
  );
  //*
  console.log("props", props.branches.branches.data);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("bank_code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000);

  const columns2 = [
    { field: "branch_code", headerName: "Branch Code", flex: 1 },
    {
      field: "branch_name",
      headerName: "Branch Name",
      flex: 1,
    },
    { field: "bank_code", headerName: "Bank Code", flex: 1 },

    {
      field: "vertical",
      headerName: "Vertical",
      flex: 1,
      valueFormatter: (cell) => {
        return "Vertical(manual)";
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <ViewBranch
              data={{
                ...params.row,
                pageno: page + 1,
                pageSize: pageSize,
              }}
            />
            {branch_page.update_status == "1" ? (
              <EditBranch
                data={{
                  ...params.row,
                  pageno: page + 1,
                  pageSize: pageSize,
                }}
              />
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];



  const rows2 = props.branches?.isLoading
    ? []
    : props.branches.branches?.data?.filter((b) =>
        props.approved
          ? b.is_approved_by_admin == 1
          : b.is_approved_by_admin == 0
      ).filter((pur)=>{
        // console.log(pur?.application_no,props.searchTerm,"searchTerm")
        return(
          (props.searchTerm
            ? pur?.branch_code
           ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
          (props.searchTerm
            ? pur?.branch_name
           ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
          (props.searchTerm
            ? pur?.bank_code
           ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
          (props.searchTerm
            ? pur?.city
           ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
          (props.searchTerm
            ? pur?.state
           ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
          (props.searchTerm
            ? pur?.pincode
           ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur)
        )
      });
console.log(rows2, "hhhhhh")


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
    props.getBranchesPage(data);
  };

  const rows = [("123", "ICICI borivali", 100, "Vertical")];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.branches?.branches?.data?.map((n) => n);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props?.branches?.branches?.total)
      : 0;

  return (
   
<Box sx={{ width: "100%" }}>
          {/* <AllocateCase data={selectionModel} /> */}

      <EnhancedTableToolbar
      // selectionModel={selectionModel}
        numSelected={selectionModel.length || selectionModel.length }
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        branch_page={branch_page}

      />
       <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows2}
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
    branches: state.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchTable);
