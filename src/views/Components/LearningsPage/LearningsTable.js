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
import { getLearningsPage } from "../../../Redux/Creators/LearningsCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateLearnings from "./CreateLearnings";
import EditLearnings from "./EditLearnings";
import ViewLearnings from "./ViewLearnings";
import DeleteLearnings from "./DeleteLearnings";

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
    field: "application_no",
    headerName: "Application No.",
  },
  {
    field: "start_date",
    headerName: "Query Initiation Date",
  },
  {
    field: "type_of_query",
    headerName: "Query Type",
  },

  {
    field: "active_status",
    headerName: "Status",
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
  const { numSelected, pageno, pageSize, selected, learnings } = props;

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
          {/* {learnings?.delete_status == "1" ? (
            <DeleteLearnings data={{ selected, pageno, pageSize }} />
          ) : (
            ""
          )} */}
        </div>
      ) : (
        <div className="d-flex">
          {learnings?.create_status == "1" ? (
            <Tooltip title="Add Learnings">
              <CreateLearnings data={{ pageno: pageno, pageSize: pageSize }} />
            </Tooltip>
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

function LearningsTable(props) {
  //*
  const learnings = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "learning_page"
  );
  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("application_no");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);

  const rows2 = props?.learnings?.data?.isLoading
    ? []
    : props.learnings.learnings.data?.learnings?.length > 0
    ? props?.login?.login?.user.role == "admin"
    ? props.learnings?.learnings?.data?.learnings
    : props.learnings?.learnings?.data?.learnings?.filter((item) => {
      return (
        (item?.property?.user_id == props?.login?.login?.user_id
    ))
  })
      : [];
  console.log(rows2, "hhhhhh")

  const columns2 = [
    
        {
          field: "type",
          headerName: "Type",
          headerAlign: "center",
          align: "center",
          width: 150,
        },
    {
      field: "notification_no",
      align: "center",
      headerAlign: "center",
      headerName: "Notification No",
      width: 160,
  },
    {
      field: "subject",
      headerAlign: "center",
      headerName: "Subject",
      align: "center",
      width: 100,
    },
    {
      field: "city",
      headerAlign: "center",
      headerName: "City",
      align: "center",
      width: 100,
    },

    {
      field: "date",
      headerName: "Type Date",
      align: "center",
      headerAlign: "center",
      width: 100,
    },

    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      width: 250,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (row) => {
        return <div className="d-flex">
          <ViewLearnings data={row} />

          {learnings?.update_status == "1" ? (
            <EditLearnings
            data={row.row} index={row.row.id}
              data2={{
                ...row,
                pageSize: rowsPerPage,
                pageno: page + 1,
              }}
            />
          ) : (
            ""
          )}
          <DeleteLearnings data={row.row}/>
        </div>
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
    props.getLearningsPage(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.learnings?.learnings?.data?.map((row) => row);
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
        (1 + page) * rowsPerPage - props?.learnings?.learnings?.data?.length
      )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        learnings={learnings}
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
    learnings: state.learnings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLearningsPage: (data) => dispatch(getLearningsPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LearningsTable);
