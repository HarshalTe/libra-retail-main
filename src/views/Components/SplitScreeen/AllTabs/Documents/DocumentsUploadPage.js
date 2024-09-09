import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Label} from "reactstrap";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

//*Actions
import { bulkuploadDocumentCases } from "../../../../../Redux/Creators/IniciateDocumentCreators";

import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { useParams } from "react-router-dom";

function DocumentsUploadPage(props) {
  const Params = useParams();

  console.log("Params",Params)

  
  console.log("Values In Create form", props);
  
  const handleSubmit = (values, { setSubmitting }) => {
    const token = {
      token:props.login?.login?.token,
      id:Params.id
    } 
    console.log("Values In Create form", values,token,props);
    const data = new FormData();
    data.append("property_id", values.property_id);
    data.append("document_name", values.document_name);
    data.append("authority", values.authority);
    data.append("outward_number", values.outward_number);
    data.append("document_date", values.document_date);
    data.append("document_file", values.document_file);

    console.log("submit data", data);

    props.bulkuploadDocumentCases(data, token);
    setSubmitting(false);
  };
  return (
    <div>
      <br />
          <Typography variant={"h5"}>Property Document</Typography>
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              document_name: "",
              property_id: Params.id,
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
                        <MenuItem value="">Select File Name</MenuItem>
                        <MenuItem value="Pan Card">Pan Card</MenuItem>
                        <MenuItem value="Adhar Card">Adhar Card</MenuItem>
                        <MenuItem value="Tax Details">Tax Details</MenuItem>
                        <MenuItem value="Index XI">Index XI</MenuItem>
                        <MenuItem value="Sale Deed">Sale Deed</MenuItem>
                        <MenuItem value="Sale Certificate">
                          Sale Certificate
                        </MenuItem>
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
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
      {/* <Documents/> */}
      {/* </ModalBody>
      </Modal> */}
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
    bulkuploadDocumentCases: (data, token) => dispatch(bulkuploadDocumentCases(data,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsUploadPage);
