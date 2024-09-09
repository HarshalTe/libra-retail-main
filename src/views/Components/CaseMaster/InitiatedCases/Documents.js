import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Table,
  Tooltip,
} from "reactstrap";
import Button from "@mui/material/Button";
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Divider } from "@mui/material";

//*Components
import DeleteDocuments from "./DeleteDocuments";
import LinerLoader from "components/Loaders/LinerLoader";
// import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";


//*Actions
import { editDocumentData } from "../../../../Redux/Creators/DocumentsCreators";
import { getDocumentPage } from "../../../../Redux/Creators/IniciateDocumentCreators";

function Documents(props) {

  const [tooltipOpen, setTooltipOpen] = React.useState({});

  const toggleTooltip = (index) => {
    setTooltipOpen({ ...tooltipOpen, [index]: !tooltipOpen[index] });
  };
  const token = props.login?.login?.token;

  const documents = props?.iniciateDocument?.iniciateDocument?.filter(row => row?.property_id === props?.data);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    // console.log("page", page);
    // let pageno = page + 1;
    // console.log("pageno", pageno);
    let data = {
      // pageno: pageno,
      // pageSize: rowsPerPage,
      token: token,
    };
    props.getDocumentPage(data);
  };

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
    setSubmitting(false);
  };

  console.log("ssssssssss",props?.iniciateDocument?.iniciateDocument,props)
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
              <br />
              <Row className="mt-3">
      <Col md={12}>
        <Row className="font-weight-bold border bg-light">
          <Col className="border">Sr No.</Col>
          <Col className="border">Document Name</Col>
          <Col className="border">Document Date</Col>
          <Col className="border">Outward Number</Col>
          <Col className="border">Authority</Col>
          <Col className="border">Remark</Col>
          <Col className="border">View Document</Col>
          <Col className="border">Action</Col>
        </Row>
        {documents?.reverse().map((document, index) => (
          <Row key={index} className="align-items-center border">
            <Col className="">{index+1}</Col>
            <Col className="">{document?.document_name}</Col>
            <Col className="">{document?.document_date}</Col>
            <Col className="" style={{ maxWidth: '150px' }}>{document?.outward_number}</Col>
            <Col className="">{document?.authority}</Col>
            <Col className="text-truncate" id={`remark-${index}`} style={{ maxWidth: '150px' }}>
              {document?.remark}
              <Tooltip
                placement="top"
                isOpen={tooltipOpen[index]}
                target={`remark-${index}`}
                toggle={() => toggleTooltip(index)}
              >
                {document?.remark}
              </Tooltip>
            </Col>
            <Col className="">
              <Button
                size="sm"
                color="success"
                variant="contained"
                href={`https://lvpl.in/librabackend/storage/app/public/PropertyDocuments/${document?.document_file}`}
                target="_blank"
              >
                View
              </Button>
            </Col>
            <Col className="">
              <DeleteDocuments data={document} />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>

              <Divider />
              <br />

             
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    property: state.property,
    documents: state.documents,
    iniciateDocument: state.iniciateDocument,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editDocumentData: (data, token) => dispatch(editDocumentData(data, token)),
    getDocumentPage: (data) => dispatch(getDocumentPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
