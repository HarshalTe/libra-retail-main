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
import DeleteIcon from "@mui/icons-material/Delete";


import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import JoditEditor from 'jodit-react';

//*Actions
import { matrixsPostData } from "../../../../Redux/Creators/UserMatrixCreators";
import printJS from "print-js";

function CreateLeavingLetter(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [content, setContent] = React.useState("");
  const toggle = () => setModal(!modal);

  const printPdf = () => {
    console.log("print11");
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      // font_size: "12pt",
      // maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
      // style: ['@page { size: A4; margin: 0mm;} body {margin: 10px;} h4 {margin:10px}']
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    
    // ? FormData Chahiye File Upload hai
    // const data = new FormData();
    // data.append("user_id", values.user_id);
    // data.append("expense_type", values.expense_type);
    // // data.append("limit", values.limit);
    // data.append("is_approved", values.is_approved);
    // data.append("file_upload", values.file_upload);
    let data = {
      user_id:values.user_id,
      property_type: values.property_type,
      limit: values.limit,
    };
    console.log("Values In Upload file:",data, values);

    props.matrixsPostData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  const projectsProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((project) => project),
  };

  return (
    <div>
      <Tooltip title="View Letter" placement="right">
        <Button
        //   variant="outlined"
        variant="contained"
          color="info"
          fullWidth
        //   size="fullwidth"
        //   className="ml-2"
          onClick={() => toggle()}
        //   startIcon={<AddIcon fontSize="small" />}
        >
          {/* <CloudUploadIcon fontSize="medium" /> */}
          View Letter
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>View Letter</strong>
          </Typography>
        </ModalHeader>
        <Button
          color="success"
          size="small"
          variant="outlined"
          onClick={printPdf}
          className="print-button w-20  m-3"
          // disabled={!print}
        >
          <i className="fa fa-save mr-2" />
          Print Letter
        </Button>
        <Divider />
        <ModalBody>
        <div className="3-page pdf-h-w ">
              {/* <img src="/static/media/libra_logo1.7aa2c027.png" style={{width: "20vw"}}/> */}
              <div
                className="font-weight-bold "
                style={{
                  fontSize: "19px",
                  margin: "10px 80px",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                {/* SWOT Analysis{" "} */}
              </div>
              <div id="htmlToPdf2" className=" d-flex justify-content-center flex-column align-items-center">
                  <>
                  <div dangerouslySetInnerHTML={{ __html: props?.data?.message }} />
                  </>
              </div>
            </div>
          {/* <Formik
            initialValues={{
              user_id: "",
              role:"",
              designation:"",
              email:"",
              dob:"",
              name:"",
              mobile:"",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                <Col md={12}>
                  <FieldArray
                    name="declaration"
                    render={(arrayHelpers) => (
                      <div>
                        <div>
                          <div>
                          <JoditEditor
                                      id="declaration_details"
                                      name="declaration_details"
                                      value={content}
                                      onChange={newContent=>setContent(newContent)}
                                    />
                          </div>

                          <div>
                            <Button
                              color="success"
                              variant="outlined"
                              onClick={() => {
                                arrayHelpers.push({
                                  declaration_details: content,
                                });
                                {
                                  formProps.setFieldValue("declaration_details", "");
                                }
                              }}
                              size="large"
                            >
                              <AddIcon fontSize="inherit" />
                            </Button>
                          </div>
                        </div>
                        <div size="sm" className="mt-3">
                          
                          <div>
                            {console.log(
                              "values",
                              formProps?.values?.declaration
                            )}
                            {formProps?.values?.declaration?.map(
                              (declaration, index) => {
                                return (
                                  <div key={index}>
                                    <div>
                                    <JoditEditor
                                      id="declaration_details"
                                      label="Declaration *"
                                      name={`declaration.${index}declaration_details`}
                                       value={declaration.declaration_details}
                                    />
                                    </div>

                                    <div>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                        }}
                                      >
                                        <DeleteIcon fontSize="inherit" />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  />
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
          </Formik> */}
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    matrixsPostData: (data,token) => dispatch(matrixsPostData(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeavingLetter);
