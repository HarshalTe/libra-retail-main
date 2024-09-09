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
import { getProjects } from "../../../Redux/Creators/ProjectsCreators";

//*Compoenets
import ProjectsDeleteAll from "./ProjectsDeleteAll";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import ProjectActionMenu from './ProjectActionMenu';
import CreateProjects from "./CreateProjects";
import ProjectBulkUpload from "./ProjectBulkUpload";


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



const headCells = [
  {
    id: "project_name",
    numeric: true,
    disablePadding: false,
    label: "Project Name",
  },

  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Project Address",
  },

  {
    id: "amenities",
    numeric: false,
    disablePadding: false,
    label: "Project Amenities",
  },
  {
    id: "localities",
    numeric: false,
    disablePadding: false,
    label: "Project Localities",
  },
  {
    id: "surrounding",
    numeric: false,
    disablePadding: false,
    label: "Project Surrounding",
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
        {headCells?.map((headCell) => (
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
  const { numSelected, pageno, pageSize, selected, project_page } = props;

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
          {project_page.delete_status === 1 ? (
            <ProjectsDeleteAll data={{ pageno, pageSize, selected }} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex">
          {project_page.create_status === 1 ? (
            <CreateProjects data={{ pageno, pageSize }} />
          ) : (
            ""
          )}

          {project_page.create_status === 1 ? (
            <ProjectBulkUpload data={{ pageno, pageSize }} />
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

function Project2Table(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);

  const rows = props?.projects?.isLoading
    ? []
    : props.projects.projects.data?.length > 0
    ? props.projects.projects.data
    : [];

  const columns2 = [
    {
      field: "project_name",
      width: 200,
      headerName: "Project Name",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "address",
      width: 240,
      headerName: "Project Address",
       headerAlign: "center",
      align: "center",
    },

    {
      field: "localities",
      width: 130,
      headerName: "Project Localities",
    },
    {
      field: "surrounding",
      width: 130,
      headerName: "Project Surrounding",
    },
    {
      field: 'actions',
      headerName: 'Actions',
      disableExport: true,
      width: 100,
      sortable: false,
      headerAlign: 'center',
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <ProjectActionMenu
            data={params}
            project_page={project_page}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        );
      },
    },
  ];

  const project_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "project_page"
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(10000);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(100);

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
    props.getProjects(data);
  };

  const handlePageChange = (params) => {
    setPage(params);
    fetchData(params, pageSize);
    
  };
  
  const handlePageSizeChange = (params) => {
    setPageSize(params);
    fetchData(page, params);
    console.log(page, pageSize,"getPincodesPage",params)
  };
  const rowsCopy = [...rows];
  const reversedRows = rowsCopy.reverse();
  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selectionModel.length}
        pageno={page + 1}
        pageSize={rowsPerPage}
        selected={selectionModel}
        project_page={project_page}
      />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          loading={props?.projects?.isLoading ? true : false}
          rows={reversedRows}
          columns={columns2}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = rows.filter((row) =>
              selectedIDs.has(row.id)
            );
            setSelectionModel(selectedRowData);
          }}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          rowCount={props.projects?.projects?.total || 0}
          onPageSizeChange={handlePageSizeChange}
          selectionModel={selectionModel}
          pagination
          paginationMode="server"
        />
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (data) => dispatch(getProjects(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Project2Table);
