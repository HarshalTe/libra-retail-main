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
  Label,
  Table
} from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";

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
import DeleteIcon from "@mui/icons-material/Delete";

//*Actions
import { relievinglettersEditData } from "../../../../Redux/Creators/LievingLettersCreators";
import { getAssetsList } from "../../../../Redux/Creators/AssetsCreators";
import JoditEditor from "jodit-react";

function EditLeavingLetter(props) {
  const token = props.login?.login?.token;
console.log("props1121",props)

let data = "<p><br></p><p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">Ref. No – LV/23-24/Cert/017<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></strong><strong><span lang=\"EN-US\" style=\"font-family: Arial, sans-serif; color: black;\">Date- 04-07-2023</span></strong></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-family: Arial, sans-serif; color: black;\">&nbsp;</span></strong><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p align=\"center\" style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px; text-align: center;\"><strong><span lang=\"EN-US\" style=\"font-size: 17px; color: black;\">TO WHOM-SO-EVER IT MAY CONCERN</span></strong></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">&nbsp;</span><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">&nbsp;</span><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px; text-align: justify;\"><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">This is to certify that <strong>Mr. Shubham Parab</strong> Son of <strong>Mr. Ankush Kashiram Parab</strong> worked as <strong>Field\n            Engineer</strong> in our company from June, 2021 to June, 2023 with our entire\n        satisfaction. We have no objection to allow him in any better position and have\n        no liabilities in our company.</span></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px; text-align: justify;\"><span lang=\"EN-US\" style=\"font-size: 17px; font-family: Arial, sans-serif; color: black;\">&nbsp;</span><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px; text-align: justify;\"><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">We wish him every success in\n        life.</span></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">&nbsp;</span></strong><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">&nbsp;</span></strong><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">Sincerely, </span></strong></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">&nbsp;</span></strong><br></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">Mr Tejas Dave</span></strong></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">Founder &amp; Director</span></strong></p>\n\n<p style=\"margin-right: 0px; margin-left: 0px; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin-top: 0px;\"><strong><span lang=\"EN-US\" style=\"font-size: 15px; font-family: Arial, sans-serif; color: black;\">Libra Valuers</span></strong></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif;\"><span lang=\"EN-US\">&nbsp;</span><br></p>"
  const [modal, setModal] = useState(false);
  const [content, setContent] = React.useState(data);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    
    let data = {
        id:props?.data?.id,
        user_id:values.user_id,
        relieving_date: values.relieving_date,
        position: values.position,
        status: values.status,
        message:content,
        
    };
    console.log("Values In Upload file:",data, values);

    props.relievinglettersEditData(data, token);
    setSubmitting(true);
    setModal(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
  let data = {
    token: token,
  };
    props.getAssetsList(data);
  };
  const rows =props.assets?.isLoading
  ? []
  : props.assets?.assets?.length > 0
  ? props.assets?.assets
  : [];

  const projectsProps = {
    options: props?.users?.isLoading
      ? []
      : props?.users?.users?.data?.map((project) => project),
  };
  return (
    <div>
      <Tooltip title="Edit Relieving Letter" placement="right" className="m-2" style={{float:"right"}}>
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
            <strong>Edit Relieving Letter</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: props.data?.user_id,
              relieving_date: props.data?.relieving_date,
              position: props.data?.position,
              status: props.data?.status,
              message: [],
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
      <Label>Employee Id</Label>
      <>
        <Autocomplete
          id="contact-autocomplete"
          options={projectsProps?.options}
          getOptionLabel={(project) => `${project?.name}`}
          value={projectsProps?.options?.find(option => option?.id === formProps?.values?.user_id) || null}
          onChange={(e, value) => {
            console.log(value, e, "ere");
            formProps.setFieldValue("user_id", value?.id || "");
            formProps.setFieldValue("name", value?.name || "");
            formProps.setFieldValue("email", value?.email || "");
            formProps.setFieldValue(
              "mobile",
              value.mobile_no || ""
            );
            formProps.setFieldValue(
              "assets",
              rows?.filter(item => item.user_id === value?.id) || []
            );
          }}
          onOpen={formProps.handleBlur}
          includeInputInList
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(
                formProps.touched.user_id &&
                  formProps.errors.user_id
              )}
              fullWidth
              helperText={
                formProps.touched.user_id &&
                formProps.errors.user_id
              }
              label="Employee Id"
              name="user_id"
              size="small"
              variant="outlined"
            />
          )}
        />
      </>
    </Col>

                  <Col md={6} className="">
                    <Label>Relieving Date</Label>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      // label="Relieving Date"
                      id="relieving_date"
                      name="relieving_date"
                      value={formProps.values.relieving_date}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.relieving_date &&
                        Boolean(formProps.errors.relieving_date)
                      }
                      helperText={
                        formProps.touched.relieving_date &&
                        formProps.errors.relieving_date
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Position</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Position"
                      id="position"
                      name="position"
                      value={formProps.values.position}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.position &&
                        Boolean(formProps.errors.position)
                      }
                      helperText={
                        formProps.touched.position && formProps.errors.position
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Status</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Status"
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.status &&
                        Boolean(formProps.errors.status)
                      }
                      helperText={
                        formProps.touched.status && formProps.errors.status
                      }
                    />
                  </Col>
                

                

                  <Col md={12} className="pb-4 mt-4">
                    <FieldArray
                      name="assets"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            {/* <Col md={10}>
                              <TextField
                                fullWidth
                                required
                                size="small"
                                select
                                variant="outlined"
                                id="assets2"
                                name="assets2"
                                label="Assets"
                                value={formProps.values.assets2}
                                onChange={formProps.handleChange}
                                error={
                                  formProps.touched.assets2 &&
                                  Boolean(formProps.errors.assets2)
                                }
                                helperText={
                                  formProps.touched.assets2 &&
                                  formProps.errors.assets2
                                }
                              >
                              {  console.log(rows,"hhhhh")}
                                <MenuItem value={""}>Select</MenuItem>
                                {rows?.map((row) => {
                                  return(

                                    <MenuItem value={row?.name}>
                                    {row?.name}
                                  </MenuItem>
                                    )
                                })}
                              </TextField>
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                  arrayHelpers.push(formProps.values.assets2);
                                }}
                                size="large"
                              >
                                <AddIcon fontSize="medium" />
                              </Button>
                            </Col> */}
                          </Row>
                          <Table
                            size="sm"
                            className="mt-3"
                            bordered
                            style={{ textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th>Sr No.</th>
                                <th>Assets</th>
                              </tr>
                            </thead>

                            <tbody>
                              {console.log("values", formProps?.values?.assets)}
                              {formProps?.values?.assets?.map((bank, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>
                                      <TextField
                                        fullWidth
                                        disabled
                                        size="small"
                                        label="Assets"
                                        variant="outlined"
                                        name={`bank.${index}`}
                                        value={bank.name}
                                        id="assets"
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                          formProps.values.banks.splice(
                                            index,
                                            1
                                          );
                                        }}
                                      >
                                        <DeleteIcon fontSize="medium" />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Divider />
                <Row>
                <Col md={12}>
                  <FieldArray
                    name="massage"
                    render={(arrayHelpers) => (
                      <div>
                        <div>
                          <div>
                          <JoditEditor
                                      id="details"
                                    //   label="Declaration *"
                                      name="details"
                                      value={content}
                                      onChange={newContent=>setContent(newContent)}
                                    />
                          </div>
                          {/* <div>
                            <Button
                              color="success"
                              variant="outlined"
                              onClick={() => {
                                arrayHelpers.push({
                                  details: content,
                                });
                                {
                                  formProps.setFieldValue("details", "");
                                }
                              }}
                              size="large"
                            >
                              <AddIcon fontSize="inherit" />
                            </Button>
                          </div> */}
                        </div>
                        {/* <div size="sm" className="mt-3">
                          
                          <div>
                            {console.log(
                              "values",
                              formProps?.values?.massage
                            )}
                            {formProps?.values?.massage?.map(
                              (massage, index) => {
                                return (
                                  <div key={index}>
                                    <div>
                                    <JoditEditor
                                      id="details"
                                      label="Declaration *"
                                      name={`massage.${index}details`}
                                       value={massage.details}
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
                        </div> */}
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
    assets: state.assets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    relievinglettersEditData: (data,token) => dispatch(relievinglettersEditData(data,token)),
    getAssetsList: (data) => dispatch(getAssetsList(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLeavingLetter);
