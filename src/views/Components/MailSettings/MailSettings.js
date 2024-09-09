import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Input,
  Form,
} from "reactstrap";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getMailTypeMasterPage } from '../../../Redux/Creators/MailTypeCreators';
import { mailtypeMasterDeleteAll } from '../../../Redux/Creators/MailTypeCreators';
import { getMailTimeMasterPage } from '../../../Redux/Creators/MailTimeCreators';
import { mailtimeMasterDeleteAll } from '../../../Redux/Creators/MailTimeCreators';
import CreateMailType from './CreateMailType';
import CreateMailTime from './CreateMailTime';
import EditMailType from './EditMailType';
import EditMailTime from './EditMailTime';
import DeleteButton from '../../../Helpers/DeleteButton';



function MailSettings(props) {
  const [modal, setModal] = useState(false);
  const token = props.login?.login?.token;
  React.useEffect(() => {
    let data = {
      token:token
    }
    props.getMailTypeMasterPage(data);
    props.getMailTimeMasterPage(data);
  }, []);
  const toggle = () => {
    setModal(!modal);
  };
  const columns = [
    { field: 'type', headerName: 'Type', width: 90 },
    { field: 'content', headerName: 'Content', width: 90 },
    {field: "actions",
    headerName: "Actions",
    disableExport: true,
      width: 180,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      // align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return(
          <div className="d-flex">
        <EditMailType data={params.row}/>
        <DeleteButton
      id={params.row.id}
      deleteFunction={() => props.mailtypeMasterDeleteAll(params.row.id, token)}
      /> 
      </div>
      )
      },
    }
    

  ];
  const columns2 = [
    { field: 'type', headerName: 'Mail Type', width: 90 ,
    renderCell: (row) => {
      return row.row?.mail_type?.type
    }},
    { field: 'time', headerName: 'Time', width: 90 },
    {field: "actions",
    headerName: "Actions",
      disableExport: true,
      width: 180,
      // style:{width: 200},
      sortable: false,
      headerAlign: "center",
      justifyContent: 'flex-start',
      // align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return(
          <div className="d-flex">
            <EditMailTime data={params.row}/>
        <DeleteButton
      id={params.row.id}
      deleteFunction={() => props.mailtimeMasterDeleteAll(params.row.id, token)}
      /> 
      </div>
      )
      },
    }

  ];
  
  const rows2 = props.mailTime?.isLoading
  ? []
  : props.mailTime?.mailTime?.length > 0
  ? props.mailTime?.mailTime
  : [];
  const rows = props.mailType?.isLoading
  ? []
  : props.mailType?.mailType?.length > 0
  ? props.mailType?.mailType
  : [];


  return (
    <>
      <div className="container-fluid">
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col md={9}>
              <strong>Mail Setting</strong>
            </Col>
            <Col md={3}>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <div className="d-flex">
    <Box className="mr-2" sx={{ height: 400, width: '50%' }}>
    <CardHeader className="bg-info text-white">
          <Row>
            <Col md={9}>
              <strong>Mail Type</strong>
            </Col>
            <Col md={3}>
              <CreateMailType/>
            </Col>
          </Row>
        </CardHeader>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
          <Box sx={{ height: 400, width: '50%' }}>
          <CardHeader className="bg-info text-white">
          <Row>
            <Col md={9}>
              <strong>Mail Time Slot</strong>
            </Col>
            <Col md={3}>
              <CreateMailTime/>
            </Col>
          </Row>
        </CardHeader>
      <DataGrid
        rows={rows2}
        columns={columns2}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
          </div>
          {/* <MisTable2 /> */}
        </CardBody>
      </Card>
    </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    mailTime: state.mailTime,
    mailType: state.mailType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMailTimeMasterPage: (data, token) => dispatch(getMailTimeMasterPage(data, token)),
    getMailTypeMasterPage: (data, token) => dispatch(getMailTypeMasterPage(data, token)),
    mailtimeMasterDeleteAll: (data, token) => dispatch(mailtimeMasterDeleteAll(data, token)),
    mailtypeMasterDeleteAll: (data, token) => dispatch(mailtypeMasterDeleteAll(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailSettings);
