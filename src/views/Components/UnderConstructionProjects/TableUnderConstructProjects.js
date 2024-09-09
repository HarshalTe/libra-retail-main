import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { DataGrid } from '@mui/x-data-grid';    

// import ViewExternalDataUpload from "./View";
import EditUnderConstructProjects from "./Edit";
// import Actions from "./Actions";

//* Actions
import { getUnderConstructProjects } from "../../../Redux/Creators/UnderConstructionProjectsCreators";

//*Compoenets
import AddUnderConstructProjects from "./Add";
import DeleteUnderConstructProjects from "./Delete";
import DownloadCSV from "./DownloadCSV";
import UploadFile from "./BulkUpload";
import { getProjects } from "../../../Redux/Creators/ProjectsCreators";

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
    field: "sr_no",
    headerName: "Sr No.",
  },
  {
    field: "broker_name",
    headerName: "Broker Name",
  },
  {
    field: "project_name",
    headerName: "Project Name",
  },
  {
    field: "mobile_no",
    headerName: "Mobile No.",
  },
  {
    field: "rent",
    headerName: "Rent",
  },
  {
    field: "carpet_area",
    headerName: "Carpet Area",
  },
  {
    field: "market_value",
    headerName: "Market Value",
  },
  {
    field: "date",
    headerName: "Date",
  },
  {
    field: "actions",
    headerName: "Actions",
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
  const { numSelected, pageno, pageSize, selected, under_contruction_page } =
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
        ></Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex">
          {under_contruction_page.delete_status == "1" ? (
            <DeleteUnderConstructProjects
              data={{ pageno, pageSize, selected }}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          <DownloadCSV />

          {under_contruction_page.update_status == "1" ? (
            <UploadFile data={{ pageno, pageSize }} />
          ) : (
            ""
          )}

          {/* {under_contruction_page.create_status == "1" ? (
            <AddUnderConstructProjects data={{ pageno, pageSize }} />
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

function TableUnderConstructProjects(props) {
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);
  //*
  const under_contruction_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "under_contruction_page"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);


  const rows2 = props?.projects?.isLoading
  ? []
  : props.projects.projects.data?.length > 0
    ? props.projects.projects.data.filter((item) => {
      return (
        (item?.is_underconstruction==1
    ))
  })
    : [];
console.log(rows2, "hhhhhh")


const columns2 = [
  {
    field: "sr_no",
    headerName: "Sr No.",
  },
  {
    field: "broker_name",
    headerName: "Broker Name",
  },
  {
    field: "project_name",
    headerName: "Project Name",
  },
  {
    field: "mobile_no",
    headerName: "Mobile No.",
  },
  {
    field: "rent",
    headerName: "Rent",
  },
  {
    field: "carpet_area",
    headerName: "Carpet Area",
  },
  {
    field: "market_value",
    headerName: "Market Value",
  },
  {
    field: "date",
    headerName: "Date",
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
      return <EditUnderConstructProjects 
      data={params.row} index={params.row.id} data2={{
        pageno: page + 1,
        pageSize: rowsPerPage}}
        />; 
      // return <MenuActionBtn data={params.row} index={params.row.id} />;
    },
  },
];


  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

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
    props.getUnderConstructProjects(data);
    props.getProjects(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds =
        props?.underConstructProjects?.underConstructProjects?.data?.map(
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
          (1 + page) * rowsPerPage -
            props?.underConstructProjects?.underConstructProjects?.data?.length
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        under_contruction_page={under_contruction_page}
      />
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows2}
          columns={columns2}
          loading={props?.projects?.isLoading ? true : false}
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
    underConstructProjects: state.underConstructProjects,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUnderConstructProjects: (data) =>
      dispatch(getUnderConstructProjects(data)),
      getProjects: (data) => dispatch(getProjects(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableUnderConstructProjects);
