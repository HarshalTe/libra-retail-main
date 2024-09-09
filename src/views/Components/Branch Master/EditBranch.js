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
  Label
} from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editBranchMaster } from "../../../Redux/Creators/BranchMasterCreators";

function EditBranch(props) {
  const token = props.login?.login?.token;
console.log("props1121",props)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    
    let data = {
        id:props?.data?.id,
        company_detail_id:values.company_detail_id,
        company_detail:values.company_detail,
        account: values.account,
        ifsc_code: values.ifsc_code,
        gstin: values.gstin,
        pan: values.pan,
        state_code: values.state_code,
        state: values.state,
        sac: values.sac,
        composition_scheme: values.composition_scheme,
        msme_no: values.msme_no,
        encl: values.encl,
        branch_name: values.branch_name,
    };
    console.log("Values In Upload file:wwwwww",data, values);

    props.editBranchMaster(data, token);
    setSubmitting(true);
    setModal(false);
  };

  return (
    <div>
      <Tooltip title="Edit Libra Branch" placement="right" className="m-2" style={{float:"right"}}>
      <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
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
            <strong>Edit Libra Branch</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
                // employee_id: props?.data?.employee_id,
                company_detail_id: props?.data?.company_detail_id,
                company_detail: "2",
                account: props?.data?.account,
                ifsc_code: props?.data?.ifsc_code,
                gstin: props?.data?.gstin,
                pan: props?.data?.pan,
                state_code: props?.data?.state_code,
                state: props?.data?.state,
                sac: props?.data?.sac,
                composition_scheme: props?.data?.composition_scheme,
                msme_no: props?.data?.msme_no,
                encl: props?.data?.encl,
                branch_name: props?.data?.branch_name
            //   file_upload:""
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   pincode: Yup.string().required("Pincode is required"),
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
                <Row>
                {console.log("formProps",formProps.values)}
                <Col md={12} className="">
                <Label>Company Detail</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      select
                      type="select"
                      size="small"
                      label="Company Detail"
                      id="company_detail_id"
                      name="company_detail_id"
                      value={formProps.values.company_detail_id}
                      onChange={formProps.handleChange}
                    >
                     <MenuItem value="">Select</MenuItem>
                    {props.companies?.companies?.data?.map((user , id)=>{
                      console.log("user.company_detail",user.company_detail)
                       return(
                      <MenuItem value={user.id}>{user.company_detail}</MenuItem>
                      )
                    })}
                  </TextField>
                  </Col>
                  <Col md={6} className="">
                    <Label>Branch Name</Label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Branch Name"
                        id="branch_name"
                        name="branch_name"
                        value={formProps.values.branch_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.branch_name &&
                          Boolean(formProps.errors.branch_name)
                        }
                        helperText={
                          formProps.touched.branch_name &&
                          formProps.errors.branch_name
                        }
                      />
                    </Col>
                  <Col md={6} className="">
                  <Label>Account No.</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Account No."
                      id="account"
                      name="account"
                      value={formProps.values.account}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.account &&
                        Boolean(formProps.errors.account)
                      }
                      helperText={
                        formProps.touched.account &&
                        formProps.errors.account
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>IFSC Code</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="IFSC Code"
                      id="ifsc_code"
                      name="ifsc_code"
                      value={formProps.values.ifsc_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.ifsc_code &&
                        Boolean(formProps.errors.ifsc_code)
                      }
                      helperText={
                        formProps.touched.ifsc_code &&
                        formProps.errors.ifsc_code
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>GSTIN</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="GSTIN"
                      id="gstin"
                      name="gstin"
                      value={formProps.values.gstin}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.gstin &&
                        Boolean(formProps.errors.gstin)
                      }
                      helperText={
                        formProps.touched.gstin &&
                        formProps.errors.gstin
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>PAN No.</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="PAN No."
                      id="pan"
                      name="pan"
                      value={formProps.values.pan}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.pan &&
                        Boolean(formProps.errors.pan)
                      }
                      helperText={
                        formProps.touched.pan &&
                        formProps.errors.pan
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>State Code</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="State Code"
                      id="state_code"
                      name="state_code"
                      value={formProps.values.state_code}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.state_code &&
                        Boolean(formProps.errors.state_code)
                      }
                      helperText={
                        formProps.touched.state_code &&
                        formProps.errors.state_code
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>State</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="State"
                      id="state"
                      name="state"
                      value={formProps.values.state}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.state &&
                        Boolean(formProps.errors.state)
                      }
                      helperText={
                        formProps.touched.state &&
                        formProps.errors.state
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>Sac</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Sac"
                      id="sac"
                      name="sac"
                      value={formProps.values.sac}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.sac &&
                        Boolean(formProps.errors.sac)
                      }
                      helperText={
                        formProps.touched.sac &&
                        formProps.errors.sac
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>Composition Scheme</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Composition Scheme"
                      id="composition_scheme"
                      name="composition_scheme"
                      value={formProps.values.composition_scheme}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.composition_scheme &&
                        Boolean(formProps.errors.composition_scheme)
                      }
                      helperText={
                        formProps.touched.composition_scheme &&
                        formProps.errors.composition_scheme
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>Msme no</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Msme no"
                      id="msme_no"
                      name="msme_no"
                      value={formProps.values.msme_no}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.msme_no &&
                        Boolean(formProps.errors.msme_no)
                      }
                      helperText={
                        formProps.touched.msme_no &&
                        formProps.errors.msme_no
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                  <Label>ENCL</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="ENCL"
                      id="encl"
                      name="encl"
                      value={formProps.values.encl}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.encl &&
                        Boolean(formProps.errors.encl)
                      }
                      helperText={
                        formProps.touched.encl &&
                        formProps.errors.encl
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
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    companies: state.companies, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editBranchMaster: (data,token) => dispatch(editBranchMaster(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBranch);
