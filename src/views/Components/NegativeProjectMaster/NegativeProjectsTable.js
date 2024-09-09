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

//* Actions
import { getNegativeProjectsPage } from "../../../Redux/Creators/NegativeProjectsCreators";

//*Components
import EditNegativeProjects from "./EditNegativeProjects";
import SendMail from "./SendMail";
import DeleteNegativeProjects from "./DeleteNegativeProjects";
import DownloadMultiple from "./DownloadMultiple";
import ViewFile from "./ViewFile";
import UploadFile from "./UploadFile";
import BulkUploadNegativeProjects from "./BulkUploadNegativeProjects";
import { getProjects } from "../../../Redux/Creators/ProjectsCreators";

function createData(
  sr_no,
  broker_name,
  project_name,
  address,
  pincode,
  reasons,
  view,
  date
) {
  return {
    sr_no,
    broker_name,
    project_name,
    address,
    pincode,
    reasons,
    view,
    date,
  };
}

const rows = [
  createData(
    1,
    "Udit",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
  ),
  createData(
    2,
    "Atul",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
  ),
  createData(
    3,
    "Ronaldo",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
  ),
  createData(
    4,
    "Messi",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
  ),
  createData(
    5,
    "Pogba",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
  ),
  createData(
    7,
    "Udit",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
  ),
  createData(
    8,
    "Atul",
    "Lodha The Park",
    "Mumbai",
    4000099,
    "No Reason",
    8110000,
    "07 / 05 / 2018"
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
    id: "pincode",
    numeric: true,
    disablePadding: false,
    label: "Pincode",
  },

  {
    id: "reasons",
    numeric: false,
    disablePadding: false,
    label: "Reasons",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "PDF View/Upload",
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
        {/* //? Checkbox Padding is changed to none */}
        <TableCell padding="none">
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
            padding={"none"}
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
          {/* Negative Project Master Table */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex">
          <DownloadMultiple data={{ selected }} />
          <DeleteNegativeProjects data={{ selected, pageno, pageSize }} />
        </div>
      ) : (
        <div className="d-flex">
          <BulkUploadNegativeProjects data={{ pageno, pageSize }} />
          {/* <AddNegativeProjects data={{ pageno, pageSize }} /> */}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function NegativeProjectsTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("pincode");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);
const [selectionModel, setSelectionModel] = React.useState([]); 


  React.useEffect(() => {
    fetchData(page);
  }, []);
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
      field: "pincode",
      headerName: "Pincode",
    },
  
    {
      field: "reasons",
      headerName: "Reasons",
    },
    {field: "view",
    headerName: "PDF View/Upload",
    disableExport: true,
    width: 270,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (row) => {
      console.log(row,"kkkk")
        if (row?.row?.file !== null) {
        return <ViewFile
          data={{
            ...row,
            pageno: page + 1,
            pageSize: rowsPerPage,
          }}
        />
      } else {
        return <UploadFile
          data={{
            ...row,
            pageno: page + 1,
            pageSize: rowsPerPage,
          }}
        />
      }
      
      
    },
  },
    {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 270,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return <div className="d-flex">
      <EditNegativeProjects
 data={params.row} index={params.row.id} data2={{
   pageno: page + 1,
   pageSize: rowsPerPage}}
   />
        <SendMail />
   </div> 
        ; 
      // return <MenuActionBtn data={params.row} index={params.row.id} />;
    },
  },

  ];

  
const rows2 = props?.projects?.projects?.data?.isLoading
? []
: props.projects.projects.data?.length > 0
  ? props.projects.projects.data.filter((item) => {
    return (
      (item?.is_negative==1
  ))
})
  : [];
console.log(rows2, "hhhhhh")

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
    props.getNegativeProjectsPage(data);
    props.getProjects(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.negativeProjects?.negativeProjects?.data.map(
        (n) => n
      );
      setSelected(newSelecteds);
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
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  //? Name ke jaga row kar diya hai
  const isSelected = (row) => selected.indexOf(row) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
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
    negativeProjects: state.negativeProjects,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNegativeProjectsPage: (data) => dispatch(getNegativeProjectsPage(data)),
    getProjects: (data) => dispatch(getProjects(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NegativeProjectsTable);
