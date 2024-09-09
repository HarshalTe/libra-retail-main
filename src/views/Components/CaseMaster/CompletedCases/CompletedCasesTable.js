// import * as React from "react";
// import { connect } from "react-redux";
// import { Link as DomLink, Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";
// import { Button } from "@material-ui/core";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Checkbox from "@mui/material/Checkbox";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import MenuItem from "@mui/material/MenuItem";

// import { visuallyHidden } from "@mui/utils";

// //* Actions
// import { getCompletedPropertiesPage } from "../../../../Redux/Creators/PropertiesCompletedCreators";

// //*Compoenets
// import LinerLoader from "components/Loaders/LinerLoader";
// import HistoryButton from "./HistoryButton";
// import ReopenButton from "./ReopenButton";

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // This method is created for cross-browser compatibility, if you don't
// // need to support IE11, you can use Array.prototype.sort() directly
// function stableSort(array, comparator) {
//   console.log("array", array);
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: "application_no",
//     numeric: true,
//     disablePadding: false,
//     label: "Application No.",
//   },
//   {
//     id: "name_of_project",
//     numeric: false,
//     disablePadding: false,
//     label: "Project/Property Name",
//   },
//   {
//     id: "type",
//     numeric: false,
//     disablePadding: false,
//     label: "Type",
//   },

//   {
//     id: "branch_name",
//     numeric: true,
//     disablePadding: false,
//     label: "Branch Name",
//   },
//   {
//     id: "assigned_to",
//     numeric: false,
//     disablePadding: false,
//     label: "Assigned to",
//   },

//   {
//     id: "actions",
//     numeric: false,
//     disablePadding: false,
//     label: "Actions",
//   },
// ];

// function EnhancedTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={"center"}
//             padding="none"
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const EnhancedTableToolbar = (props) => {
//   const { numSelected, pageno, pageSize, selected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         ></Typography>
//       )}

//       {numSelected > 0 ? (
//         <div className="d-flex"></div>
//       ) : (
//         <div className="d-flex"></div>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// function CompletedCasesTable(props) {
//   //*
//   const completed_case_page = props?.login?.login?.user?.rights.find(
//     (o) => o.page.name === "completed_case_page"
//   );
//   //*
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("application_no");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10000);

//   React.useEffect(() => {
//     fetchData(page, rowsPerPage);
//   }, []);

//   const fetchData = (page, rowsPerPage) => {
//     const token = props.login?.login?.token;

//     console.log("page", page);
//     let pageno = page + 1;
//     console.log("pageno", pageno);
//     let data = {
//       pageno: pageno,
//       pageSize: rowsPerPage,
//       token: token,
//     };
//     props.getCompletedPropertiesPage(data);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = props?.completedProperties?.completedProperties?.data
//         .filter((row) => row?.is_completed == 1)
//         ?.map((row) => row);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, row) => {
//     const selectedIndex = selected.indexOf(row);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, row);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     fetchData(newPage, rowsPerPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(event.target.value);
//     setPage(0);
//     //!ye change hai
//     fetchData(0, event.target.value);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (row) => selected.indexOf(row) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0
//       ? Math.max(
//           0,
//           (1 + page) * rowsPerPage -
//             props?.completedProperties?.completedProperties?.data.filter(
//               (row) => row?.is_completed == 1
//             )?.length
//         )
//       : 0;

//   return (
//     <Box sx={{ width: "100%" }}>
//       <EnhancedTableToolbar
//         numSelected={selected.length}
//         pageno={page + 1}
//         pageSize={rowsPerPage}
//         selected={selected}
//       />
//       <TableContainer>
//         <Table
//           sx={{ minWidth: 750 }}
//           aria-labelledby="tableTitle"
//           size={dense ? "small" : "medium"}
//         >
//           <EnhancedTableHead
//             numSelected={selected.length}
//             order={order}
//             orderBy={orderBy}
//             onSelectAllClick={handleSelectAllClick}
//             onRequestSort={handleRequestSort}
//             rowCount={
//               props?.completedProperties?.completedProperties?.data?.length
//             }
//           />
//           {props.completedProperties.isLoading ? (
//             <TableBody>
//               <TableCell
//                 colSpan={12}
//                 style={{ borderBottom: "none", padding: "0px" }}
//               >
//                 <LinerLoader />
//               </TableCell>
//             </TableBody>
//           ) : (
//             <TableBody>
//               {/* if you don't need to support IE11, you can replace the `stableSort` call with:
//                  rows.slice().sort(getComparator(order, orderBy)) */}
//               {stableSort(
//                 props?.completedProperties?.completedProperties?.data,
//                 // rows,
//                 getComparator(order, orderBy)
//               )
//                 .filter((row) => row?.is_completed == 1)
//                 // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.id}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           onClick={(event) => handleClick(event, row)}
//                           checked={isItemSelected}
//                           inputProps={{
//                             "aria-labelledby": labelId,
//                           }}
//                         />
//                       </TableCell>

//                       <TableCell align="center" padding="none">
//                         {row?.application_no}
//                       </TableCell>
//                       <TableCell align="center" padding="none">
//                         {row?.project?.project_name}
//                       </TableCell>
//                       <TableCell align="center" padding="none">
//                         {row?.type}
//                       </TableCell>
//                       <TableCell align="center" padding="none">
//                         {row?.branch?.branch_name}
//                       </TableCell>
//                       <TableCell align="center" padding="none">
//                         {row.assign_to}
//                       </TableCell>

