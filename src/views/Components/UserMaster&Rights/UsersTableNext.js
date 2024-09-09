import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import Badge from "@material-ui/core/Badge";
//*
import { connect } from "react-redux";
import { getUsersPage } from "../../../Redux/Creators/UsersCreators";
import ActiveAll from "./ActiveAll";
import InactiveAll from "./InactiveAll";
import AddUsers from "./AddUsers";
import EditUser from "./EditUser";
import AddAssets from "./AddAssets";
import ChangePassword from "./ChangePassword";
import { DataGrid } from '@mui/x-data-grid';
import { getBranchMasterPage } from "../../../Redux/Creators/BranchMasterCreators";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";
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




//* yaha se rows aur row ka function gaya
function createData(id, name, email, role, status) {
  return {
    id,
    name,
    email,
    role,
    status,
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
  if (array == undefined) {
    return;
  } else {
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
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
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
              "aria-label": "select all esers",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding="normal"
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
  const { numSelected, user_creation_page } = props;
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
          {user_creation_page.update_status == "1" ? (
            <ActiveAll data={props} />
          ) : (
            ""
          )}

          {user_creation_page.update_status == "1" ? (
            <InactiveAll data={props} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {user_creation_page.create_status == "1" ? (
            <Tooltip title="Add Users">
              <AddUsers
                data={{ pageno: props.pageno, pageSize: props.pageSize }}
              />
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

function UsersTableNext(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);

  //*
  const user_creation_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "user_creation_page"
  );

  console.log("props", props);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000000);

  //*Edit aur actions
  const [actions, setActions] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  React.useEffect(() => {
    fetchData(page);
  }, []);

  const rows2 = props.users?.isLoading
  ? []
  : props.users?.users?.data?.length > 0
  ? props.users?.users?.data?.filter((pur)=>{
    // console.log(pur?.application_no,props.searchTerm,"searchTerm")
    return(
      (props.searchTerm
        ? pur?.name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.email
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.role
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.designation
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur)
    )
  })
  : [];
  console.log(rows2,"hhhhhh")

  const columns2 = [

    {
      field: "name",
      headerName: "Name",
      width:150

    },
    {
      field: "email",
      headerName: "Email",
      width:200

    },
    {
      field: "role",
      headerName: "Role",
      width:150

    },
    {field: "status",
    headerName: "Status",
    disableExport: true,
    width: 70,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      console.log(params,"mmm")
      if (params.row.status == 1) {
        return<Badge
        // className={classes.margin}
        color="primary"
        variant="dot"
        ></Badge>
        
      } else {
        return  <Badge
        // className={classes.margin}s
        color="error"
        variant="dot"
        ></Badge>
      }
      
    },
  },
    {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 420,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      console.log(params,"mmm")
     
        return<div className="d-flex">
          <EditUser
          data={params.row} index={params.row.id}
            data2={{
              pageno: page + 1,
              pageSize: rowsPerPage,
            }}
            />
          <AddAssets
          data={params.row} index={params.row.id}
            data2={{
              pageno: page + 1,
              pageSize: rowsPerPage,
            }}
            />
          <ChangePassword
            data={{
              ...params,
              pageno: page + 1,
              pageSize: rowsPerPage,
            }}
            />
            </div>
    },
  },
  
  ];
  

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
    props.getUsersPage(data);
    props.getBranchMasterPage(data);
  };

  const rows = props?.users?.isLoading ? [] : props?.users?.users?.data;

  console.log(rows, "rowss");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          numSelected={selectionModel.length}
          pageno={page + 1}
          pageSize={rowsPerPage}
          selected={selectionModel}
          user_creation_page={user_creation_page}
        />
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      loading={props.users?.isLoading ? true : false}
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersPage: (data) => dispatch(getUsersPage(data)),
    getBranchMasterPage: (data) => dispatch(getBranchMasterPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTableNext);
