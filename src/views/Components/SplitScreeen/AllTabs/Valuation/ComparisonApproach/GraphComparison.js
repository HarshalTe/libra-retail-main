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
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
// import { editBrokersData } from "../../../Redux/Creators/BrokersCreators";

function GraphComparison(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Tooltip title="Edit" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Edit
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Valuation</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
        <ModalBody>
          <Formik
            initialValues={{
              //   id: props.data.row?.id,
              //   expense_name: props.data.row?.expense_name,
              // expense_type:props.data.row?.expense_type,
              // amount:props.data.row?.amount,
              // case_no:props.data.row?.case_no,
              // file_upload:props.data.row?.file_upload,
              // is_approved:props.data.row?.is_approved
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                
                  
                    <Col md={6} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Area as per Plan"
                        id="amount"
                        name="amount"
                        value={formProps.values.amount}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.amount &&
                          Boolean(formProps.errors.amount)
                        }
                        helperText={
                          formProps.touched.amount &&
                          formProps.errors.amount
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Area as per Site"
                        id="amount"
                        name="amount"
                        value={formProps.values.amount}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.amount &&
                          Boolean(formProps.errors.amount)
                        }
                        helperText={
                          formProps.touched.amount &&
                          formProps.errors.amount
                        }
                      />
                    </Col>
                    <Col md={6} className="">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Area as per Document"
                        id="amount"
                        name="amount"
                        value={formProps.values.amount}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.amount &&
                          Boolean(formProps.errors.amount)
                        }
                        helperText={
                          formProps.touched.amount &&
                          formProps.errors.amount
                        }
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
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // editBrokersData: (data) => dispatch(editBrokersData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphComparison);
