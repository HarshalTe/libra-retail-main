import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";


// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Components
import UploadDocuments from "./UploadDocuments";
import DeleteDocuments from "./DeleteDocuments";
import LinerLoader from "components/Loaders/LinerLoader";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";


//*Actions
import { editDocumentData } from "../../../../../Redux/Creators/DocumentsCreators";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import DocumentsUploadPage from "../../../../../views/Components/CaseMaster/InitiatedCases/DocumentsUploadPage";

function Documents(props) {
  const [progress, setProgress] = React.useState(0);
  const token = props.login?.login?.token;
  const dispatch = useDispatch();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values", values);
    
    const data = {
      id: values.id,
      property_id: values.property_id,
      property_type: values.property_type,
      ownership_type: values.ownership_type,
      transaction_type: values.transaction_type,
    };
    
    props.editDocumentData(data, token);
    if (props.value == 1) {
      console.log("valuevalue",props.value)
      props.setValue(props.value+1)
    } 
    setSubmitting(false);
  };
  const formPropsLength = 3;
  return (
    <>
      <br />

      {props.documents.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <Formik
        initialValues={{
          query_remark: "",
          query_raise_date: moment().format("YYYY-MM-DD"),
          query_resolve_date: moment().format("YYYY-MM-DD"),
          
          //*
          id: props?.property?.property?.document?.id,
          property_id: props?.property?.property?.id,
          property_type: props?.property?.property?.document?.property_type,
          ownership_type: props?.property?.property?.document?.ownership_type,
          transaction_type:
          props?.property?.property?.document?.transaction_type,

          //*
          document_details:
          props?.property?.property?.document?.document_details,
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
              <Typography variant={"h5"}>Project Documents</Typography>
              <Divider />
              <br />
              <Row className="form-group">
                <Col md={4} className="pb-4">
                  <TextField
                    fullWidth
                    label="Type of property"
                    variant="standard"
                    name="property_type"
                    id="property_type"
                    value={formProps.values.property_type}
                    onChange={formProps.handleChange}
                    onBlur={() => {
                      if (formProps.values.property_type)
                      setProgress(progress + 100 / formPropsLength);
                    }}
                    />
                </Col>
                <Col md={4} className="pb-4">
                  <TextField
                    fullWidth
                    label="Type of ownership"
                    variant="standard"
                    name="ownership_type"
                    id="ownership_type"
                    value={formProps.values.ownership_type}
                    onChange={formProps.handleChange}
                    onBlur={() => {
                      if (formProps.values.ownership_type)
                      setProgress(progress + 100 / formPropsLength);
                    }}
                    />
                </Col>
                <Col md={4} className="pb-4">
                  <TextField
                    fullWidth
                    label="Type of transaction"
                    variant="standard"
                    name="transaction_type"
                    id="transaction_type"
                    value={formProps.values.transaction_type}
                    onChange={formProps.handleChange}
                    onBlur={() => {
                      if (formProps.values.transaction_type)
                      setProgress(progress + 100 / formPropsLength);
                        }}
                  />
                </Col>
              </Row>

              {/* <Row className="form-group">
                <Col md={4} className="pb-4">
                <TextField
                    fullWidth
                    label="Query remark"
                    variant="standard"
                    onChange={formProps.handleChange}
                  />
                  </Col>
                  <Col md={3} className="pb-4">
                  <TextField
                    fullWidth
                    type="date"
                    size="small"
                    variant="outlined"
                    id="query_raise_date"
                    name="query_raise_date"
                    label="Query raise date"
                    value={formProps.values.query_raise_date}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.query_raise_date &&
                      Boolean(formProps.errors.query_raise_date)
                    }
                    helperText={
                      formProps.touched.query_raise_date &&
                      formProps.errors.query_raise_date
                    }
                    />
                    </Col>
                    <Col md={3} className="pb-4">
                    <TextField
                    fullWidth
                    type="date"
                    size="small"
                    variant="outlined"
                    id="query_resolve_date"
                    name="query_resolve_date"
                    label="Query resolve date"
                    value={formProps.values.query_resolve_date}
                    onChange={formProps.handleChange}
                    error={
                      formProps.touched.query_resolve_date &&
                      Boolean(formProps.errors.query_resolve_date)
                    }
                    helperText={
                      formProps.touched.query_resolve_date &&
                      formProps.errors.query_resolve_date
                    }
                  />
                </Col>

                <Col>
                  <Button color="success" variant="contained" size="large">
                    <AddIcon fontSize="inherit" />
                    </Button>
                    </Col>
                  </Row> */}

              <Row>
                <Col md={6}>
                  <UploadDocuments />
                </Col>
                {/* <Col md={6}>
                  <SendMail />
                </Col> */}
              </Row>

              <br />

              <Row>
                <Col md={12}>
                  <Table size="sm" className="mt-3">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Document description</th>
                        <th>Documents Recived?</th>
                        <th>Documents Recived Date</th>
                        <th>View</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formProps?.values?.document_details?.map(
                        (document, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>

                              <td>{document?.document_desc}</td>
                              <td>
                                {document?.is_received == 1 ? "Yes" : "No"}
                              </td>
                              <td>
                                {document?.is_received == 1
                                  ? document?.received_date
                                  : ""}
                              </td>

                              <td>
                                <Button
                                  size="small"
                                  type="submit"
                                  target="_blank"
                                  color="success"
                                  variant="contained"
                                  href={`https://lvpl.in/librabackend/storage/app/public/DocumentDetails/${document?.document_file}`}
                                  alt=""
                                >
                                  View
                                </Button>
                              </td>
                              <td>
                                <DeleteDocuments data={document} />
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <Divider />
              <br />

              <Row className="pb-4">
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
          )}
        </Formik>
        
      )}
      <div>

      {/* <PropertyDocument/> */}
      <DocumentsUploadPage/>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    property: state.property,
    documents: state.documents,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editDocumentData: (data, token) => dispatch(editDocumentData(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
