import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@mui/material/Select";

import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

//*Actions
import { postPropertiesData } from "../../../../Redux/Creators/PropertiesCreators";

//*Components
// import DedupeModal from "../Dedupe/DedupeModal";
import CreateProjects from "../../Projects/CreateProjects";
import DedupeTable from "../Dedupe/DedupeTable";

function FeesApproval(props) {
  //*
  const initiated_case_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "initiated_case_page"
  );
  let project_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "project_page"
  );
  const token = props.login?.login?.token;

  const [modal, setModal] = React.useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Create form", values);

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      user_id: props.login?.login?.user?.id,
      employee_id: props.login?.login?.user?.id,
      status: props.login?.login?.user?.status,
      prospect_no: values.prospect_no,
      project_id: values.project_id,
      customer_name: values.customer_name,
      surname: values.surname,
      contact_person_name: values.contact_person_name,
      contact_person_no: values.contact_person_no,
      location: values.location,
      legal_address: values.legal_address,
      state: values.state,
      city: values.city,
      pin_code: values.pin_code,
      country: values.country,
      tp_no: values.tp_no,
      survey_no: values.survey_no,
      fp_no: values.fp_no,
      sp_no: values.sp_no,
      op_no: values.op_no,
      plot_no: values.plot_no,
      block_no: values.block_no,
      flat_no: values.flat_no,
      khasra_no: values.khasra_no,
      nearby_landmark: values.nearby_landmark,
      latitude: values.latitude,
      longitude: values.longitude,
      postal_address: values.postal_address,
      remark: values.remark,
      remark2: values.remark2,
      vertical: values.vertical,
      product: values.product,
      bank_vertical_id: values.bank_vertical_id,
      bank_product_id: values.bank_product_id,
      branch_name: values.branch_name,
      branch_id: values.branch_id,
      bank_id: values.bank_id,
      bank_no: values.bank_no,
      inspection_date_time: values.inspection_date_time,
      document_details: [
        { document_name: "Pan Card", status: values.pancard_status },
        { document_name: "Adhar Card", status: values.adharcard_status },
        { document_name: "Tax Details", status: values.taxdetails_status },
        { document_name: "Index XI", status: values.index11_status },
        { document_name: "Sale Deed", status: values.saledeed_status },
        {
          document_name: "Sale Certificate",
          status: values.salecertificate_status,
        },
      ],
    };

    console.log("submit data", data);
    setModal(true);
    setSubmitting(false);
  };
  return (
    <div>
      <br />
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              //* Customer Dets
              customer_name: "",
              surname: "",
              contact_person_name: "",
              contact_person_no: "",
              location: "",
              legal_address: "",
              state: "",
              city: "",
              pin_code: "",
              country: "",
              tp_no: "",
              survey_no: "",
              fp_no: "",
              sp_no: "",
              op_no: "",
              plot_no: "",
              block_no: "",
              flat_no: "",
              khasra_no: "",
              nearby_landmark: "",
              latitude: "",
              longitude: "",
              postal_address: "",
              remark: "",
              remark2: "",

              //!

              //* Bank Dets
              branch_name: "",
              branch_id: "",
              bank_id: "",
              bank_no: "",
              prospect_no: "",
              //*
              project_name: "",
              project_id: "",
              //*
              documents_submitted: "",
              inspection_date_time: moment().format("YYYY-MM-DD"),

              vertical: "",
              product: "",
              //*
              bank_vertical_id: "",
              bank_product_id: "",
              //*
              document_attachment_name: "",
              file_upload: "",
              //!
              total: "",
              //*status

              pancard_status: 0,
              adharcard_status: 0,
              taxdetails_status: 0,
              index11_status: 0,
              saledeed_status: 0,
              salecertificate_status: 0,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => {
              const verticalsProps = {
                options: props?.bankVerticals?.isLoading
                  ? []
                  : props.bankVerticals.bankVerticals?.data?.map(
                      (vertical) => vertical
                    ),
              };
              const productProps = {
                options:
                  formProps.values.bank_vertical_id == ""
                    ? []
                    : props?.bankProducts?.bankProducts?.data
                        ?.filter(
                          (product) =>
                            formProps.values.bank_vertical_id ==
                            product.bank_vertical_id
                        )
                        ?.map((product) => product),
              };

              return (
                <Form>
                  {/* <Modal
                    className="modal-xl"
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                  >
                    <ModalHeader toggle={() => setModal(!modal)}>
                      <Typography>
                        <strong>Dedupe</strong>
                      </Typography>
                    </ModalHeader>
                    <Divider />
                    <ModalBody>
                      <DedupeTable data={formProps.values} />
                    </ModalBody>
                  </Modal> */}
                  <Typography variant={"h4"}>Fees Approval</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_vertical_id"
                          options={verticalsProps.options}
                          getOptionLabel={(vertical) =>
                            // `${project?.project_name} ${project?.id}`
                            vertical?.name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "bank_vertical_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_vertical_id &&
                                  formProps.errors.bank_vertical_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_vertical_id &&
                                formProps.errors.bank_vertical_id
                              }
                              label="Bank Vertical"
                              name="bank_vertical_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>

                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_product_id"
                          options={productProps.options}
                          getOptionLabel={(product) =>
                            // `${project?.project_name} ${project?.id}`
                            product?.name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "bank_product_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_product_id &&
                                  formProps.errors.bank_product_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_product_id &&
                                formProps.errors.bank_product_id
                              }
                              label="Bank Product"
                              name="bank_product_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                    <Col md={6} className="pb-4">
                      <TextField
                        fullWidth
                        id="total"
                        name="total"
                        label="Total"
                        variant="standard"
                        value={formProps.values.total}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.total &&
                          Boolean(formProps.errors.total)
                        }
                        helperText={
                          formProps.touched.total && formProps.errors.total
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Upload</Label>
                      <TextField
                        fullWidth
                        name="upload"
                        variant="outlined"
                        margin="normal"
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "upload",
                            e.currentTarget.files[0]
                          );
                        }}
                        type="file"
                        error={
                          formProps.touched.upload &&
                          Boolean(formProps.errors.upload)
                        }
                        helperText={
                          formProps.touched.upload && formProps.errors.upload
                        }
                      />
                    </Col>
                  </Row>

                  <Divider />
                  <br />

                  {initiated_case_page.create_status == "1" ? (
                    <Row>
                      <Button
                        color="success"
                        variant="contained"
                        disabled={formProps.isSubmitting}
                        fullWidth
                        type="submit"
                      >
                        Create
                      </Button>
                    </Row>
                  ) : (
                    ""
                  )}
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postPropertiesData: (data) => dispatch(postPropertiesData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeesApproval);
