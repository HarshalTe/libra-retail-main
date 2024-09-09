import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Button, TextField } from "@material-ui/core";
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
import { AppBar } from "@material-ui/core";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Row, Col } from "reactstrap";
import { DataGrid } from '@mui/x-data-grid';    


//* Actions
import { getAvmPage } from "../../../Redux/Creators/AvmCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";

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
    id: "no_stories",
    numeric: true,
    disablePadding: false,
    label: "Number of stories",
  },
  {
    id: "amenities",
    numeric: false,
    disablePadding: false,
    label: "Amenities",
  },
  {
    id: "configuration",
    numeric: false,
    disablePadding: false,
    label: "Configuration",
  },
  {
    id: "no_lifts",
    numeric: false,
    disablePadding: false,
    label: "No. of Lifts",
  },
  {
    id: "no_of_parking",
    numeric: true,
    disablePadding: false,
    label: "No. of Parking",
  },
  {
    id: "building_age",
    numeric: false,
    disablePadding: false,
    label: "Age of the building",
  },
  {
    id: "authorities",
    numeric: false,
    disablePadding: false,
    label: "Authorities",
  },
  {
    id: "carpet_area",
    numeric: true,
    disablePadding: false,
    label: "Area range(Carper area)",
  },
  {
    id: "carpet_rate",
    numeric: true,
    disablePadding: false,
    label: "Carper Rate",
  },
  {
    id: "name_of_project",
    numeric: true,
    disablePadding: false,
    label: "Name of the project",
  },
  {
    id: "report_date",
    numeric: true,
    disablePadding: false,
    label: "Date Range(report date)",
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
        pl: { sm: 1 },
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
        <div className="d-flex">{numSelected}</div>
      ) : (
        <div className="d-flex">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Configuration</InputLabel>
            <Select
              className="mr-2"
              label="Configuration"
              size="small"
              id="config"
              name="config"
              value={props.config.config}
              onChange={(event) =>
                props.onHandleChange(event, props.config.setConfig)
              }
            >
              <MenuItem value={""}>Select</MenuItem>
              <MenuItem value={"1"}>1BHK</MenuItem>
              <MenuItem value={"2"}>2BHK</MenuItem>
              <MenuItem value={"3"}>3BHK</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="mr-2 pt-1"
            fullWidth
            type="number"
            step={1.0}
            label="Carpet Area"
            variant="outlined"
            size="medium"
            id="carpet_area"
            name="carpet_area"
            value={props.carpetArea.carpetArea}
            onChange={(event) =>
              props.onHandleChange(event, props.carpetArea.setCarpetArea)
            }
          />

          <TextField
            className="mr-2 pt-1"
            fullWidth
            type="number"
            label="Age of building"
            variant="outlined"
            size="medium"
            id="building_age"
            name="building_age"
            value={props.ageOfBuilding.ageOfBuilding}
            onChange={(event) =>
              props.onHandleChange(event, props.ageOfBuilding.setAgeOfBuilding)
            }
          />

          <TextField
            className="mr-2 pt-1"
            fullWidth
            type="number"
            label="Radius"
            variant="outlined"
            size="medium"
            id="radius"
            name="radius"
            value={props.radius.radius}
            onChange={(event) =>
              props.onHandleChange(event, props.radius.setRadius)
            }
          />
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function AvmTable(props) {
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);

  //*filters
  const [radius, setRadius] = React.useState("");
  const [config, setConfig] = React.useState("");
  const [carpetArea, setCarpetArea] = React.useState("");
  const [ageOfBuilding, setAgeOfBuilding] = React.useState("");

const searchData= props.data
  const rows2 = props?.avm?.avm?.isLoading
  ? []
  : props.avm.avm.length > 0
    ? props.avm.avm
    : [];

    const rows1 = props?.data?.length<0
  ? []
  : props.avm?.avm?.length > 0
  ? props.avm?.avm?.filter((item) => {
console.log("hhhhhhsss123",item?.name_of_project)
      return (
        // (searchData
        //   ? item?.no_stories.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item)
        //        &&
        // (searchData && item?.amenities != null
        //   ? item?.amenities.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.configuration != null
        //   ? item?.configuration.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.no_lifts != null
        //   ? item?.no_lifts.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.no_of_parking != null
        //   ? item?.no_of_parking.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.building_age != null
        //   ? item?.building_age.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.authorities != null
        //   ? item?.authorities.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.carpet_area != null
        //   ? item?.carpet_area.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        // (searchData && item?.carpet_rate != null
        //   ? item?.carpet_rate.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) &&
        (searchData 
          ? item?.name_of_project.toLowerCase().includes(searchData.trim().toLowerCase())
              : item)
        //       &&
        // (searchData && item?.authorities != null
        //   ? item?.authorities.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item)
        //       &&
        // (searchData && item?.report_date != null
        //   ? item?.report_date.toLowerCase().includes(searchData.trim().toLowerCase())
        //       : item) 
           );
                })
                : [];
  console.log(rows2, "hhhhhhsss",rows1,props)


  const columns2 = [
    {
      field: "no_stories",
      headerName: "Number of stories",
    },
    {
      field: "amenities",
      headerName: "Amenities",
    },
    {
      field: "configuration",
      headerName: "Configuration",
    },
    {
      field: "no_lifts",
      headerName: "No. of Lifts",
    },
    {
      field: "no_of_parking",
      headerName: "No. of Parking",
    },
    {
      field: "building_age",
      headerName: "Age of the building",
    },
    {
      field: "authorities",
      headerName: "Authorities",
    },
    {
      field: "carpet_area",
      headerName: "Area range(Carper area)",
    },
    {
      field: "carpet_rate",
      headerName: "Carper Rate",
    },
    {
      field: "name_of_project",
      headerName: "Name of the project",
    },
    {
      field: "report_date",
      headerName: "Date Range(report date)",
    },
    // {
    //   id: "actions",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Actions",
    // },
  ];
  function calcCrow(latitude2, longitude2) {
    const latitude1 = props?.property?.property?.latitude;
    const longitude1 = props?.property?.property?.longitude;
    var R = radius; // km
    // var R = 6371000;
    var dLat = toRad(latitude2 - latitude1);
    var dLon = toRad(longitude2 - longitude1);
    var lat1 = toRad(latitude1);
    var lat2 = toRad(latitude2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    console.log("dd", d);
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  const onHandleChange = (event, setValue) => {
    console.log("event", event.target.name, event.target.value);
    setValue(event.target.value);
  };

  const token = props.login?.login?.token;

  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.getAvmPage(data);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.avm?.avm?.map((row) => row);
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
      ? Math.max(0, (1 + page) * rowsPerPage - props?.avm?.avm?.length)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        config={{ config, setConfig }}
        carpetArea={{ carpetArea, setCarpetArea }}
        ageOfBuilding={{ ageOfBuilding, setAgeOfBuilding }}
        radius={{ radius, setRadius }}
        onHandleChange={onHandleChange}
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
    avm: state.avm,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvmPage: (data) => dispatch(getAvmPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AvmTable);
