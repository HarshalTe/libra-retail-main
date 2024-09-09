import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import MTable from "material-table";
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
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { visuallyHidden } from "@mui/utils";
import { DataGrid } from '@mui/x-data-grid';

//*

import { getdropdownDetailsPage } from "../../../Redux/Creators/DropdownDetailsCreators";

import AddMasterDocuments from "./AddMasterDocuments";
import LinerLoader from "../../../components/Loaders/LinerLoader";
import EditMasterDocuments from "./EditMasterDocuments";
import DeleteMasterDocuments from "./DeleteMasterDocuments";
import FilterMasterDocument from "./FilterMasterDocument";
import AddDropdown from "./AddDropdown";

function createData(description, type) {
  return {
    description,
    type,
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "description",
    label: "Description",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
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
            hidden={headCell.hidden}
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
  const { numSelected, pageno, pageSize, selected, document_master } = props;

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
      {/* {document_master.create_status == "1" ? <AddDropdown /> : ""}  */}
      {document_master.create_status == "1" ? (
            <AddMasterDocuments data={{ pageno, pageSize }} />
          ) : (
            ""
          )}
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
        <div className="d-flex">
          {document_master.delete_status == "1" ? (
            <DeleteMasterDocuments data={{ selected, pageno, pageSize }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
         

          <FilterMasterDocument data={{ pageno, pageSize }} />
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function MasterDocumentsTable(props) {
const [selectionModel, setSelectionModel] = React.useState([]); 

  //*
  const document_master = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "document_master"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("description");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  const rows2 = props?.dropdownDetails?.dropdownDetails?.data?.isLoading
? []
: props.dropdownDetails.dropdownDetails.data?.length > 0
  ? props.dropdownDetails.dropdownDetails.data.filter((pur)=>{
    return(
      (props.searchTerm
        ? pur?.dropdown?.name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) 
    )
  })
  : [];
console.log(rows2, "hhhhhh",rows2.map((row)=>row?.dropdown?.name))
const columns2 = [
  {
    field: "description",
    headerName: "Description",
    width: 300,
    renderCell: (params) => {
      // console.log(params,"mmm")
      return params.row?.dropdown?.name;
    },
  },
  {
    field: "type",
    width: 300,
   
    headerName: "Type",
    renderCell: (params) => {
      // console.log(params,"mmm")
      return params.row?.name;
    },
  },
  {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 300,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
<>
        <EditMasterDocuments 
        data={params.row} index={params.row.id} data2={{
          pageno: page + 1,
          pageSize: rowsPerPage}}
          />
          {/* <DeleteMasterDocuments 
          data={params.row} index={params.row.id} data2={{
            pageno: page + 1,
            pageSize: rowsPerPage}}
            />  */}
          </>
            )
      // return <MenuActionBtn data={params.row} index={params.row.id} />;
    },
  },
];

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (page) => {
    const token = props.login?.login?.token;
    // setPage(page + 1);
    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getdropdownDetailsPage(data);
  };

  // const rows = props?.dropdownDetails?.isLoading
  //   ? []
  //   : props?.dropdownDetails?.dropdownDetails?.data;
  const rows = [createData("property", "test"), createData("dem", "hello")];

  const data = props.dropdownDetails.dropdownDetails.data;
  console.log("DATAAA", data);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.dropdownDetails?.dropdownDetails?.data?.map(
        (n) => n
      );
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
    setPage(newPage);
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
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
            props?.dropdownDetails?.dropdownDetails?.data?.length
        )
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
        document_master={document_master}
        
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
    dropdownDetails: state.dropdownDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getdropdownDetailsPage: (data) => dispatch(getdropdownDetailsPage(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterDocumentsTable);
