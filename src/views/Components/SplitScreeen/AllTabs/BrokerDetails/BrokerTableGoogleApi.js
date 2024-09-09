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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import ViewExternalDataUpload from "./View";
// import EditUnderConstructProjects from "./Edit";
// import Actions from "./Actions";

//* Actions
// import { getBrokersApiList } from "../../../../../Redux/Creators/GoogleApiCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
// import CreateBroker from "./CreateBroker";
// import EditBroker from "./EditBroker";
// import BrokersDeleteAll from "./BrokersDeleteAll";
import BrokerMap from "./BrokerMap";
import { useEffect } from "react";
import { useState } from "react";

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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







const headCells = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "about",
    numeric: false,
    disablePadding: false,
    label: "About",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "dealing_in",
    numeric: false,
    disablePadding: false,
    label: "Dealing In",
  },
  {
    id: "rera_no",
    numeric: true,
    disablePadding: false,
    label: "Rera No.",
  },
  {
    id: "nar_no",
    numeric: false,
    disablePadding: false,
    label: "NAR NO.",
  },
  {
    id: "tread_no",
    numeric: false,
    disablePadding: false,
    label: "Tread No.",
  },
  {
    id: "propertyforsell",
    numeric: true,
    disablePadding: false,
    label: "Property For Sell",
  },
  {
    id: "propertyforrent",
    numeric: false,
    disablePadding: false,
    label: "Property For Rent",
  },
  {
    id: "serviceprovided",
    numeric: false,
    disablePadding: false,
    label: "Service provided",
  },
  {
    id: "expert_in",
    numeric: false,
    disablePadding: false,
    label: "Expert In",
  },
  {
    id: "operate_in",
    numeric: false,
    disablePadding: false,
    label: "Operate In",
  },
  {
    id: "operating_since",
    numeric: false,
    disablePadding: false,
    label: "Operating Since",
  },
  {
    id: "website",
    numeric: false,
    disablePadding: false,
    label: "Website",
  },
  {
    id: "mobile_no",
    numeric: false,
    disablePadding: false,
    label: "Mobile No.",
  },
  //   {
  //     id: "actions",
  //     numeric: false,
  //     disablePadding: false,
  //     label: "Actions",
  //   },
];

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
//   const { numSelected, pageno, pageSize, selected, broker_page } = props;

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
//         <div className="d-flex">
//           {/* {broker_page.delete_status == "1" ? (
//             <BrokersDeleteAll data={{ pageno, pageSize, selected }} />
//           ) : (
//             ""
//           )} */}
//         </div>
//       ) : (
//         <div className="d-flex">
//           {/* {broker_page.create_status == "1" ? (
//             <CreateBroker data={{ pageno, pageSize }} />
//           ) : (
//             ""
//           )} */}
//         </div>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

function BrokerTableGoogleApi(props) {
  //*broker page
  // console.log(props,"ssssssss")
  const[data, setData]=React.useState([])

  // comment
  // React.useEffect(()=>{
  //   fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=19.0760,72.8777&radius=1500&type=real_estate_agency&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q")
  //   .then((result)=>{ result.json()
  //     .then((resp)=>{ 
  //       setData(resp.results)
  //     console.warn("result", resp.results)
  //   })
  //   })

  // },[])

console.log(data,"ssssssssss")

 
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const rows = data

  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }

  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  // const rows = data?.isLoading
  //   ? []
  //   : data?.length > 0
  //   ? data
  //   : [];

  
  return (<>
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{fontSize:"20px"}}>
          Near BY Brokers
          <TableRow>
            <TableCell style={{fontSize:"20px"}}>Shop Name</TableCell>
            <TableCell align="left" >Address</TableCell>
            <TableCell align="left">Latitude</TableCell>
            <TableCell align="left">Longitude</TableCell>
            <TableCell align="left">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.vicinity}</TableCell>
              <TableCell align="left">{row.geometry?.location?.lat}</TableCell>
              <TableCell align="left">{row.geometry?.location?.lng}</TableCell>
              <TableCell align="left">{row.plus_code?.compound_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
    // getBrokersApiList: (data) => dispatch(getBrokersApiList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BrokerTableGoogleApi);