//                       <TableCell align="center" padding="none">
//                         <div className="d-flex">
//                           {completed_case_page.update_status == "1" ? (
//                             <ReopenButton data={row} />
//                           ) : (
//                             ""
//                           )}

//                           {completed_case_page.view_status == "1" ? (
//                             <DomLink
//                               to={`/admin/viewWorkInProgress/${row?.id}`}
//                             >
//                               <VisibilityIcon
//                                 color="success"
//                                 className="mt-1"
//                               />
//                             </DomLink>
//                           ) : (
//                             ""
//                           )}

//                           <HistoryButton data={row} />
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {/* {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={20} />
//                 </TableRow>
//               )} */}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[1, 10, 20]}
//         component="div"
//         count={
//           props?.completedProperties?.completedProperties?.data?.filter(
//             (row) => row?.is_completed == 1
//           ).length
//         }
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Box>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     login: state.login,
//     completedProperties: state.completedProperties,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCompletedPropertiesPage: (data) =>
//       dispatch(getCompletedPropertiesPage(data)),
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CompletedCasesTable);

import * as React from "react";
import { connect } from "react-redux";
import { Link as DomLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';    

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
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { visuallyHidden } from "@mui/utils";

//* Actions
import { getPropertiesPage } from "../../../../Redux/Creators/PropertiesCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
// import Reasign from "./Reasign";
// import HistoryWIP from "./HistoryWIP";
// import Send from "./Send";
import Courier from "./Courier";
import CompletedSendMail from "./CompletedSendMail";
import Reasign from "../WorkInProgressCases/Reasign";
import HistoryWIP from "../WorkInProgressCases/HistoryWIP";
import PrintButton from "./PrintButton";
import ReopenButton from "./ReopenButton";

import { getCompletedPropertiesPage } from "../../../../Redux/Creators/PropertiesCompletedCreators";


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
    id: "application_no",
    numeric: true,
    disablePadding: false,
    label: "Application No.",
  },
  {
    id: "name_of_project",
    numeric: false,
    disablePadding: false,
    label: "Project/Property Name",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },

  {
    id: "branch_name",
    numeric: true,
    disablePadding: false,
    label: "Branch Name",
  },
  {
    id: "assigned_to",
    numeric: false,
    disablePadding: false,
    label: "Assigned to",
  },
  {
    id: "completed_date",
    numeric: false,
    disablePadding: false,
    label: "Completed Date",
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
        ></Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex"></div>
      ) : (
        <div className="d-flex"></div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function WIPTable(props) {
  //*
  const work_in_progress_case_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "work_in_progress_case_page"
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
  
  React.useEffect(() => {
  fetchData(page, rowsPerPage);
}, []);

const fetchData = (page, rowsPerPage) => {
  const token = props.login?.login?.token;

  let pageno = page + 1;
  console.log("pageno", pageno);
  let data = {
    pageno: pageno,
    pageSize: rowsPerPage,
    token: token,
  };
  props.getCompletedPropertiesPage(data);
};
console.log("page", props);
  const rows2 = props?.completedProperties?.isLoading
? []
: props.completedProperties.completedProperties.data?.length > 0
  ? props.completedProperties.completedProperties.data.filter((pur)=>{
    return(pur?.is_online_file_uploads==1)
  }).filter((pur)=>{
    return(
      (props.searchTerm
        ? pur?.application_no
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.bank?.bank_name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.project?.project_name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur)
    )
  })
  : [];
console.log(rows2, "hhhhhh")

const columns2 = [
  {
    field: "application_no",
    width:120,

    headerName: "Application No.",
    
  },
  {
    field: "name_of_project",
    width:120,
    headerName: "Project/Property Name",
    renderCell: (row) => {
      return row.row?.project?.project_name
    },
  },
  {
    field: "type",
    width:70,
    headerName: "Type",
  },
  
  {
    field: "branch_name",
    width:100,
    headerName: "Branch Name",
    renderCell: (row) => {
      return row.row?.branch?.branch_name
    },
  },
  {
    field: "assigned_to",
    headerName: "Assigned to",
  },
  {
    field: "completed_date",
    width:120,
    headerName: "Completed Date",
  },
  
  {
    field: "actions",
    headerName: "Actions",
  align: "center",
  headerAlign: "center",

  width:400,
    renderCell: (row) => {
      return <div className="d-flex">
      {work_in_progress_case_page.view_status == "1" ? (
        <DomLink
          to={`/admin/viewWorkInProgress/${row?.id}`}
        >
          <VisibilityIcon
            color="success"
            className="mt-1"
          />
        </DomLink>
      ) : (
        ""
      )}

      {/* <Reasign data={row} /> */}
                            <ReopenButton data={row} />
      <HistoryWIP data={row} />
      <Courier data={row} />
      <CompletedSendMail data={row}  />
    </div>
    }  
},
];



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.completedproperties?.completedproperties?.data?.map(
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
          (1 + page) * rowsPerPage - props?.completedproperties?.completedproperties?.data?.length
        )
      : 0;
      const rowsCopy = [...rows2];
      const reversedRows = rowsCopy.reverse();

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
          rows={reversedRows}
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
    properties: state.properties,
    completedProperties: state.completedProperties,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPropertiesPage: (data) => dispatch(getPropertiesPage(data)),
       getCompletedPropertiesPage: (data) =>
      dispatch(getCompletedPropertiesPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WIPTable);
