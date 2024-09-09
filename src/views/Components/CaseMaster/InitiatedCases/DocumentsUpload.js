import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Label,  Modal,
  ModalHeader,
  ModalBody } from "reactstrap";
import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

//*Actions
import { bulkuploadDocument } from "../../../../Redux/Creators/IniciateDocumentCreators";

import MenuItem from "@mui/material/MenuItem";
import Documents from "./Documents";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

function DocumentsUpload(props) {
  //*
  const initiated_case_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "initiated_case_page"
  );

  const Params = useParams();

  
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  React.useEffect(()=>{
    if (props?.model==true) {
      setModal(props?.model);
    }
  },[props])
  console.log("Values In Create form", props);
  
  const handleSubmit = (values, { setSubmitting }) => {
    const token = props.login?.login?.token;
    console.log("Values In Create form", values,token,props);

    const data = new FormData();
    // data.append("property_id", values.property_id);
    // data.append("document_id", values.document_id);
    data.append("document_name", values.document_name);
    data.append("authority", values.authority);
    data.append("outward_number", values.outward_number);
    data.append("document_date", values.document_date);
    data.append("document_file", values.document_file);
    // data.append("document_type", values.document_type);

    console.log("submit data", data);
    props.bulkuploadDocument(data, token);
    setSubmitting(false);
  };
  return (
    <div>
      {/* <UploadDocuments/> */}
      <Tooltip title="Add Documents" placement="top">
        <Button
          variant="outlined"
          color="success"
          size="large"
          className="m-3"
          onClick={() => toggle()}
          fullWidth
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Property Document
        </Button>
      </Tooltip>
     <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Property Document</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>

      <Card>
        <CardBody>
          <Formik
            initialValues={{
              document_name: "",
              document_file: "",
              document_date: moment().format("YYYY-MM-DD"),
              outward_number:"",
              authority:"",
              document_type:"",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => {
              return (
                <Form>
      {/* <Typography variant={"h4"}>Case Document Upload</Typography> */}

                  <br />
                  <Row className="form-group d-flex align-items-end">
                    <Col md={6}>
                    <Label>Document Name</Label>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        label="Document Name"
                        name="document_name"
                        value={formProps.values.document_name}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        helperText={
                          formProps.touched.document_name &&
                          formProps.errors.document_name
                        }
                        error={
                          formProps.touched.document_name &&
                          formProps.errors.document_name
                        }
                        >
                        <MenuItem value="N/A">Select</MenuItem>
                        {props?.dropdowns?.dropdowns
                          ?.filter(
                            (field) => field?.name === "Document Details"
                          )[0]
                          ?.drop_down_details?.map((field, i) => (
                            <MenuItem key={i} value={field?.name}>
                              {field?.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Col>
                    <Col md={6}>
                      <Label>Upload Documents</Label>
                      <TextField
                        fullWidth
                        name="document_file"
                        variant="outlined"
                        margin="small"
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "document_file",
                            e.currentTarget.files[0]
                          );
                        }}
                        type="file"
                        error={
                          formProps.touched.document_file &&
                          Boolean(formProps.errors.document_file)
                        }
                        helperText={
                          formProps.touched.document_file && formProps.errors.document_file
                        }
                      />
                    </Col>
                    <Col md={6} className="pb-4 pt-4">
                    <TextField
                      fullWidth
                      focused
                      type="date"
                      size="small"
                      variant="outlined"
                      // hidden={formProps.values.is_received == 1 ? false : true}
                      id="document_date"
                      name="document_date"
                      label="Document Date"
                      value={formProps.values.document_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.document_date &&
                        Boolean(formProps.errors.document_date)
                      }
                      helperText={
                        formProps.touched.document_date &&
                        formProps.errors.document_date
                      }
                    />
                  </Col>
                    
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Outward Number"
                      variant="standard"
                      id="outward_number"
                      name="outward_number"
                      value={formProps.values.outward_number}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Authority"
                      variant="standard"
                      id="authority"
                      name="authority"
                      value={formProps.values.authority}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={6} className="pb-4">
                    <TextField
                      fullWidth
                      label="Document remarks"
                      variant="standard"
                      id="document_remark"
                      name="document_remark"
                      value={formProps.values.document_remark}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  </Row>

                  {/* {initiated_case_page.create_status == "1" ? ( */}
                    <Row>
                      <Button
                        color="success"
                        variant="contained"
                        disabled={formProps.isSubmitting}
                        fullWidth
                        type="submit"
                      >
                        Upload Documents
                      </Button>
                    </Row>
                  {/* ) : (
                    ""
                  )} */}
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
      <Documents data={Params.id}/>
      </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    branches: state.branches,
    projects: state.projects,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bulkuploadDocument: (data, token) => dispatch(bulkuploadDocument(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsUpload);
