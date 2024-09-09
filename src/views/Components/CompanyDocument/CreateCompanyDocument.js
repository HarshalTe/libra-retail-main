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
import { postCompanyDocument } from "../../../Redux/Creators/CompanyDocumentCreators";

function CreateCompanyDocument(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  
const [filePreviews, setFilePreviews] = useState([]);
const [file, setFile] = useState([]);
  const toggle = () => setModal(!modal);
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
      <Tooltip title="Add Libra Company Document" placement="right" className="m-2" style={{float:"right"}}>
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Create Libra Company Document
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Libra Company Document</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              branch_master_id: "",
              document_name: "",
              file_name: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   pincode: Yup.string().required("Pincode is required"),
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                
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
                    <input type="file" multiple onChange={handleFileChange} />
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
    branchMaster: state.branchMaster,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postCompanyDocument: (data,token) => dispatch(postCompanyDocument(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyDocument);
