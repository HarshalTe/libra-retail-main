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

function NpaProperties(props) {

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

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const token = props.login?.login?.token;
    let users = {
      token: token,
      pageno: 1,
      pageSize: 100000,
    };
    let data = {
      project_id: values.project_id,
      customer_name: values.customer_name,
      bank_name: values.bank_name,
        wing_detail: values.wing_detail,
        rera_carpet_area: values.rera_carpet_area,
        unit_no: values.unit_no,
        rate: values.rate,
        final_value: values.final_value,
        parking_details: values.parking_details,
        parking_no: values.parking_no,
        other_amenities: values.other_amenities,
        total_value: values.total_value,
        notice_file_upload: values.notice_file_upload,
      
    };

    
    
    postNpaProperties(data, users);
    setSubmitting(true);
    setModal(false);
  };
  const postNpaProperties = (data, users) => {
    console.log("Search User Data", data);
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + users.token,
    });
  
    return fetch(baseUrl + "npa", {
      method: "post",
      headers: myheader,
      body: JSON.stringify(data),
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
        console.log("npa data", users);
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
          // "margin": "-15px 0 -6px 0",          
          // "padding": "0 48px"
        }}
          onClick={() => toggle()}
        >
        <i className="" aria-hidden="true"></i>Add NPA Properties
        </div>
      {/* <Tooltip title="Add NPA Properties" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          Add NPA Properties
        </Button>
      </Tooltip> */}
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add NPA Properties in this Project</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              project_id: props.data.id,
              customer_name: "",
              bank_name: "",
              wing_detail: "",
              rera_carpet_area: "",
              unit_no: "",
              rate: "",
              final_value: "",
              parking_details: "",
              parking_no: "",
              other_amenities: "",
              total_value: "",
              notice_file_upload: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
               <Form>
                {console.log("formProps",formProps.values)}
                <Row>
                <Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Project ID"
    id="project_id"
    name="project_id"
    value={formProps.values.project_id}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Customer Name"
    id="customer_name"
    name="customer_name"
    value={formProps.values.customer_name}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Bank Name"
    id="bank_name"
    name="bank_name"
    value={formProps.values.bank_name}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Wing Detail"
    id="wing_detail"
    name="wing_detail"
    value={formProps.values.wing_detail}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="RERA Carpet Area"
    id="rera_carpet_area"
    name="rera_carpet_area"
    value={formProps.values.rera_carpet_area}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Unit Number"
    id="unit_no"
    name="unit_no"
    value={formProps.values.unit_no}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Rate"
    id="rate"
    name="rate"
    value={formProps.values.rate}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Final Value"
    id="final_value"
    name="final_value"
    value={formProps.values.final_value}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Parking Details"
    id="parking_details"
    name="parking_details"
    value={formProps.values.parking_details}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Parking Number"
    id="parking_no"
    name="parking_no"
    value={formProps.values.parking_no}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Other Amenities"
    id="other_amenities"
    name="other_amenities"
    value={formProps.values.other_amenities}
    onChange={formProps.handleChange}
  />
</Col>

<Col md={4} className="pb-4">
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Total Value"
    id="total_value"
    name="total_value"
    value={formProps.values.total_value}
    onChange={formProps.handleChange}
  />
</Col>
<Col md={4} className="pb-4">
<Label>Notice File Upload</Label>
  <TextField
    fullWidth
    type="file"
    variant="outlined"
    size="small"
    // label="Notice File Upload"
    id="notice_file_upload"
    name="notice_file_upload"
    value={formProps.values.notice_file_upload}
    onChange={formProps.handleChange}
  />
</Col>
             
               </Row>
               {/* <input type="file" accept="image/*" multiple onChange={handleFileChange} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(NpaProperties);
