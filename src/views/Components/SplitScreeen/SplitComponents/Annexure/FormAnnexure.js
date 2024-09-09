import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Label,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@mui/material/Switch";
import { MenuItem, Tooltip } from "@material-ui/core";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editAnnexureData } from "../../../../../Redux/Creators/AnnexureCreators";

//*Components
import ViewAnnexture from "./ViewAnnexture";
import LinerLoader from "components/Loaders/LinerLoader";
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function FormAnnexure(props) {

  let contentState = stateFromHTML(
    props?.property?.property?.annexure?.text_area
  );
  console.log("contentState", contentState);
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(contentState)
  );
  const onEditorStateChange = (editorState) => setEditorState(editorState);

  
  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Upload file:", values);

    const data = new FormData();

    // data.append("file_upload", values.file_upload);
    // data.append("desc_1", values.desc_1);
    // data.append("file_2", values.file_2);
    // data.append("desc_2", values.desc_2);

    // data.append("file_3", values.file_3);
    // data.append("desc_3", values.desc_3);

    // data.append("file_4", values.file_4);
    // data.append("desc_4", values.desc_4);

    // data.append("file_5", values.file_5);
    // data.append("desc_5", values.desc_5);

    // data.append("file_1_status", values.file_1_status);
    // data.append("file_2_status", values.file_2_status);
    // data.append("file_3_status", values.file_3_status);
    // data.append("file_4_status", values.file_4_status);
    // data.append("file_5_status", values.file_5_status);

    data.append(
      "text_area",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    data.append("id", values.id);
    data.append("property_id", values.property_id);
    data.append("file", values.file_uploadc);
    values.annexure.forEach((row, i) => {
      // data.append(
      //   `property_id[${i}]`,
      //   values.property_id
      // );
      data.append(`desc[${i}]`, row.desc);
      data.append(`file_status[${i}]`, row.file_status);
      data.append(`files[${i}]`, row.file);
    });
    const value = 2;

    let progressData = {
      id: props?.property?.property?.id,
      annexureProgress: 1,
      
    }

    
    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);
    props.editAnnexureData(data, token);
    setSubmitting(false);
    console.log(data,"ssssssss")
  };
  const formPropsLength = 11;

  return (
    <>
      {props.annexures.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.annexure?.id,
              property_id: props?.property?.property?.id,
              text_area: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
              file_upload: props?.property?.property?.annexure?.file_upload,
              desc_1: props?.property?.property?.annexure?.desc_1,
              file_2: props?.property?.property?.annexure?.file_2,
              desc_2: props?.property?.property?.annexure?.desc_2,
              file_3: props?.property?.property?.annexure?.file_3,
              desc_3: props?.property?.property?.annexure?.desc_3,
              file_4: props?.property?.property?.annexure?.file_4,
              desc_4: props?.property?.property?.annexure?.desc_4,
              file_5: props?.property?.property?.annexure?.file_5,
              desc_5: props?.property?.property?.annexure?.desc_5,
              file_1_status: props?.property?.property?.annexure?.file_1_status,
              file_2_status: props?.property?.property?.annexure?.file_2_status,
              file_3_status: props?.property?.property?.annexure?.file_3_status,
              file_4_status: props?.property?.property?.annexure?.file_4_status,
              file_5_status: props?.property?.property?.annexure?.file_5_status,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
                 <Form encType="multipart/form-data">
                 <Typography variant={"h5"}>Annexures</Typography>
                 <Divider />
                 <br />
                 <Row className="form-group">
                   <Label>
                   Annexure for Property/ Project Writeup
                   </Label>
                   <Col md={12}>
                     <Editor
                       label="More Information About Project / Property as an Annexure"
                       editorState={editorState}
                       toolbarClassName="toolbarClassName"
                       wrapperClassName="wrapperClassName"
                       editorClassName="editorClassName"
                       onEditorStateChange={onEditorStateChange}
                       placeholder="Edit here"
                     />
                   </Col>
                   <Col md={8} className="pb-4 pt-3">
                   <Label>Upload Excel For Internal Calculation</Label>
                     <TextField
                       fullWidth
                       type="file"
                       focused
                       size="small"
                       variant="outlined"
                       id="file_uploadc"
                       name="file_uploadc"
                      //  label="Upload Excel For Internal Calculation"
                       onChange={(event) => {
                         formProps.setFieldValue(
                           "file_uploadc",
                           event.currentTarget.files[0]
                         );
                         console.log(
                           "file_uploadc",
                           formProps.values.file_uploadc
                         );
                       }}
                     />
                   </Col>
                   <Col md={2} className="mt-5">
                     <ViewAnnexture file={formProps.values.file_uploadc} />
                   </Col>
                   <Col md={2} className="mt-5">
                     <Tooltip title="attachment to report">
                       <Switch
                         checked={
                           formProps.values._2_status == "1" ? true : false
                         }
                         onClick={() => {
                           formProps.values._2_status === "1"
                             ? formProps.setFieldValue("fil_2_status", "0")
                             : formProps.setFieldValue("_2_status", "1");
                         }}
                         size="medium"
                         color="success"
                       />
                     </Tooltip>
                   </Col>
                 </Row>
 
                 <Divider />
                 <br />
 
                 <Typography variant={"h5"}>
                   Upload Annexure For Report
                 </Typography>
                 <Divider />
 
                 <Row className="pt-4 pb-2">
                   <Col md={12}>
                     <FieldArray
                       name="annexure"
                       render={(arrayHelpers) => (
                         <div>
                           <Row>
                             <Col md={3} className="pb-4">
                               <TextField
                                 fullWidth
                                 select
                                 label="Description"
                                 variant="standard"
                                 id="desc"
                                 name="desc"
                                 onChange={formProps.handleChange}
                                 value={formProps?.values?.desc}
                               >
                                 <MenuItem value="">Select</MenuItem>
                                 {props?.dropdowns?.dropdowns
                                   ?.filter(
                                     (field) => field?.name == "Description"
                                   )[0]
                                   ?.drop_down_details?.map((field, i) => (
                                     <MenuItem key={i} value={field?.name}>
                                       {field?.name}
                                     </MenuItem>
                                   ))}
                               </TextField>
                             </Col>
                             <Col md={3} className="pb-4">
                               <TextField
                                 fullWidth
                                 label="Description"
                                 variant="standard"
                                 id="desc"
                                 name="desc"
                                 onChange={formProps.handleChange}
                                 value={formProps?.values?.desc}
                               ></TextField>
                             </Col>
                             <Col md={3} className="pb-4 pt-3">
                               <TextField
                                 fullWidth
                                 type="file"
                                 focused
                                 size="small"
                                 variant="outlined"
                                 id="file"
                                 name="file"
                                 label="Upload File"
                                 onChange={(event) => {
                                   formProps.setFieldValue(
                                     "file",
                                     event.currentTarget.files[0]
                                   );
                                   console.log("file", formProps.values.file);
                                 }}
                               />
                             </Col>
                             <Col md={1} className="pb-4 pt-3">
                               <Tooltip title="attachment to report">
                                 <Switch
                                   checked={
                                     formProps.values.file_status == "1"
                                       ? true
                                       : false
                                   }
                                   onClick={() => {
                                     formProps.values.file_status === "1"
                                       ? formProps.setFieldValue(
                                           "file_status",
                                           "0"
                                         )
                                       : formProps.setFieldValue(
                                           "file_status",
                                           "1"
                                         );
                                   }}
                                   size="medium"
                                   color="success"
                                 />
                               </Tooltip>
                             </Col>
 
                             <Col md={2}>
                               <Button
                                 className="mt-2"
                                 color="success"
                                 variant="contained"
                                 onClick={() => {
                                   arrayHelpers.push({
                                     file: formProps.values.file,
                                     desc: formProps.values.desc,
                                     file_status: formProps.values.file_status,
                                   });
                                 }}
                                 size="large"
                               >
                                 <AddIcon fontSize="inherit" />
                               </Button>
                             </Col>
                           </Row>
                           <Table size="sm" className="mt-3">
                             <thead>
                               <tr>
                                 <th>Sr No</th>
                                 <th>desc</th>
                                 <th>file</th>
                                 <th>Delete</th>
                               </tr>
                             </thead>
                             <tbody>
                               {formProps?.values?.annexure?.map(
                                 (area, index) => {
                                   return (
                                     <tr key={index}>
                                       <td>{index + 1}</td>
                                       <td>
                                         <TextField
                                           fullWidth
                                           size="small"
                                           label="desc"
                                           variant="outlined"
                                           name={`area.${index}.desc`}
                                           value={area.desc}
                                           id="desc"
                                           onChange={formProps.handleChange}
                                         />
                                       </td>
                                       <td>
                                         <TextField
                                           fullWidth
                                           size="small"
                                           label="file"
                                           variant="outlined"
                                           name={`area.${index}.file`}
                                           value={area.file}
                                           id="file"
                                           onChange={formProps.handleChange}
                                         />
                                       </td>
                                       {/* <td>
                                         <ViewAnnexture
                                           file={`area.${index}.file`}
                                         />
                                       </td> */}
                                       <td>
                                         <Button
                                           color="error"
                                           size="large"
                                           variant="contained"
                                           onClick={() =>
                                             arrayHelpers.remove(index)
                                           }
                                         >
                                           <DeleteIcon fontSize="inherit" />
                                         </Button>
                                       </td>
                                     </tr>
                                   );
                                 }
                               )}
                             </tbody>
                           </Table>
                         </div>
                       )}
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
                       type="submit"
                     >
                       Submit
                     </Button>
                   </Col>
                 </Row>
               </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    annexures: state.annexures,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAnnexureData: (data, token) => dispatch(editAnnexureData(data, token)),
    editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAnnexure);
