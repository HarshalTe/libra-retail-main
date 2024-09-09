import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Label } from "reactstrap";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";

//*Actions
import { bulkuploadDocumentCases } from "../../../../Redux/Creators/IniciateDocumentCreators";

import MenuItem from "@mui/material/MenuItem";
import Documents from "./Documents";
import moment from "moment";
import { useParams } from "react-router-dom";
import SendMail from "./SendMail";

function DocumentsUploadPage(props) {
  const [checkedItems, setCheckedItems] = React.useState({});

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  //*
  const Params = useParams();

  console.log("Params", Params);

  const handleSubmit = (values, { setSubmitting }) => {
    const token = {
      token: props.login?.login?.token,
      id: Params.id,
      page: 1,
    };
    console.log("Values In Create form", values, token, props);
    const data = new FormData();
    data.append("property_id", values.property_id);
    // data.append("document_id", values.document_id);
    data.append("document_name", values.document_name);
    data.append("authority", values.authority);
    data.append("outward_number", values.outward_number);
    data.append("document_date", values.document_date);
    data.append("document_file", values.document_file);
    data.append("remark", values.document_remark);

    console.log("submit data", data);

    props.bulkuploadDocumentCases(data, token);
    setSubmitting(false);
  };

  const row = props?.dropdowns?.dropdowns?.filter(
    (field) => field?.name === "Document Details"
  )[0]?.drop_down_details;

  let iniciateDocument = props?.iniciateDocument?.iniciateDocument?.filter(
    (row) => row?.property_id === Params.id
  );
  let matchingDocuments = [];

  if (Array.isArray(row)) {
    // Iterate through each item in 'row'
    row.forEach((rowItem) => {
      // Check if 'document_name' exists in 'iniciateDocument'
      const matchingItem = iniciateDocument?.find((item) => {
        console.log("iniciateDocument2", item?.document_name, rowItem?.name);
        return item.name === rowItem.document_name;
      });

      // If a matching item is found, push it to 'matchingDocuments'
      if (matchingItem) {
        matchingDocuments.push(matchingItem);
      }
    });
  } else {
    console.log("iniciateDocument", "null");
  }

  return (
    <div>
      <br />

      <Typography variant={"h5"}>Property Document</Typography>
      <Row>
        <Col md={8}>
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  document_name: "",
                  property_id: Params.id,
                  document_file: "",
                  document_date: moment().format("YYYY-MM-DD"),
                  outward_number: "",
                  authority: "",
                  document_type: "",
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
                              formProps.touched.document_file &&
                              formProps.errors.document_file
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
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  document_name: "",
                  unstructured_property_id: Params.id,
                  document_file: "",
                  document_date: moment().format("YYYY-MM-DD"),
                  outward_number: "",
                  authority: "",
                  document_type: "",
                  remark: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({})}
              >
                {(formProps) => {
                  return (
                    <Form>
                      <div className="form-group d-flex flex-column">
                        {row?.document_master?.map((document, index) => {
                          // Check if the document_name exists in iniciateDocument array
                          const isIniciateDocument = iniciateDocument.some(
                            (item) =>
                              item.document_name === document.document_name
                          );

                          return (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  checked={
                                    checkedItems[document.id] ||
                                    isIniciateDocument
                                  }
                                  onChange={handleCheckboxChange}
                                  name={document.id.toString()}
                                />
                              }
                              label={document.document_name}
                            />
                          );
                        })}
                      </div>

                      <Row>
                        <SendMail />
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Documents data={Params.id} />
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
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bulkuploadDocumentCases: (data, token) =>
      dispatch(bulkuploadDocumentCases(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsUploadPage);
