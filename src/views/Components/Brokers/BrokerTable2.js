import * as React from "react";
import{ useState,useEffect} from "react"
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
import { getBrokers } from "../../../Redux/Creators/BrokersCreators";
import {
    Card,
    CardHeader,
    CardBody,
    // Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label,
    InputGroup,
    CardFooter,
    ModalFooter,
  } from "reactstrap";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import CreateBroker from "./CreateBroker";
import EditBroker from "./EditBroker";
import BrokersDeleteAll from "./BrokersDeleteAll";


function BrokerTable2(props) {
  const [pageSize, setPageSize] = React.useState(10);

  const viewStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.view == 1
      ? true
      : false;

  const deleteStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.delete == 1
      ? true
      : false;

  const updateStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.update == 1
      ? true
      : false;
  const createStatus =
    props.login?.login?.user?.role == "admin"
      ? true
      : props.login?.login.user?.actions?.length > 0 &&
        props.login?.login.user?.actions[1]?.create == 1
      ? true
      : false;

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     {
//       field: "created_date",
//       headerName: "Created Date",
//       flex: 1,
//     },

//     { field: "group_name", headerName: "Group Name", flex: 1 },
//     { field: "company_name", headerName: "Company Name", flex: 1 },
//     { field: "mobile_number", headerName: "Phone Number", flex: 1 },
//     { field: "iec_no", headerName: "IEC Number", flex: 1 },
//     { field: "customer_type", headerName: "Customer Type", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       disableClickEventBubbling: true,
//       renderCell: (params) => {
//         console.log(params)
//         return <ActionSupplier data={params.row} index={params.row.id} />;
//       },
//     },
//   ];
const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    // { field: 'pincode', headerName: 'Pincode', width: 400 },
    // { field: 'instructions', headerName: 'Instructions', width: 500 },
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
    // {field: "actions",
    //   headerName: "Actions",
    //   disableExport: true,
    //   width: 120,
    //   // style:{width: 200},
    //   sortable: false,
    //   headerAlign: "center",
    //   justifyContent: 'flex-start',
    //   // align: "center",
    //   disableClickEventBubbling: true,
    //   renderCell: (data) => {
    //     console.log(data,"eeeeeeee")
    //     return <EditBroker
    //     data={data.row}
    //   />; 
    //     // return <MenuActionBtn data={params.row} index={params.row.id} />;
    //   },
    // }
    {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          console.log(params)
          return <EditBroker data={params.row} index={params.row.id} />;
        },
      },
  ]

//   const rows = props.brokers?.brokers?.isLoading ? [] : props.brokers.brokers;
const rows = props.brokers?.brokers?.data?.isLoading
? []
: props.brokers?.brokers?.data?.length > 0
? props.brokers?.brokers?.data
: [];

  let data2 = {
    token: props.login?.login?.token,
  };
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // props.getBrokers(data2);
    // props.cityGetData(data2);
    // props.countryGetData(data2);
    // props.stateGetData(data2);
  }, []);

  // const { data } = useDemoData({
  //   dataSet: "Supplier",
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

//   const handleSubmit = (values, { setSubmitting }) => {
//     console.log("values in Supplier:", values);

//     let user = {
//       customer_type: values.customer_type,
//       company_name: values.company_name,
//       group_name: values.group_name,
//       mobile_number: values.phone.toString(),
//       iec_no: values.iec_no,
//       contact_person: values.contact_person,
//       contact_number: values.contact_number,
//       psic_cost: values.psic_cost,
//       psic_type: values.psic_type,
//       details: values.address,
//     };

//     console.log("Data of Supplier:", user);
//     props.onPostSupplierData(data2, user, toggle, setSubmitting);
//     setSubmitting(true);
//     return;
//   };

  return (
    <Card className="p-3 w-100">
     
      <CardBody style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // {...data}
          loading={props.suppiler?.isLoading ? true : false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          
          checkboxSelection
          disableSelectionOnClick
          // isRowSelectable={(params) => params.row.size < 50}

          // autoPageSize
          autoHeight
        />
      </CardBody>
    </Card>
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
  export default connect(mapStateToProps, mapDispatchToProps)(BrokerTable2);