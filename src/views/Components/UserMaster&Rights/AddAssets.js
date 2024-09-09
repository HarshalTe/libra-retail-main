import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import DateFnsUtils from "@date-io/date-fns";

//*
import { assetsEditData } from "../../../Redux/Creators/AssetsCreators";
import { getAssetsList } from "../../../Redux/Creators/AssetsCreators";

import { getPincodesPage } from "Redux/Creators/PincodeCreators";

function AddAssets(props) {
  const token = props.login?.login?.token;
  console.log("Edit User:", props.data);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
  let data = {
    token: token,
  };
    props.getAssetsList(data);
  };
  let banksArray = [];

  props?.data?.banks?.map((bank) => banksArray.push(bank.id));

  console.log("bankArray", banksArray);
  let pincodesArray = [];

  props?.data?.user_pincodes?.map((pincode) => pincodesArray.push(pincode.pincode));

  console.log("bankArray", banksArray);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Edit Users:", values);
    let token = {
      id:values?.assets[0]?.id,
      token : props.login?.login?.token
    }

    const data = new FormData();
    data.append("user_id", props?.data?.id);
    data.append("id", values?.assets[0]?.id);
    // let data = {
    //   token: token,
    //   user_id: props?.data?.id,
    //   id:values?.assets[0]?.id
    // };

    props.assetsEditData(data,token);
    setSubmitting(true);
    setModal(false);
  };
  const rows =props.assets?.isLoading
  ? []
  : props.assets?.assets?.length > 0
  ? props.assets?.assets
  : [];

  return (
    <div>
      <Button
        size="small"
        className="ml-2"
        variant="contained"
        color="info"
        onClick={() => {
          setModal(!modal);
        }}
        startIcon={<EditIcon />}
      >
        Add Assets
      </Button>

      <Modal className="modal-lg" isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={toggle}>Add Assets To User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              //*
              assets: [],
              
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => {

              formProps.values.banks = banksArray;

              const pincodesProps = {
                options: props?.pincodes?.isLoading
                  ? []
                  : props?.pincodes?.pincodes?.data?.map((pincode) => pincode),

                };
                formProps.values.user_pincodes = pincodesArray
              return (
                <Form encType="multipart/form-data">
                  <Row>
                  
                    <Col md={12} className="pb-4">
                      <FieldArray
                        name="assets"
                        render={(arrayHelpers) => (
                          <div>
                            <Row>
                              <Col md={10}>
                              <TextField
                        fullWidth
                        required
                        size="small"
                        select
                        variant="outlined"
                        id="assets2"
                        name="assets2"
                        label="Assets"
                        value={formProps.values.assets2}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.assets2 &&
                          Boolean(formProps.errors.assets2)
                        }
                        helperText={
                          formProps.touched.assets2 && formProps.errors.assets2
                        }
                      >
                        <MenuItem value={""}>Select</MenuItem>
                        {rows?.map((row) => {
                                  return(

                                    <MenuItem value={row}>
                                    {row?.name}
                                  </MenuItem>
                                    )
                                })}
                      </TextField>
                              </Col>

                              <Col md={2}>
                                <Button
                                  color="success"
                                  variant="contained"
                                  onClick={() => {
                                    if (formProps.values.assets.length==0) {
                                      console.log(formProps.values.assets.length)
                                      
                                      arrayHelpers.push(formProps.values.assets2);
                                    } else {
                                      console.log(formProps.values.assets.length)
                                      
                                    }
                                    }}
                                  size="large"
                                >
                                  <AddIcon fontSize="medium" />
                                </Button>
                              </Col>
                            </Row>
                            <Table
                              size="sm"
                              className="mt-3"
                              bordered
                              style={{ textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th>Sr No.</th>
                                  <th>Assets</th>
                                </tr>
                              </thead>

                              <tbody>
                                {console.log(
                                  "values",
                                  formProps?.values?.assets,
                                )}
                                {formProps?.values?.assets?.map(
                                  (bank, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>

                                        <td>
                                          <TextField
                                            fullWidth
                                            disabled
                                            size="small"
                                            label="Assets"
                                            variant="outlined"
                                            name={`bank.${index}`}
                                            value={bank.name}
                                            id="assets"
                                          />
                                        </td>

                                        <td>
                                          <Button
                                            color="error"
                                            size="large"
                                            variant="outlined"
                                            onClick={() => {
                                              arrayHelpers.remove(index);
                                              formProps.values.banks.splice(
                                                index,
                                                1
                                              );
                                            }}
                                          >
                                            <DeleteIcon fontSize="medium" />
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

                  <br />

                  <br />

                  <Row style={{ justifyContent: "center" }}>
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

                    <Col>
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
    banks: state.banks,
    pincodes: state.pincodes,
    branchMaster: state.branchMaster,
    assets: state.assets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),
    assetsEditData: (data,token) => dispatch(assetsEditData(data,token)),
    getAssetsList: (data) => dispatch(getAssetsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAssets);
