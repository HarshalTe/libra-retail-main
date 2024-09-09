import * as React from "react";
import { connect } from "react-redux";
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
import { DataGrid } from '@mui/x-data-grid';
import DeleteButton from 'Helpers/DeleteButton';



// import ViewExternalDataUpload from "./View";
// import EditUnderConstructProjects from "./Edit";
// import Actions from "./Actions";

//* Actions
import { getBrokers } from "../../../Redux/Creators/BrokersCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateBroker from "./CreateBroker";
import EditBroker from "./EditBroker";
import BrokersDeleteAll from "./BrokersDeleteAll";
import { ButtonBase } from "@mui/material";

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
//     id: "name",
//     numeric: true,
//     disablePadding: false,
//     label: "Name",
//   },
//   {
//     id: "about",
//     numeric: false,
//     disablePadding: false,
//     label: "About",
//   },
//   {
//     id: "email",
//     numeric: false,
//     disablePadding: false,
//     label: "Email",
//   },
//   {
//     id: "dealing_in",
//     numeric: false,
//     disablePadding: false,
//     label: "Dealing In",
//   },
//   {
//     id: "rera_no",
//     numeric: true,
//     disablePadding: false,
//     label: "Rera No.",
//   },
//   {
//     id: "nar_no",
//     numeric: false,
//     disablePadding: false,
//     label: "NAR NO.",
//   },
//   {
//     id: "tread_no",
//     numeric: false,
//     disablePadding: false,
//     label: "Tread No.",
//   },
//   {
//     id: "propertyforsell",
//     numeric: true,
//     disablePadding: false,
//     label: "Property For Sell",
//   },
//   {
//     id: "propertyforrent",
//     numeric: false,
//     disablePadding: false,
//     label: "Property For Rent",
//   },
//   {
//     id: "serviceprovided",
//     numeric: false,
//     disablePadding: false,
//     label: "Service provided",
//   },
//   {
//     id: "expert_in",
//     numeric: false,
//     disablePadding: false,
//     label: "Expert In",
//   },
//   {
//     id: "operate_in",
//     numeric: false,
//     disablePadding: false,
//     label: "Operate In",
//   },
//   {
//     id: "operating_since",
//     numeric: false,
//     disablePadding: false,
//     label: "Operating Since",
//   },
//   {
//     id: "website",
//     numeric: false,
//     disablePadding: false,
//     label: "Website",
//   },
//   {
//     id: "mobile_no",
//     numeric: false,
//     disablePadding: false,
//     label: "Mobile No.",
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

