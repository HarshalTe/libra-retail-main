import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";

import DeleteDocuments from "./DeleteDocuments";
import LinerLoader from "components/Loaders/LinerLoader";

//*Actions
import { editDocumentData } from "../../../../../Redux/Creators/DocumentsCreators";
import { getDocumentPage } from "../../../../../Redux/Creators/IniciateDocumentCreators";
import DocumentsUploadPage from "./DocumentsUploadPage";

function PropertyDocument(props) {
  const token = props.login?.login?.token;


  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
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

  console.log("object1111",props?.iniciateDocument?.iniciateDocument,props)
  return (
    <>
      <br />

      {props.documents.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
              <Row>
                <Col md={12}>
                  <DocumentsUploadPage/>
                </Col>
                
              </Row>

              <br />

              <Row>
                <Col md={12}>
                  <Table size="sm" className="mt-3">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Document Name</th>
                        <th>Document Date </th>
                        <th>Outward Number</th>
                        <th>authority</th>
                        <th>Remark</th>
                        <th>View Document</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.iniciateDocument?.iniciateDocument?.filter((row)=>row.property_id==props?.property?.property?.id)?.map(
                        (document, index) => {
                          return (
                            <tr key={index}>
                              <td>{document?.id}</td>

                              <td>{document?.document_name}</td>
                              <td>{document?.document_date}</td>
                              <td>{document?.outward_number}</td>
                              <td>{document?.authority}</td>
                              <td></td>

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
                                  View Document
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
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDocument);
