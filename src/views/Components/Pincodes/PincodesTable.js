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
import { DataGrid } from "@mui/x-data-grid";

//* Actions
import { getPincodesPage, deletePincode } from "../../../Redux/Creators/PincodeCreators";
//*Components
import DeletePincodes from "./DeletePincodes";
import BulkUploadPincodes from "./BulkUploadPincodes";
import PincodeMasterEdit from "./PincodeMasterEdit";
import ViewPincodeFile from "./ViewPincodeFile";

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
    id: "pincode",
    numeric: false,
    disablePadding: false,
    label: "Pincode",
  },
  {
    id: "instructions",
    numeric: false,
    disablePadding: false,
    label: "Instructions",
  },
  {
    id: "instruction_type",
    numeric: false,
    disablePadding: false,
    label: "Type of Instructions",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
              "aria-label": "select all",
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
  const { numSelected, pincode_master, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div"></Typography>
      )}

      {numSelected > 0 ? (
        <div className="d-flex">
          {pincode_master.delete_status == "1" && <DeletePincodes data={{ selected }} />}
        </div>
      ) : (
        <div className="d-flex">
          {pincode_master.create_status == "1" && <BulkUploadPincodes />}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function PincodeMasterTable(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('pincode');
  const [selected, setSelected] = React.useState([]);

  const token = props.login?.login?.token;
  let pincode_master = props?.login?.login?.user?.rights?.find((o) => o.page.name == "pincode_master");

  const rows2 = props.pincodes?.isLoading
    ? []
    : props.pincodes?.pincodes?.data?.length > 0
    ? props.pincodes?.pincodes?.data.filter((pur) =>
        (props.searchTerm
          ? pur?.pincode.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
        (props.searchTerm
          ? pur?.instructions.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur) ||
        (props.searchTerm
          ? pur?.instruction_type.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
          : pur)
      )
    : [];

  const columns2 = [
    { field: "pincode", headerName: "Pincode", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "instructions", headerName: "Instructions", width: 150 },
    { field: "instruction_type", headerName: "Type of Instructions", width: 200 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      disableExport: true,
      width: 220,
      sortable: false,
      headerAlign: "center",
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <>
          {pincode_master.update_status == "1" && (
            <PincodeMasterEdit
              data={params.row}
              index={params.row.id}
              data2={{
                pageno: page + 1,
                pageSize: pageSize,
              }}
            />
          )}
          {pincode_master.update_status == "1" && (
            <ViewPincodeFile
              data={params}
              index={params.row.id}
              data2={{
                pageno: page + 1,
                pageSize: pageSize,
              }}
            />
          )}
        </>
      ),
    },
  ];
  console.log(page, pageSize,"getPincodesPage")

  React.useEffect(() => {
    fetchData(page, pageSize);
  }, []);

  const fetchData = (page, pageSize) => {
    const token = props.login?.login?.token;
    let pageno = page + 1;
    let data = {
      pageno: pageno,
      pageSize: pageSize,
      token: token,
    };
    props.getPincodesPage(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows2.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handlePageChange = (params) => {
    setPage(params);
    fetchData(params, pageSize);
    
  };
  
  const handlePageSizeChange = (params) => {
    setPageSize(params);
    fetchData(page, params);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = pageSize - Math.min(pageSize, rows2.length - page * pageSize);

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar numSelected={selected.length} pincode_master={pincode_master} selected={selected} />
      <Box sx={{ height: 550, width: "100%" }}>
        <DataGrid
          loading={props?.pincodes?.isLoading ? true : false}
          rows={rows2}
          columns={columns2}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          pagination
          paginationMode="server"
          rowCount={props.pincodes?.pincodes?.total || 0}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
}

PincodeMasterTable.propTypes = {
  getPincodesPage: PropTypes.func.isRequired,
  deletePincode: PropTypes.func.isRequired,
  pincodes: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
};

const mapStateToProps = (state) => ({
  pincodes: state.pincodes,
  login: state.login,
});

export default connect(mapStateToProps, { getPincodesPage, deletePincode })(PincodeMasterTable);
