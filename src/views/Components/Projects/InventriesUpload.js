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
import { editProjectsDataTablePhotos } from "../../../Redux/Creators/ProjectsCreators";
import { editProjectsDataTable } from "../../../Redux/Creators/ProjectsCreators";
import { baseUrl } from "../../../shared/baseURL";
import Swal from "sweetalert2";

//*Actions

function InventriesUpload(props) {

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
    token: props?.login?.login?.token
  };
  const handleSubmitPut = async (values) => {
    try {
      const data = new FormData();
      if (file) {
        for (let i = 0; i < file.length; i++) {
          console.log(`file[${i}]`, file[i])
          data.append(`file[${i}]`, file[i]);
        }
      }
      // data.append(`captions`,captions);
      // data.append(`_method`, "put");
      console.log("Data Post:", data, users);
      await postInvetriesProject(data, users);
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  };  

  const postInvetriesProject = (data, users) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + users.token,
    });
  
    return fetch(baseUrl + "inventory-upload", {
      method: "post",
      headers: myheader,
      body: (data),
      // body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Project!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
          }
        });
      })
      .catch((error) => console.log(error));
  };


  
  console.log("objectevent",captions,filePreviews,file)
  return (
    <div>
        <div
         style={{
          // "font-family": "Roboto, Helvetica, Arial, sans-serif",
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
          onClick={() => toggle()}
        >
          <i className="" aria-hidden="true"></i>Upload Inventries
        </div>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Inventries</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              file_upload:"",
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
                                variant="outlined"
                                type="file"
                                size="small"
                                id="file_upload"
                                name="file_upload"
                                value={formProps.values.file_upload}
                                onChange={formProps.handleChange}
                                error={
                                  formProps.touched.file_upload &&
                                  Boolean(formProps.errors.file_upload)
                                }
                                helperText={
                                  formProps.touched.file_upload &&
                                  formProps.errors.file_upload
                                }
                              />
               </Col>
               <Col md={6}>
               <a href="https://lvpl.in/librabackend/storage/app/public/Demo/inventories.csv">
               <Button
          variant="outlined"
          color="info"
          // background="info"
          size="small"
          className="ml-4 "
          startIcon={<CloudUploadIcon fontSize="medium" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Demo Excel
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
    editProjectsDataTablePhotos: (data, users) =>
    dispatch(editProjectsDataTablePhotos(data, users)),
    editProjectsDataTable: (data, user) =>
    dispatch(editProjectsDataTable(data, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventriesUpload);
