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
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
//* Copyicon
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
//* Actions
import {
  getDeduceID,
  deducePostData,
} from "../../../../Redux/Creators/DeduceCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateCase from "./CreateCase";
import { Divider } from "@mui/material";

function createData(
  no_of_stories,
  amenities,
  configuration,
  lift,
  parking,
  building_age,
  authorities,
  area_range,
  project_name,
  date_range
) {
  return {
    no_of_stories,
    amenities,
    configuration,
    lift,
    parking,
    building_age,
    authorities,
    area_range,
    project_name,
    date_range,
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "application_no",
    numeric: true,
    disablePadding: false,
    label: "Application No",
  },
  {
    id: "customer_name",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "postal_address",
    numeric: false,
    disablePadding: false,
    label: "Postal Address",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "Cite",
  },

  {
    id: "copy",
    numeric: false,
    disablePadding: false,
    label: "Clone Photograph",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Clone Case",
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
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
  const { numSelected, pageno, pageSize, selected, data } = props;

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
          {/* <DeleteUnderConstructProjects data={{ pageno, pageSize, selected }} /> */}
        </div>
      ) : (
        <div className="d-flex">

          {/* <CreateCase data={data} /> */}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function DedupeTable(props) {
  console.log("project_id", props?.data);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("market_value");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
      project_id: props?.data?.project_id,
    };
    console.log("objectdata12",data)
    props.getDeduceID(data);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.deduce?.deduce?.properties?.map((row) => row);
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
          (1 + page) * rowsPerPage - props?.deduce?.deduce?.properties?.length
        )
      : 0;
      
      //*DedupeCase
  const dedupeCase = (id) => {
    const token = props.login?.login?.token;
    const user_id = props.login?.login?.user?.id;
    const employee_id = props.login?.login?.user?.id;
    const status = props.login?.login?.user?.status;

    let data = {
      ...props.data,
      property_id: id,
      token: token,
      user_id: user_id,
      employee_id: employee_id,
      status: status,
      is_photo_dedupe: checked==true?1:0,
    };

    console.log("dedupe data", data);
    
    props.deducePostData(data);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selected}
        data={props.data}
      />
      <TableContainer>
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
            rowCount={props?.deduce?.deduce?.properties?.length}
          />
          {props?.deduce?.isLoading ? (
            <TableBody>
              <TableCell
                colSpan={12}
                style={{ borderBottom: "none", padding: "0px" }}
              >
                <LinerLoader />
              </TableCell>
            </TableBody>
          ) : (
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(
                props?.deduce?.deduce?.properties,
                // rows,
                getComparator(order, orderBy)
              )
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
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
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}

                      <TableCell align="center" padding="none">
                        {row.application_no}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.customer_name}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.postal_address}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        {row.city}
                      </TableCell>
                      <TableCell align="center" padding="none">
                        No
                      <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      />
      Yes
                      </TableCell>
                      <TableCell align="center" padding="none">
                        <div className="d-flex">
                          <Tooltip title="Deduce" placement="left">
                            <Button
                              variant="contained"
                              color="info"
                              size="small"
                              className="p-1"
                              onClick={() => dedupeCase(row.id)}
                            >
                              <ContentCopyIcon fontSize="medium" />
                            </Button>
                          </Tooltip>
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
      {/* <TablePagination
        rowsPerPageOptions={[1, 10, 20]}
        component="div"
        count={props?.deduce?.deduce?.last_page}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        <Divider/>
      <h3 className="text-center">
      OR
      </h3>
        <Divider/>
      <CreateCase data={props.data} />
        <Divider/>
      {/* <DocumentsUpload/> */}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    deduce: state.deduce,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeduceID: (data) => dispatch(getDeduceID(data)),
    deducePostData: (data) => dispatch(deducePostData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DedupeTable);
