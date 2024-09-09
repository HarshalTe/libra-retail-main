import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Button } from "@material-ui/core";
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

//*download
import axios from "axios";
import fileDownload from "js-file-download";

//* Actions
import { getTechnicalPolicy } from "../../../Redux/Creators/TechnicalPolicyBank";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import TechPolicyCreate from "./TechPolicyCreate";
import TechPolicyFilter from "./TechPolicyFilter";
import TechnicalPolicyDelete from "./TechnicalPolicyDelete";
import DownloadMultiple from "./DownloadMultiple";
import PdfViewer from "./PdfViewer";
import pdf from "../../../assets/Libra_Valuers_21_aug_final_report.pdf";


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
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Type Date",
  },
  {
    id: "notification_no",
    numeric: true,
    disablePadding: false,
    label: "Notification No.",
  },
  {
    id: "subject",
    numeric: false,
    disablePadding: false,
    label: "Subject",
  },
  {
    id: "dept",
    numeric: false,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "branch_name",
    numeric: false,
    disablePadding: false,
    label: "Branch Name",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
  },

  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
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
  const { numSelected, pageno, pageSize, selected, technical_policy_page } =
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
          <DownloadMultiple data={{ pageno, pageSize, selected }} />
          {technical_policy_page.delete_status == "1" ? (
            <TechnicalPolicyDelete data={{ pageno, pageSize, selected }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          <TechPolicyFilter data={{ pageno, pageSize }} />
          {technical_policy_page.create_status == "1" ? (
            <TechPolicyCreate data={{ pageno, pageSize }} />
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

function TechPolicyTable(props) {
  //*
  const technical_policy_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "technical_policy_page"
  );

  //*
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("notification_no");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);
  const [selectionModel, setSelectionModel] = React.useState([]); 
  const [pageSize, setPageSize] = React.useState(10);

  const pdfUrl = process.env.PUBLIC_URL + ''; // Local PDF path



const rows2 = props?.techPolicy?.isLoading
? []
: props.techPolicy.techPolicy.data?.length > 0
  ? props.techPolicy.techPolicy.data?.filter((pur)=>{
    // console.log(pur?.application_no,props.searchTerm,"searchTerm")
    return(
      (props.searchTerm
        ? pur?.branch_name
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.notification_no
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.subject
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.city
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur) ||
      (props.searchTerm
        ? pur?.type
       ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
      : pur)
    )
  })
  : [];
console.log(rows2, "hhhhhh")
const columns2 = [
  {
    field: "date",
    headerName: "Type Date",
  },
  {
    field: "notification_no",
    headerName: "Notification No.",
  },
  {
    field: "subject",
    headerName: "Subject",
  },
  {
    field: "dept",
    headerName: "Department",
  },
  {
    field: "branch_name",
    headerName: "Branch Name",
  },
  {
    field: "city",
    headerName: "City",
  },

  {
    field: "type",
    headerName: "Type",
  },
  {field: "actions",
    headerName: "Actions",
    disableExport: true,
    width: 100,
    sortable: false,
    headerAlign: "center",
    justifyContent: 'flex-start',
    align: "center",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return <div className="d-flex">
        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          className="ml-3"
                          fullWidth
                          href={`https://lvpl.in/librabackend/storage/app/TechPolicy/${params.row.file}`}
                          alt=""
                          target="_blank"
                        >
                          View
                        </Button> 
        </div> 
    },
  },
];


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
    props.getTechnicalPolicy(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.techPolicy?.techPolicy?.data?.map(
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
          (1 + page) * rowsPerPage - props?.techPolicy?.techPolicy?.data?.length
        )
      : 0;

  //*download file
  function downloadFile(data) {
    axios
      .get(
        `https://lvpl.in/librabackend/storage/app/TechPolicy/${data}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        fileDownload(res.data, data);
      });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        technical_policy_page={technical_policy_page}
      />
              <div style={{ height: 650, width: '100%' }}>
              <DataGrid
                rows={rows2}
                columns={columns2}
                loading={props?.techPolicy?.isLoading ? true : false}
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

            <div>
            <h1>PDF Viewer</h1>
            <PdfViewer pdfUrl={pdf} />
        </div>
      
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    techPolicy: state.techPolicy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTechnicalPolicy: (data) => dispatch(getTechnicalPolicy(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TechPolicyTable);
