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

import ViewExternalDataUpload from "./View";
import EditExternalDataUpload from "./Edit";
import Actions from "./Actions";

//* Actions
import { getExternalDataPage } from "../../../Redux/Creators/ExternalDataCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import { DataGrid } from '@mui/x-data-grid';

import AddExternalData from "./Add";
import DeleteExternalData from "./Delete";
import UploadFile from "./BulkUpload";

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
    id: "project_name",
    numeric: false,
    disablePadding: false,
    label: "Project Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "floor",
    numeric: false,
    disablePadding: false,
    label: "Floor",
  },
  {
    id: "flat_no",
    numeric: true,
    disablePadding: false,
    label: "Flat No",
  },
  {
    id: "tower_name",
    numeric: false,
    disablePadding: false,
    label: "Tower Name",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "carpet_area",
    numeric: true,
    disablePadding: false,
    label: "Carpet Area",
  },
  {
    id: "rent",
    numeric: true,
    disablePadding: false,
    label: "Rent",
  },
  {
    id: "market_value",
    numeric: true,
    disablePadding: false,
    label: "Market Value",
  },

  {
    id: "property_type",
    numeric: false,
    disablePadding: false,
    label: "Property Type",
  },
  {
    id: "latitude",
    numeric: false,
    disablePadding: false,
    label: "Latitude",
  },
  {
    id: "longitude",
    numeric: false,
    disablePadding: false,
    label: "Longitude",
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
  const { numSelected, pageno, pageSize, selected, external_page } = props;

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
          {external_page.delete_status == "1" ? (
            <DeleteExternalData data={{ pageno, pageSize, selected }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {external_page.create_status == "1" ? (
            <UploadFile data={{ pageno, pageSize }} />
          ) : (
            ""
          )}

          {external_page.create_status == "1" ? (
            <AddExternalData data={{ pageno, pageSize }} />
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

function ExternalDataTable(props) {
  //*
const [selectionModel, setSelectionModel] = React.useState([]); 

  const external_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "external_page"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);


  const rows2 = props?.externalData?.externalData?.data?.isLoading
? []
: props.externalData.externalData.data?.length > 0
  ? props.externalData.externalData.data
  : [];
console.log(rows2, "hhhhhh")

const columns2 = [
  {
    field: "project_name",
    headerName: "Project Name",
  },
  {
    field: "address",
    headerName: "Address",
  },
  {
    field: "floor",
    headerName: "Floor",
  },
  {
    field: "flat_no",
    headerName: "Flat No",
  },
  {
    field: "tower_name",
    headerName: "Tower Name",
  },
  {
    field: "location",
    headerName: "Location",
  },
  {
    field: "carpet_area",
    headerName: "Carpet Area",
  },
  {
    field: "rent",
    headerName: "Rent",
  },
  {
    field: "market_value",
    headerName: "Market Value",
  },

  {
    field: "property_type",
    headerName: "Property Type",
  },
  {
    field: "latitude",
    headerName: "Latitude",
  },
  {
    field: "longitude",
    headerName: "Longitude",
  },
  {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 70,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return  <EditExternalDataUpload
      data={params.row} index={params.row.id}
      data2={{
        ...params,
        pageno: page + 1,
        pageSize: rowsPerPage,
      }}
    />
      // <CompanyMasterEdit 
      // data={params.row} index={params.row.id} data2={{
      //   pageno: page + 1,
      //   pageSize: rowsPerPage}}
      //   />; 
      // return <MenuActionBtn data={params.row} index={params.row.id} />;
    },
  },
];


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
    props.getExternalDataPage(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.externalData?.externalData?.data?.map(
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
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            props?.externalData?.externalData?.data?.length
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        external_page={external_page}
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
    externalData: state.externalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExternalDataPage: (data) => dispatch(getExternalDataPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExternalDataTable);
