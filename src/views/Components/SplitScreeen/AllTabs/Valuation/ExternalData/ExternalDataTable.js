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
import { Button, TextField } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from '@mui/x-data-grid';    

//* Actions
import { getExternalDataList } from "../../../../../../Redux/Creators/ExternalDataCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
// import AddExternalData from "./Add";
// import DeleteExternalData from "./Delete";
// import UploadFile from "./BulkUpload";

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
  //   {
  //     id: "actions",
  //     numeric: false,
  //     disablePadding: false,
  //     label: "Actions",
  //   },
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

function ExternalDataTable(props) {
  //*
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
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);

  const rows2 = props?.externalData?.isLoading
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
  //   {
  //     id: "actions",
  //     numeric: false,
  //     disablePadding: false,
  //     label: "Actions",
  //   },
];


  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getExternalDataList(data);
  };

  //*filters
  const [radius, setRadius] = React.useState(3);
  const [config, setConfig] = React.useState("");
  const [carpetArea, setCarpetArea] = React.useState(
    props?.property?.property?.valuation?.type?.carpet_area
  );
  const [ageOfBuilding, setAgeOfBuilding] = React.useState(
    props?.property?.property?.project?.building_age
  );

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

  const medianArray = props?.externalData?.isLoading
    ? []
    : props.externalData.externalData?.data?.filter((row) =>
        carpetArea == "" || carpetArea == null || carpetArea == undefined
          ? row
          : (Number(row.carpet_area).toFixed(2) >=
              (Number(carpetArea) - 200).toFixed(2) &&
              Number(row.carpet_area).toFixed(2) <=
                (Number(carpetArea) + 200).toFixed(2)) ||
            Number(row.carpet_area).toFixed(2) == Number(carpetArea).toFixed(2)
      );
  // .map((row) => medianArray.push(row.final_value));
  // ?.filter((row) =>
  //   ageOfBuilding == "" ||
  //   ageOfBuilding == null ||
  //   ageOfBuilding == undefined
  //     ? row
  //     : row.building_age <= Number(ageOfBuilding) + 10 &&
  //       row.building_age >= Number(ageOfBuilding) - 10
  // )
  // ?.filter((row) =>
  //   config == "" || config == null || config == undefined
  //     ? row
  //     : row.configuration <= config
  // )
  // ?.filter((row) =>
  //   radius == "" || radius == null || radius == undefined
  //     ? row
  //     : calcCrow(row.latitude, row.longitude) <= radius
  // )

  console.log("medianArray: ", medianArray);

  //!median
  function median() {
    console.log("call aaya");
    let values = medianArray;
    if (values.length === 0) {
      console.log("valuesLength", values.length);

      return 0;
    }

    values.sort(function (a, b) {
      console.log("sort", Number(a.market_value) - Number(b.market_value));
      return Number(a.market_value) - Number(b.market_value);
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2) {
      console.log("valuesss", values[half].market_value);

      return Number(values[half].market_value);
    }

    console.log(
      "median",
      (Number(values[half - 1].market_value) +
        Number(values[half].market_value)) /
        2.0
    );

    return (
      (Number(values[half - 1].market_value) +
        Number(values[half].market_value)) /
      2.0
    );
  }

  //!avg
  function average() {
    let values = medianArray;
    if (values.length === 0) {
      console.log("valuesLength", values.length);
      // setAverageAmount(0);
      return 0;
    }

    let sum = values.reduce(
      (partialSum, a) => Number(partialSum) + Number(a.market_value),
      0
    );
    // setAverageAmount(sum);
    console.log("sum", sum);
    return sum;
  }

  const onHandleChange = (event, setValue) => {
    console.log("event", event.target.name, event.target.value);
    setValue(event.target.value);
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
          loading={props?.externalData?.isLoading ? true : false}
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
    getExternalDataList: (data) => dispatch(getExternalDataList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExternalDataTable);
