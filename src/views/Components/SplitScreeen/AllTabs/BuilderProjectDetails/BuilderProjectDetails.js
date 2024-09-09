import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";

import { Formik, Form } from "formik";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editProjectsData } from "../../../../../Redux/Creators/ProjectsCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import BuilderLinearProgressBar from "./BuilderLinearProgressBar"
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";

function BuilderProjectDetails(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const handleSubmit = (values, { setSubmitting }) => {
    // const token = props.login?.login?.token;
    const token ={
      token:props.login?.login?.token,
      property_id: props?.property?.property?.id,    
    }
   
    const value = 2;
    let progressData = {
      id: props?.property?.property?.id,
      builderProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);
    handleSubmit2(values, { setSubmitting })
  };

  const handleSubmit2 = (values, { setSubmitting }) => {
    // const token = props.login?.login?.token;
    const token ={
      token:props.login?.login?.token,
      property_id: props?.property?.property?.id,    
    }
    let data = {
      // property_id: values.property_id,
      id: props?.property?.property?.project?.id,
      builder_name: values.builder_name,
      builder_address: values.builder_address,
      builder_contact: values.builder_contact,
      previous_project: values.previous_project,
      permit_details: values.permit_details,
      negative_info: values.negative_info,
    };
    const value = 3;

    props.editProjectsData(data, props.setValue, value,token);
    setSubmitting(true);
  };
  const formPropsLength = 6
  return (
    <>
      {props.projects.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              builder_name: props?.property?.property?.project?.builder_name,
              builder_address:props?.property?.property?.project?.builder_address,
              builder_contact:props?.property?.property?.project?.builder_contact,
              previous_project:props?.property?.property?.project?.previous_project,
              permit_details:props?.property?.property?.project?.permit_details,
              negative_info: props?.property?.property?.project?.negative_info,
            }}
            onSubmit={handleSubmit}
            // validationSchema={Yup.object().shape({
            //   //   name: Yup.string().required("Name is required"),
            // })}
            >
            {(formProps) => 
            {
              return(
              <Form>
                 <div className="pb-4">
                    <Box sx={{ width: "100%" }}>
                      <BuilderLinearProgressBar value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                      {/* <BuilderLinearProgressBar value={progress} /> */}
                    </Box>
                  </div>
                <Typography variant={"h5"}>Builder Details</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="builder_name"
                      name="builder_name"
                      label="Builder name"
                      variant="standard"
                      value={formProps.values.builder_name}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.builder_name)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.builder_name &&
                        Boolean(formProps.errors.builder_name)
                      }
                      helperText={
                        formProps.touched.builder_name &&
                        formProps.errors.builder_name
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="builder_address"
                      name="builder_address"
                      label="Address"
                      variant="standard"
                      value={formProps.values.builder_address}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.builder_address)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.builder_address &&
                        Boolean(formProps.errors.builder_address)
                      }
                      helperText={
                        formProps.touched.builder_address &&
                        formProps.errors.builder_address
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="builder_contact"
                      name="builder_contact"
                      label="Contact Details"
                      variant="standard"
                      value={formProps.values.builder_contact}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.builder_contact)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.builder_contact &&
                        Boolean(formProps.errors.builder_contact)
                      }
                      helperText={
                        formProps.touched.builder_contact &&
                        formProps.errors.builder_contact
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="previous_project"
                      name="previous_project"
                      label="Previous projects"
                      variant="standard"
                      value={formProps.values.previous_project}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.previous_project)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.previous_project &&
                        Boolean(formProps.errors.previous_project)
                      }
                      helperText={
                        formProps.touched.previous_project &&
                        formProps.errors.previous_project
                      }
                    />
                  </Col>

                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="permit_details"
                      name="permit_details"
                      label="Permit Details"
                      variant="standard"
                      value={formProps.values.permit_details}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.permit_details)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.permit_details &&
                        Boolean(formProps.errors.permit_details)
                      }
                      helperText={
                        formProps.touched.permit_details &&
                        formProps.errors.permit_details
                      }
                      />
                  </Col>

                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="negative_info"
                      name="negative_info"
                      label="Negative information"
                      variant="standard"
                      value={formProps.values.negative_info}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.negative_info)
                        setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.negative_info &&
                        Boolean(formProps.errors.negative_info)
                      }
                      helperText={
                        formProps.touched.negative_info &&
                        formProps.errors.negative_info
                      }
                      />
                  </Col>
                </Row>

                <Divider />
                <br />
                <Row className="form-group">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={()=>dispatch(ADD_ONE())}
                      >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}}
          </Formik>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProjectsData: (data, setValue, value,token) =>
      dispatch(editProjectsData(data, setValue, value,token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuilderProjectDetails);
