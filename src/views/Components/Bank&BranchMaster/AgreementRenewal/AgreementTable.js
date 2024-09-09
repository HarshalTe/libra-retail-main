import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Button } from "@material-ui/core";
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

//*Select
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from '@mui/x-data-grid';


//* Actions
import { getAgreementRenewal } from "../../../../Redux/Creators/AgreementRenewalCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateBankRenewal from "./CreateBankRenewal";
import ViewAgreement from "./ViewAgreement";
import ViewRateCard from "./ViewRateCard";
import RenewAgreement from "./RenewAgreement";
import RenewalClosed from "./RenewalClosed";

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
    idfield:"bank_name",

    labelheaderName:"Bank Name",
  },
  {
    idfield:"end_date",

    labelheaderName:"Agreement renewal date",
  },
  {
    idfield:"aggrement_copy",

    labelheaderName:"Aggrement Copy",
  },
  {
    idfield:"rate_card",

    labelheaderName:"Rate Card",
  },
  {
    idfield:"select",

    labelheaderName:"Select",
  },
  {
    idfield:"actions",

    labelheaderName:"Actions",
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
  const { numSelected, pageno, pageSize, selected, aggreement_page } = props;

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
        <div className="d-flex">
          {aggreement_page.create_status == "1" ? <CreateBankRenewal /> : ""}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function AgreementTable(props) {
  //*
  const aggreement_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "aggreement_page"
  );
  //*
const [selectionModel, setSelectionModel] = React.useState([]); 
  
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [actionSelect, setActionSelect] = React.useState("Renew");

  const handleActionSelectChange = (event) => {
    setActionSelect(event.target.value);
  };

  const columns2 = [
    {
      field: "bank_name",
      width: 160,

      renderCell: (params) => {
        // console.log(params,"mmm")
        return params.row?.bank?.bank_name
      },
      headerName: "Bank Name",
    },
    {
      field: "type",
      width: 160,

      headerName: "Agreement Type",
    },
    {
      field: "end_date",
      width: 160,

      headerName: "Agreement renewal date",
    },
    {
      field: "aggrement_copy",
      headerName: "Aggrement Copy",
      disableExport: true,
      width: 160,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <ViewAgreement data={params} />
      },
    },
      {field: "rate_card",
    headerName: "Rate Card",
    disableExport: true,
    width: 160,

    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (row) => {
      return <ViewRateCard data={row} />
    },
    },
  //     {field: "select",
  //   headerName: "Select",
  //   disableExport: true,
  //   width: 160,
  //   // style:{width: 200},
  //   sortable: false,
  //   headerAlign: "center",
  //   justifyContent: 'flex-start',
  //   align: "center",
  //   disableClickEventBubbling: true,
  //   renderCell: (row) => {
  //     return <TableCell align="center" padding="none">
  //     {aggreement_page.update_status == "1" ? (
  //       <Select
  //         labelId="demo-simple-select-label"
  //         id="demo-simple-select"
  //         value={actionSelect}
  //         label="Select"
  //         size="small"
  //         onChange={handleActionSelectChange}
  //       >
  //         <MenuItem value={"Renew"}>Renew</MenuItem>
  //         <MenuItem value={"Close"}>Close</MenuItem>
  //       </Select>
  //     ) : (
  //       ""
  //     )}
  //   </TableCell>
  //   },
  // },

    
      {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 160,
    // style:{width: 200},
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (row) => {
      return <TableCell align="center" padding="none">
      {aggreement_page.update_status == "1" ? (
        <div className="d-flex">
              <RenewAgreement data={row.row} />
            <RenewalClosed data={row.row} />
          {/* {actionSelect == "Renew" ? (
            <RenewAgreement data={row.row} />
          ) : (
            <RenewalClosed data={row.row} />
          )} */}
        </div>
      ) : (
        <div></div>
      )}
    </TableCell>
    },
  },
  ];

  const rows2 = props?.agreements?.agreements?.isLoading
? []
: props.agreements.agreements?.length > 0
  ? props.agreements.agreements?.filter((pur)=>{
    // console.log("hhhhhh",filter, pur?.company_detail)
    return(
      (props.searchTerm
        ? pur?.bank?.bank_name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur)
    )
  })
  : [];
console.log(props, "hhhhhh")
  React.useEffect(() => {
    fetchData(page);
  }, []);

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
    props.getAgreementRenewal(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.agreements?.agreements?.map((row) => row);
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
          (1 + page) * rowsPerPage - props?.agreements?.agreements?.length
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selected}
        aggreement_page={aggreement_page}
        // aggreement_page={aggreement_page}
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
     
      {/* <TablePagination
        rowsPerPageOptions={[1, 10, 20]}
        component="div"
        count={props?.agreements?.agreements?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    agreements: state.agreements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAgreementRenewal: (data) => dispatch(getAgreementRenewal(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AgreementTable);
