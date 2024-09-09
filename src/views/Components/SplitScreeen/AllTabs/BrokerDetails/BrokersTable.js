import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DataGrid } from '@mui/x-data-grid';
//* Actions
import { getBrokers } from "../../../../../Redux/Creators/BrokersCreators";

//*Compoenets

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
            {/* <BrokersDeleteAll data={{ pageno, pageSize, selected }} /> */}
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

  const rows = props.brokers?.isLoading
  ? []
  : props.brokers?.brokers?.data?.length > 0
  ? props.brokers?.brokers?.data
  : [];

  const columns = [
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
  ]
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
        loading={props.brokers?.isLoading ? true : false}
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
