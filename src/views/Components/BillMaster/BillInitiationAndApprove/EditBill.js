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
} from "reactstrap";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
// import { editPaymentMaster } from "../../../Redux/Creators/PaymentMasterCreators";

function EditBill(props) {
  console.log(props,"ssssssssss")
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
    //   id: props?.data?.id,
    //   company_detail_id: values.company_detail_id,
    //   account_no: values.account_no,
    //   account_name: values.account_name,
    //   ifsc_code: values.ifsc_code,
    //   account_type: values.account_type,
    //   amount: null,
    //   remark: null,
    //   qr_code: values.qr_code,
    };

    // props.editPaymentMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit" placement="left">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1 ml-1"
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
            <strong>Edit Bill</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
            //   company_detail_id: props?.data?.company_detail_id,
            //   company_name: props?.data?.company_detail?.company_detail,
            //   account_no: props?.data?.account_no,
            //   account_name: props?.data?.account_name,
            //   ifsc_code: props?.data?.ifsc_code,
            //   account_type: props?.data?.account_type,
            //   amount: props?.data?.amount,
            //   remark: props?.data?.remark,
            //   qr_code: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              company_detail_id: Yup.string().required(
                "Company Name is required"
              ),
              account_no: Yup.string().required("Account Number is required"),
              account_name: Yup.string().required("Account Name are required"),
              ifsc_code: Yup.string().required("IFSC code is required"),
              account_type: Yup.string().required("Account Type is required"),
            })}
          >
            {(formProps) => {
              const companyProps = {
                options: props?.companies?.isLoading
                  ? []
                  : props?.companies?.companies?.data?.map(
                      (company) => company
                    ),
              };
              return (
                <Form>


                  <Divider />

                  <Row className="p-4">
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
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    companies: state.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBill);
