import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editCompanyDocument } from "../../../Redux/Creators/CompanyDocumentCreators";

function EditCompanyDocument(props) {
  const token = props.login?.login?.token;
  
  
const [filePreviews, setFilePreviews] = useState([]);
const [file, setFile] = useState([]);
console.log("props1121",props)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // const handleSubmit = (values, { setSubmitting }) => {
    
  //   let data = {
  //       id:props?.data?.id,
  //       company_detail_id:values.company_detail_id.id,
  //       company_detail:values.company_detail_id.company_detail,
  //       account: values.account,
  //       ifsc_code: values.ifsc_code,
  //       gstin: values.gstin,
  //       pan: values.pan,
  //       state_code: values.state_code,
  //       state: values.state,
  //       sac: values.sac,
  //       composition_scheme: values.composition_scheme,
  //       msme_no: values.msme_no,
  //       encl: values.encl,
  //   };
  //   console.log("Values In Upload file:",data, values);

  //   props.editCompanyDocument(data, token);
  //   setSubmitting(true);
  //   setModal(false);
  // };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const previews = [];
    const captions = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === selectedFiles.length) {
          setFilePreviews(previews);
          setFile(event.target.files);
        }
      };

      reader.readAsDataURL(selectedFiles[i]);
    }
  };
  const handleSubmit = (values, { setSubmitting }) => {
    
    const data = new FormData();
      if (file) {
        for (let i = 0; i < file.length; i++) {
          console.log(`photos[${i}]`, file[i])
          data.append(`photos[${i}]`, file[i]);
        }
      }
      data.append(`branch_master_id`,values.branch_master_id);
      data.append(`document_name`,values.document_name);
    console.log("Values In Upload file:",data, values);

    props.postCompanyDocument(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Libra Company Document" placement="right" className="m-2" style={{float:"right"}}>
      <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Libra Company Document</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
                // employee_id: props?.data?.employee_id,
                // company_detail_id: props?.data?.company_detail,
                // company_detail: props?.data?.company_detail,
                // account: props?.data?.account,
                // ifsc_code: props?.data?.ifsc_code,
                // gstin: props?.data?.gstin,
                // pan: props?.data?.pan,
                // state_code: props?.data?.state_code,
                // state: props?.data?.state,
                // sac: props?.data?.sac,
                // composition_scheme: props?.data?.composition_scheme,
                // msme_no: props?.data?.msme_no,
                // encl: props?.data?.encl
            //   file_upload:""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                {console.log("formProps",formProps.values)}
                <Col md={6} className="">
                  <Label>Branch Master</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        select
                        type="select"
                        size="small"
                        label="Branch Master"
                        id="branch_master_id"
                        name="branch_master_id"
                        value={formProps.values.branch_master_id}
                        onChange={formProps.handleChange}
                      >
                       <MenuItem value="">Select</MenuItem>
                      {props.branchMaster?.branchMaster?.map((user , id)=>{
                         return(
                        <MenuItem value={user.id}>{user?.company_detail?.company_detail}</MenuItem>
                        )
                      })}
                    </TextField>
                    </Col>
                    <Col md={6} className="">
                  <Label>Document Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="select"
                        size="small"
                        label="Document Name"
                        id="document_name"
                        name="document_name"
                        value={formProps.values.document_name}
                        onChange={formProps.handleChange}
                      >
                    </TextField>
                    </Col>
                    <Col md={6}>
                    <Label>Upload Document</Label>
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                </Col>
                  
              </Row>

                <Divider />

                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    companies: state.companies, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCompanyDocument: (data,token) => dispatch(editCompanyDocument(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyDocument);
