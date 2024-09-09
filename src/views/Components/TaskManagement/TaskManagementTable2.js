import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//* Actions
import { getTasksList } from "../../../Redux/Creators/TaskCreators";
import { getUsersList } from "../../../Redux/Creators/UsersCreators";
//*Compoenets
import CreateTaskManagement from "./CreateTaskManagement";
import TaskManagementDeleteAll from "./TaskManagementDeleteAll";
import EditTaskManagement from "./EditTaskManagement";
import { DataGrid } from '@mui/x-data-grid';
import Badge from "@material-ui/core/Badge";

const EnhancedTableToolbar = (props) => {
    const { numSelected, pageno, pageSize, selected, task_management } = props;
  
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
            {task_management.delete_status == "1" ? (
              <TaskManagementDeleteAll data={{ pageno, pageSize, selected }} />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="d-flex">
            {task_management.create_status == "1" ? (
              <CreateTaskManagement data={{ pageno, pageSize }} />
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
  
  function TaskManagementTable2(props) {
  
  const [selectionModel, setSelectionModel] = React.useState([]);
console.log("object1112",props)
    const rows2 = props.tasks?.isLoading
    ? []
    : props.tasks?.tasks?.tasks?.data?.length > 0
    ? props?.login?.login?.user.role == "admin"
    ? props.tasks?.tasks?.tasks?.data.filter((pur)=>{
      return(
        (props.searchTerm
          ? pur?.task_name
         ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
        : pur) ||
        (props.searchTerm
          ? pur?.task_details
         ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
        : pur) ||
        (props.searchTerm
          ? pur?.assigned_by
         ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
        : pur) ||
        (props.searchTerm
          ? pur?.assigned_to
         ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
        : pur) ||
        (props.searchTerm
          ? pur?.deadline_date
         ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
        : pur) ||
        (props.searchTerm
          ? pur?.status
         ?.toLowerCase().includes(props.searchTerm.trim().toLowerCase())
        : pur)
      )
    })
    : props.tasks?.tasks?.tasks?.data.filter((item) => {
      return (
        (item?.assigned_to?.id == props?.login?.login?.user?.id
    ))
  })
    : [];
    console.log(rows2,"hhhhhh",props.tasks?.tasks?.tasks)
  
    const columns2 = [
      {
        field: "task_name",
        width:158,
        headerName: "Task Name",
        headerAlign: "center",
        align: "center",
      },
    
      {
        field: "task_details",
        width:158,
        headerName: "Task Detail",
        headerAlign: "center",
        align: "center",
      },
    
      {
        field: "assigned_by",
        width:158,
        headerName: "Assigned By",
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => value?.name 
      },
      {
        field: "assigned_to",
        width:158,
        headerName: "Assigned To",
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => value?.name 
      },
      {
        field: "deadline_date",
        width:158,
        headerName: "Deadline",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        width:80,
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          console.log(params,"mmm")
          if (params.row.status == 1) {
            return<Badge
            color="primary"
            variant="dot"
            ></Badge>
            
          } else {
            return  <Badge
            color="error"
            variant="dot"
            ></Badge>
          }
        }
        
      },
      {field: "actions",
        headerName: "Actions",
        disableExport: true,
        width: 70,
        sortable: false,
        headerAlign: "center",
        justifyContent: 'flex-start',
        align: "center",
        disableClickEventBubbling: true,
        renderCell: (data) => {
          return <>
          {task_management.update_status===1?(
            <EditTaskManagement data={data.row} index={data.row.id}
          data2={{
            pageno: page + 1,
            pageSize: rowsPerPage,
          }}/> 
          ):("")}
          </>
        },
      },
      
    ]
  
    let task_management = props?.login?.login?.user?.rights?.find(
      (o) => o.page.name == "task_management"
    );
    const [page, setPage] = React.useState(0);
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
        pageno: 1,
        pageSize: 1000000,
        token: token,
      };
      props.getTasksList(data);
      props.getUsersList(data);
    };
  
    return (
      <Box sx={{ width: "100%" }}>
            <EnhancedTableToolbar
              numSelected={selectionModel.length}
              pageno={page + 1}
              pageSize={rowsPerPage}
              selected={selectionModel}
              task_management={task_management}
            />
        <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows2}
          loading={props?.tasks?.isLoading ? true : false}
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
            projects: state.projects,
            tasks: state.tasks,
          };
        };
        
        const mapDispatchToProps = (dispatch) => {
          return {
            getTasksList: (data) => dispatch(getTasksList(data)),
            getUsersList: (data) => dispatch(getUsersList(data)),
          };
        };
        export default connect(
          mapStateToProps,
          mapDispatchToProps
        )(TaskManagementTable2);
        