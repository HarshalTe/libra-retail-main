import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Button, Divider, TextField } from "@material-ui/core";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Row, Col, ModalBody, ModalHeader, Modal } from "reactstrap";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from "@mui/icons-material/Add";


//* Actions
// import { getAvmPage } from "../../../../Redux/Creators/AvmCreators";
import { getAvmPage } from "../../../Redux/Creators/AvmCreators";
import { editPropertiesReOpen } from "../../../Redux/Creators/AvmCreators";
import { getProjects } from "../../../Redux/Creators/ProjectsCreators";



import Swal from "sweetalert2";

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
    id: "show_address",
    numeric: true,
    disablePadding: false,
    label: "Show Address",
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
  {
    id: "final_value",
    numeric: true,
    disablePadding: false,
    label: "Final Value",
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
      {console.log("selected",selected,selected.map(obj => obj.id))}
      {numSelected > 0 ? (
        <div style={{"width": "-webkit-fill-available","align-items": "center"}} className="d-flex justify-content-between">
          {/* {numSelected}  */}
          Select Three Comparables (Max 3)
<Button
className="text-white bg-success"
onClick={(event)=>props.projrctSubmit(event, selected)}
 >
  Add to Report</Button>
          </div>
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

function TableCompatable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

  //*filters
  const [radius, setRadius] = React.useState(3);
  const [config, setConfig] = React.useState("");
  const [carpetArea, setCarpetArea] = React.useState(
    props?.property?.property?.valuation?.type?.carpet_area
  );
  const [ageOfBuilding, setAgeOfBuilding] = React.useState(
    props?.property?.property?.project?.building_age
  );
  const [childInput, setChildInput] = React.useState('');

  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const rows2 = props?.avm?.avm?.isLoading
? []
: props?.projects?.projects?.data?.length > 0
  ? props?.projects?.projects?.data?.filter(row=>row.is_underconstruction===1)
  : [];
console.log(rows2, "hhhhhh")


const handleInputChange = (e) => {
  setChildInput(e.target.value);
};
const sendDataToParentHandler = () => {
  // Call the function passed from the parent with the data
  props.sendDataToParent(childInput);
};
const columns2 = [
  {
    field: "project_name",
    width: 200,
    headerName: "Project Name",
    headerAlign: "center",
    align: "center",
  },

  {
    field: "address",
    width: 240,
    headerName: "Project Address",
     headerAlign: "center",
    align: "center",
  },

  {
    field: "localities",
    width: 130,
    headerName: "Project Localities",
  },
  {
    field: "surrounding",
    width: 130,
    headerName: "Project Surrounding",
  },
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

  const medianArray = props?.avm?.isLoading
    ? []
    : props.avm.avm?.filter((row) =>
        carpetArea == "" || carpetArea == null || carpetArea == undefined
          ? row
          : (row.carpet_area >= (Number(carpetArea) - 200).toFixed(2) &&
              row.carpet_area <= (Number(carpetArea) + 200).toFixed(2)) ||
            row.carpet_area == Number(carpetArea).toFixed(2)
      );

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
      console.log("sort", Number(a.final_value) - Number(b.final_value));
      return Number(a.final_value) - Number(b.final_value);
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2) {
      console.log("valuesss", values[half].final_value);

      return values[half].final_value;
    }

    console.log(
      "median",
      (Number(values[half - 1].final_value) +
        Number(values[half].final_value)) /
        2.0
    );

    return (values[half - 1].final_value + values[half].final_value) / 2.0;
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
      (partialSum, a) => Number(partialSum) + Number(a.final_value),
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

  const token = props.login?.login?.token;

  React.useEffect(() => {
    let data = {
      pageno: 1,
      pageSize: 100000000,
      token: token,
    };
    // props.getAvmPage(data);
    props.getProjects(data);
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

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   fetchData(newPage, rowsPerPage);
  // };

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

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    
      // const projrctSubmit = (event , ids) => {
      //   console.log("event , ids",event , ids)
      //   const value = 1;
      //   swalWithBootstrapButtons
      //     .fire({
      //       title: "Do you want to add This To Sales Comparison Report?",
      //       icon: "warning",
      //       showCancelButton: true,
      //       confirmButtonText: "Yes, submit!",
      //       cancelButtonText: "No, cancel!",
      //       reverseButtons: false,
      //     })
      //     .then((result) => {
      //       if (result.isConfirmed) {
      //         let data = {
      //           id: props?.unstructured?.unstructured?.id,
      //           comparable_ids:ids
      //         };
      //         props.editUnstructuredData(
      //           data,token
      //         );
      //       }
      //     });
      // };

      const handleSelectionModelChange = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedRowData = rows2.filter((row) => selectedIDs.has(row.id));
        console.log("selectedRowData",selectedRowData,selectedIDs)
    
        if (selectedRowData.length <= 3) {
          setSelectionModel(Array.from(selectedIDs));
          setChildInput(Array.from(selectedRowData));
        } else {
          const selectedIDsArray = Array.from(selectedIDs);
          const updatedSelectionIDs = selectedIDsArray.slice(1, 4);
          setSelectionModel(updatedSelectionIDs);
          setChildInput(selectedRowData);
        }
      };
    
      

  return (
    <Box sx={{ width: "100%" }}>



<button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Add Comparables
        </button>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Comparables</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
        <Row>
       <Col md={12} style={{"color":"red"}}>
       &#x27A3; To add data in Comparables Select data From Table Below</Col> 
       </Row>
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
        // projrctSubmit={projrctSubmit}
      />
      <div style={{ height: 650, width: '100%' }}>
      <DataGrid
      rows={rows2}
      columns={columns2}
      pageSize={10}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClicks
      selectionModel={selectionModel}
      onSelectionModelChange={handleSelectionModelChange}
    />
      </div>
        </ModalBody>
      </Modal>
      


{/* <ComparableReport data={selectionModel}/> */}

      
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    avm: state.avm,
    property: state.property,
    projects: state.projects,
    unstructured: state.unstructured
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvmPage: (data) => dispatch(getAvmPage(data)),
    editPropertiesReOpen: (data) => dispatch(editPropertiesReOpen(data)),
    getProjects: (data) => dispatch(getProjects(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableCompatable);
