import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//? Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";

//*Actions
import { editSpecialRemarkData } from "../../../../../Redux/Creators/SpecialRemarkCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";
import { INITIAL_VALUES } from "./RemarkContent";

function FormRemark(props) {
  console.log("props", props);

  const dispatch = useDispatch();
  let contentState = stateFromHTML(
    props?.property?.property?.special_remark?.remark_name ?? Object.values(INITIAL_VALUES).join("<br />")
  );
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(contentState)
  );
  
  const onEditorStateChange = (editorState) => setEditorState(editorState);
  console.log("contentState", contentState,editorState,draftToHtml(convertToRaw(editorState.getCurrentContent())));

  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      id: values.id,
      property_id: values.property_id,
      remark_name: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      others: values.others,
    };

    let progressData = {
      id: props?.property?.property?.id,
      remarkProgress: 1,
    };
    const value = 2;
    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );

    console.log("data:", data);

    props.editSpecialRemarkData(data, token);
    setSubmitting(false);
  };

  return (
    <>
      {props.specialRemark.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.special_remark?.id,
              property_id: props?.property?.property?.id,
              remark_name: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
              others: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <Typography variant={"h5"}>Remarks</Typography>
                <Divider />
                <br />

                <Row>
                  <Col md={12}>
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      placeholder="Edit here"
                    />
                  </Col>
                </Row>
                <br />
                <br />
                <br />

                <Divider />

                <Row className="pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={() => dispatch(ADD_ONE())}
                    >
                      Submit
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
    specialRemark: state.specialRemark,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSpecialRemarkData: (data, token) =>
      dispatch(editSpecialRemarkData(data, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRemark);