const EnhancedTableToolbar = (props) => {
  const { numSelected, pageno, pageSize, selected, broker_page } = props;

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
          {broker_page.delete_status == "1" ? (
            <div style={{"width": "-webkit-fill-available","align-items": "center"}} className="d-flex justify-content-between">
            <BrokersDeleteAll data={{ pageno, pageSize, selected }} />
            <Button
            size="small"
            className="text-white bg-success"
            onClick={(event)=>props.projrctSubmit(event, selected.map(obj => obj.id))}
            >
  Download
  </Button>
              </div>
   
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {broker_page.create_status == "1" ? (
            <CreateBroker data={{ pageno, pageSize }} />
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

function BrokersTable(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);


  const [pageSize, setPageSize] = React.useState(10);

  const rows = props.brokers?.brokers?.data?.isLoading
  ? []
  : props.brokers?.brokers?.data?.length > 0
  ? props.brokers?.brokers?.data
  : [];


  // console.log(rows2,"hhhhhh")
  // console.log(props,"hhhhhh")

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    // { field: 'pincode', headerName: 'Pincode', width: 400 },
    // { field: 'instructions', headerName: 'Instructions', width: 500 },
    {field: "actions",
      headerName: "Edit",
      disableExport: true,
      width: 70,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        console.log(params,"eeeeeeee")
        return <EditBroker
        data={params.row} index={params.row.id} data2={{
          pageno: page + 1,
          pageSize: rowsPerPage,
        }}
        />;
        // return <MenuActionBtn data={params.row} index={params.row.id} />;
      },
    },
    
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "about",

      headerName: "About",
    },
    {
      field: "email",
      
      headerName: "Email",
    },
    {
      field: "dealing_in",
      
      headerName: "Dealing In",
    },
    {
      field: "rera_no",
      
      headerName: "Rera No.",
    },
    {
      field: "nar_no",
      
      headerName: "NAR NO.",
    },
    {
      field: "tread_no",
      
      headerName: "Tread No.",
    },
    {
      field: "propertyforsell",
      
      headerName: "Property For Sell",
    },
    {
      field: "propertyforrent",
      
      headerName: "Property For Rent",
    },
    {
      field: "serviceprovided",
      
      headerName: "Service provided",
    },
    {
      field: "expert_in",
      
      headerName: "Expert In",
    },
    {
      field: "operate_in",
      
      headerName: "Operate In",
    },
    {
      field: "operating_since",
      
      headerName: "Operating Since",
    },
    {
      field: "website",
      
      headerName: "Website",
    },
    {
      field: "mobile_no",
      
      headerName: "Mobile No.",
    },
    // {
    //   field: "actions",
    //   
    //   headerName: "Actions",

    // },
  ]
{/* <EditBroker
                              data={{
                                ...row,
                                pageno: page + 1,
                                pageSize: rowsPerPage,
                              }}
                            />;  */}
  //*broker page
  const broker_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "broker_page"
  );

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

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
    props.getBrokers(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.brokers?.brokers?.data?.map((row) => row);
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
          (1 + page) * rowsPerPage - props?.brokers?.brokers?.data?.length
        )
      : 0;

  return (<>
          
    <Box sx={{ width: "100%" }}>
              <EnhancedTableToolbar
                numSelected={selectionModel.length}
                pageno={page + 1}
                pageSize={rowsPerPage}
                selected={selectionModel}
                broker_page={broker_page}
              />
            <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        loading={props.brokers?.brokers?.data?.isLoading ? true : false}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 50]}


        // rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
          onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row.id)
          );
          console.log(selectedRowData);
          setSelectionModel(selectedRowData)
        }}
        />
        </div>
      {/* <TableContainer>
        <Table
        sx={{ minWidth: 750 }}
        aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          >
          <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props?.brokers?.brokers?.data?.length}
            />
            {props?.brokers?.isLoading ? (
            <TableBody>
            <TableCell
                colSpan={100}
                style={{ borderBottom: "none", padding: "0px" }}
              >
              <LinerLoader />
              </TableCell>
              </TableBody>
              ) : (
                <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
            rows.slice().sort(getComparator(order, orderBy)) */}
              {/* {stableSort(
                props.brokers.brokers.data,
                getComparator(order, orderBy)
                )
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    >
                    <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                        </TableCell>
                        <TableCell align="center" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                      {row.about}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.email}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.dealing_in}
                        </TableCell>
                      <TableCell align="center" padding="none">
                      {row.rera_no}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.nar_no}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.tread_no}
                        </TableCell>
                        <TableCell align="center" padding="none">
                        {row.propertyforsell}
                      </TableCell>
                      <TableCell align="center" padding="none">
                      {row.propertyforrent}
                      </TableCell>{" "}
                      <TableCell align="center" padding="none">
                        {row.serviceprovided}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.expert_in}
                        </TableCell>{" "}
                        <TableCell align="center" padding="none">
                        {row.operate_in}
                        </TableCell>
                        <TableCell align="center" padding="none">
                        {row.operating_since}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.website}
                        </TableCell>
                        <TableCell align="center" padding="none">
                        {row.mobile_no}
                        </TableCell>
                        <TableCell align="center" padding="none">
                        <div className="d-flex">
                        {broker_page.update_status == "1" ? (
                          <EditBroker
                          data={{
                            ...row,
                            pageno: page + 1,
                            pageSize: rowsPerPage,
                          }}
                          />
                          ) : (
                            ""
                            )}
                            </div>
                            </TableCell>
                            </TableRow>
                            );
                          })}
                          {emptyRows > 0 && (
                            <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                  >
                  <TableCell colSpan={20} />
                  </TableRow>
                  )}
                  </TableBody>
                  )}
                  </Table>
                  </TableContainer>
                  <TablePagination
                  rowsPerPageOptions={[1, 10, 20]}
                  component="div"
                  count={props?.brokers?.brokers?.total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
    </Box>
</>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    brokers: state.brokers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBrokers: (data) => dispatch(getBrokers(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BrokersTable);
