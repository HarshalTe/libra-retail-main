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

//* Actions
import { getPaymentMasterPage } from "../../../Redux/Creators/PaymentMasterCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import PaymentMasterCreate from "./PaymentMasterCreate";
import PaymentMasterEdit from "./PaymentMasterEdit";
import PaymentMasterDeleteAll from "./PaymentMasterDeleteAll";
import { DataGrid } from '@mui/x-data-grid';


// function EnhancedTableHead(props) {
//     const {
//       onSelectAllClick,
//       order,
//       orderBy,
//       numSelected,
//       rowCount,
//       onRequestSort,
//     } = props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };
  
//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell padding="checkbox">
//             <Checkbox
//               color="primary"
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={rowCount > 0 && numSelected === rowCount}
//               onChange={onSelectAllClick}
//               inputProps={{
//                 "aria-label": "select all desserts",
//               }}
//             />
//           </TableCell>
//           {headCells.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               align={"center"}
//               padding="none"
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : "asc"}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {orderBy === headCell.id ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === "desc" ? "sorted descending" : "sorted ascending"}
//                   </Box>
//                 ) : null}
//               </TableSortLabel>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }

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
          <div className="d-flex">
            <PaymentMasterDeleteAll data={{ selected }} />
          </div>
        ) : (
          <div className="d-flex">
            <PaymentMasterCreate />
          </div>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  function PaymentTable(props) {
    const [selectionModel, setSelectionModel] = React.useState([]);

    const rows2 = props.paymentMaster?.paymentMaster?.data?.isLoading
    ? []
    : props.paymentMaster?.paymentMaster?.data?.length > 0
    ? props.paymentMaster?.paymentMaster?.data
    : [];
    console.log(rows2,"hhhhhh")
  
    const columns2 = [
      {
        field: "company_detail",
        headerName: "Company",
        width:165,
        valueFormatter: ({ value }) => `${value?.company_detail}`,
      },
      {
        field: "account_name",
        headerName: "Account Name",
        width:165
      },
      {
        field: "account_no",
        headerName: "Account Number",
        width:165
      },
      {
        field: "account_type",
        headerName: "Account Type",
        width:165
      },
      {
        field: "ifsc_code",
        headerName: "IFSC Code",
        width:150
      },
    
      // {
      //   field: "actions",
      //   headerName: "Actions",
      //   width:165
        
      // },
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
          return <PaymentMasterEdit  data={params.row} index={params.row.id} data2={{
            pageno: page + 1,
            pageSize: rowsPerPage,
          }}/>; 
          // return <MenuActionBtn data={params.row} index={params.row.id} />;
        },
      },
      
    ]
    //*
    //   const company_master = props?.login?.login?.user?.rights.find(
    //     (o) => o.page.name === "company_master"
    //   );
    //*
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("account_type");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  
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
      props.getPaymentMasterPage(data);
    };
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = props?.paymentMaster?.paymentMaster?.data?.map(
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
              props?.paymentMaster?.paymentMaster?.data?.length
          )
        : 0;
  
    const rows = ["hello"];
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
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rowsCopy}
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
          paymentMaster: state.paymentMaster,
        };
      };
      
      const mapDispatchToProps = (dispatch) => {
        return {
          getPaymentMasterPage: (data) => dispatch(getPaymentMasterPage(data)),
        };
      };
      export default connect(mapStateToProps, mapDispatchToProps)(PaymentTable);







