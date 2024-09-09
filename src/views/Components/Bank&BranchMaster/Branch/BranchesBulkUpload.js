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
import Swal from "sweetalert2";


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
import { baseUrl } from "../../../../shared/baseURL";
import axios from "../../../../shared/axios";
import { getBranchesPage } from "Redux/Creators/BranchesCreators";

//*Actions

function BranchesBulkUpload(props) {

  const [modal, setModal] = useState(false);
  const toggle = () =>{
    // handleFileChange()
    setModal(!modal)
};
  console.log("Values In Upload file:", props);


const [filePreviews, setFilePreviews] = useState([]);
const [file, setFile] = useState([]);
  const [captions, setCaptions] = useState([]);

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
          setCaptions(captions);
        }
      };

      reader.readAsDataURL(selectedFiles[i]);
    }
  };

  const handleCaptionChange = (index, event) => {
    const newCaptions = [...captions];
    newCaptions[index] = event.target.value;
    setCaptions(newCaptions);
  };

  const handleSubmit = (event,values) => {
    event.preventDefault();
    console.log("objectevent",event,values)
    // Call API to upload files and captions
  };
  const users = {
    id: props?.data,
    // id: 14,
    token: props?.login?.login?.token
  };
  
  const postDocumentProject = (data, users) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + users.token,
      },
    };
  
    return axios
      .post("/branches-upload", data, config)
      .then((response) => {
        console.log(response.data);
        // dispatch(addProduct(product.Product));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Branches!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            // Handle dismissal if needed
          }
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle errors here
      });
  };
  
  const handleSubmitPut = (values, { setSubmitting }) => {
    const data = new FormData();
    data.append(`file`, values.file);
    // data.append(`project_id`, props?.data);
    console.log("Data Post:", data, users, values);
    
    // Assuming `users` is accessible here
    postDocumentProject(data, users)
      .then(() => {
        setSubmitting(true);
        setModal(false);
        let data = {
          pageno: 1,
          pageSize: 1000000,
          token: users.token,
        };
        props.getBranchesPage(data);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error submitting:", error);
      });
  };
   
  console.log("objectevent",captions,filePreviews,file)
  return (
    <div>
      <Tooltip title="Bulk Upload" placement="left">
      <Button
              variant="contained"
              color="error"
              size="small"
              className="ml-3"
              onClick={() => toggle()}
            >
              Excel Upload
            </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>New Project Bulk Upload</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              file:"",
            }}
            onSubmit={handleSubmitPut}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
               <Form>
                {console.log("formProps",formProps.values)}
                {/* <Row>

               {filePreviews.map((preview, index) => (
                <Col md={6}>
                 <div key={index}>
                   <img src={preview} alt={`File Preview ${index}`} style={{ "width": '24vw',"height":'24vw' }} />
                   <input type="text" placeholder="Enter caption" value={captions[index]} onChange={(event) => handleCaptionChange(index, event)} />
                 </div>
                </Col>
               ))}
               </Row> */}
               <Row className="pt-4 pd-4">
               <Col md={6}>
               <TextField
                        fullWidth
                        name="file"
                        size="small"
                        variant="outlined"
                        // margin="normal"
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "file",
                            e.currentTarget.files[0]
                          );
                        }}
                        type="file"
                        error={
                          formProps.touched.file &&
                          Boolean(formProps.errors.file)
                        }
                        helperText={
                          formProps.touched.file && formProps.errors.file
                        }
                      />
               {/* <input type="file" accept="file/*" multiple onChange={handleFileChange} /> */}
               </Col>
               <Col md={6}>
               <a href="https://lvpl.in/librabackend/storage/app/public/Demo/Branches.xlsx">
               <Button
          variant="outlined"
          color="info"
          // background="info"
          size="small"
          className="ml-4 "
          startIcon={<CloudUploadIcon fontSize="medium" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Download Branches Demo Excel
        </Button>
               </a>
               </Col>
                </Row>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBulkUpload);
