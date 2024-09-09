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

function InventriseProperties(props) {

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
      is_npa: values.is_npa,
      is_negative: values.is_negative,
      project_id: values.project_id,
        wing_detail: values.wing_detail,
        rera_carpet_area: values.rera_carpet_area,
        unit_no: values.unit_no,
        rate: values.rate,
        final_value: values.final_value,
        parking_details: values.parking_details,
        parking_no: values.parking_no,
        other_amenities: values.other_amenities,
        total_value: values.total_value,
      
    };

    
    
    postInventoriesProperties(data, users);
    setSubmitting(true);
    setModal(false);
  };
  const postInventoriesProperties = (data, users) => {
    console.log("Search User Data", data);
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + users.token,
    });
  
    return fetch(baseUrl + "inventories", {
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
        console.log("inventories data", users);
      })
      .catch((error) => console.log(error));
  };
 
  console.log("objectevent",captions,filePreviews,file)
  return (
    <div>
      <Tooltip title="Add Inventries Properties" placement="left">
        <Button
          variant="outlined"
          color="info"
          size="small"
          className="ml-2"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          Add Inventries Properties
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Inventries Properties</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              project_id: props.data.id,
        wing_detail: "",
        rera_carpet_area: "",
        unit_no: "",
        rate: "",
        final_value: "",
        parking_details: "",
        parking_no: "",
        other_amenities: "",
        total_value: "",
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
```

             
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

export default connect(mapStateToProps, mapDispatchToProps)(InventriseProperties);
