import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

//*Actions
import { editHomeImprovementData } from "../../../../../Redux/Creators/HomeImprovementCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import ViewFile from "./ViewFile";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { stateFromHTML } from "draft-js-import-html";


function HomeImprovement(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const token = props.login?.login?.token;
  let contentState = stateFromHTML(
    props?.property?.property?.home_improvement?.remarks
  );
  console.log("contentState", contentState);
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(contentState)
  );
  const onEditorStateChange = (editorState) => setEditorState(editorState);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const data = new FormData();

    data.append("id", values.id);
    data.append("property_id", values.property_id);
    data.append("is_certificate", values.is_certificate);
    data.append("architect_estimate", values.architect_estimate);
    data.append("approved_estimate", values.approved_estimate);
    data.append("remarks", draftToHtml(convertToRaw(editorState.getCurrentContent())));

    const value = 3;

    console.log("data", data);

    
    let progressData = {
      id: props?.property?.property?.id,
      homeImprovementProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    props.editHomeImprovementData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 4;

  return (
    <>
      {props.homeImprovement.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />

          <Formik
            initialValues={{
              property_id: props?.property?.property?.id,
              id: props?.property?.property?.home_improvement?.id,
              is_certificate:
                props?.property?.property?.home_improvement?.is_certificate,
              architect_estimate:
                props?.property?.property?.home_improvement?.architect_estimate,
              approved_estimate:
                props?.property?.property?.home_improvement?.approved_estimate,
              remarks: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <div className="pb-4">
                    <Box sx={{ width: "90%" }}>
                      <LinearProgressWithLabel value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                    </Box>
                  </div>
                <Typography variant={"h5"}>Home Improvement</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      label="Architect certificate available"
                      id="is_certificate"
                      name="is_certificate"
                      value={formProps.values.is_certificate}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.is_certificate)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="1">Yes</MenuItem>
                      <MenuItem value="0">No</MenuItem>
                    </TextField>
                  </Col>
                  <Col md={2} className="pb-4">
                    <Typography>Upload architect estimate</Typography>
                  </Col>

                  <Col md={5} className="pb-4 pt-3">
                    <TextField
                      type="file"
                      file
                      name="architect_estimate"
                      id="architect_estimate"
                      onChange={(e) => {
                        formProps.setFieldValue(
                          "architect_estimate",
                          e.currentTarget.files[0]
                        );
                      }}
                      onBlur={() => {
                        if (formProps.values.architect_estimate)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={2} className="pb-4 pt-3">
                    <ViewFile
                      file={
                        props?.property?.property?.home_improvement
                          ?.architect_estimate
                      }
                    />
                  </Col>
                  <Col md={2} className="pb-4 pt-3">
                    <Tooltip title="annexure">
                      <Switch defaultChecked size="medium" color="success" />
                    </Tooltip>
                  </Col>
                </Row>

                <Row className="form-group pb-4">
                  <Col md={2} className="pb-4">
                    <Typography>Approved Estimate</Typography>
                  </Col>

                  <Col md={5} className="pb-4 pt-3">
                    <TextField
                      type="file"
                      file
                      name="approved_estimate"
                      id="approved_estimate"
                      onChange={(e) => {
                        formProps.setFieldValue(
                          "approved_estimate",
                          e.currentTarget.files[0]
                        );
                      }}
                      onBlur={() => {
                        if (formProps.values.approved_estimate)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={2} className="pb-4 pt-3">
                    <ViewFile
                      file={
                        props?.property?.property?.home_improvement
                          ?.approved_estimate
                      }
                    />
                  </Col>
                  <Col md={2} className="pb-4 pt-3">
                    <Tooltip title="annexure">
                      <Switch defaultChecked size="medium" color="success" />
                    </Tooltip>
                  </Col>

                  {/* <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Remarks"
                      variant="standard"
                      id="remarks"
                      name="remarks"
                      value={formProps.values.remarks}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.remarks)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col> */}
                    <Col md={12}>
                  <Label>Remarks</Label>

                    <Editor
                      label="Remarks"
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      placeholder="Edit here"
                      // value={draftToHtml(
                      //   convertToRaw(editorState.getCurrentContent())
                      // )}
                    />
                  </Col>
                </Row>

                <Divider />
                <br />

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      onClick={()=>dispatch(ADD_ONE())}

                      type="submit"
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    homeImprovement: state.homeImprovement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editHomeImprovementData: (data, setValue, value, token) =>
      dispatch(editHomeImprovementData(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeImprovement);
