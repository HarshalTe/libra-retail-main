import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Table,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
// import CustomInput from "../views/custom/CustomInput";
import * as Yup from "yup";
import { GoMail } from "react-icons/go";
// import * as actions from "../redux/action";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { registerUser } from "../Redux/Creators/RegisterUserCreators";
import history from "../myCreatedHistory";
import CustomInput from "../views/Components/Custom/CustomInput";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { Switch } from "react-router-dom";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  registerUser: (data, toggle) => {
    dispatch(registerUser(data, toggle));
  },
});
const RegisterUser = (props) => {
  const mainContent = React.useRef(null);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const toggle = () => {
    history.push(`/login`);
    window.location.reload();
    // navigate("/login");
  };
  const handleSubmit = (values, setSubmitting) => {
    // let data = {
    //   name: values.name,
    //   email: values.email,
    //   role: values.role,
    //   status: values.status,
    //   password: values.password,
    //   password_confirmation: values.password_confirmation,
    //   mobile_no: values.mobile_no,
    //   designation: values.designation,
    //   join_date: values.join_date,
    //   pincode: values.pincode,
    //   marksheet: values.marksheet,
    //   kyc: values.kyc,
    //   personal_contact: values.personal_contact,
    //   father_contact: values.father_contact,
    //   mother_contact: values.mother_contact,
    //   adhaar_card_file: values.adhaar_card_file,
    //   pancard_file: values.pancard_file,
    //   cv_file: values.cv_file,
    //   offerletter: values.offerletter,
    //   city: values.city,
    // };
    let data = new FormData();

data.append('name', values.name);
data.append('email', values.email);
data.append('role', values.role);
data.append('status', values.status);
data.append('password', values.password);
data.append('password_confirmation', values.password_confirmation);
data.append('mobile_no', values.mobile_no);
data.append('designation', values.designation);
data.append('join_date', values.join_date);
data.append('pincode', values.pincode);
data.append('marksheet', values.marksheet);
data.append('kyc', values.kyc);
data.append('personal_contact', values.personal_contact);
data.append('father_contact', values.father_contact);
data.append('mother_contact', values.mother_contact);
data.append('adhaar_card_file', values.adhaar_card_file);
data.append('pancard_file', values.pancard_file);
data.append('cv_file', values.cv_file);
data.append('offerletter', values.offerletter);
data.append('city', values.city);
    // dispatch(actions.registerUser(data, toggle));
    props.registerUser(data, toggle);
    setSubmitting(false);
    return;
  };
  return (
    <React.Fragment>
      <div className="main-content" style={{"background-color": "#172b4d"}} ref={mainContent}>
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--9 pb-5">
          <Row className="justify-content-center">
            <Switch>
              <>
                <Col lg="10" md="7">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-1 text-blue h2"></CardHeader>

                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Register</small>
                      </div>
                      <Formik
                        initialValues={{
                          name: "",
                          email: "",
                          role: "",
                          status: "",
                          password: "",
                          password_confirmation: "",
                          mobile_no: "",
                          designation: "",
                          join_date: "",
                          pincode: "",
                          marksheet: "",
                          kyc: "",
                          personal_contact: "",
                          father_contact: "",
                          mother_contact: "",
                          adhaar_card_file: "",
                          pancard_file: "",
                          cv_file: "",
                          offerletter: "",
                          city: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                          name: Yup.string().required("Name is required"),
                          email: Yup.string().required("Email is required"),
                          role: Yup.string().required("Role is required"),
                          status: Yup.string().required("Status is required"),
                          password: Yup.string().required(
                            "Password is required"
                          ),
                          password_confirmation: Yup.string().oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                          ),
                          mobile_no: Yup.string().required(
                            "Mobile No. is required"
                          ),
                          designation: Yup.string().required(
                            "Designation is required"
                          ),
                          join_date: Yup.string().required(
                            "Joining Date is required"
                          ),
                        })}
                      >
                        {(formProps) => (
                          <Form role="form">
                            <Row>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  variant="outlined"
                                  size="small"
                                  label="Name"
                                  id="name"
                                  name="name"
                                  value={formProps.values.name}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.name &&
                                    Boolean(formProps.errors.name)
                                  }
                                  helperText={
                                    formProps.touched.name &&
                                    formProps.errors.name
                                  }
                                />
                              </Col>

                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  type="email"
                                  size="small"
                                  variant="outlined"
                                  id="email"
                                  name="email"
                                  label="Email"
                                  value={formProps.values.email}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.email &&
                                    Boolean(formProps.errors.email)
                                  }
                                  helperText={
                                    formProps.touched.email &&
                                    formProps.errors.email
                                  }
                                />
                              </Col>

                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  select
                                  variant="outlined"
                                  id="role"
                                  name="role"
                                  label="Role"
                                  value={formProps.values.role}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.role &&
                                    Boolean(formProps.errors.role)
                                  }
                                  helperText={
                                    formProps.touched.role &&
                                    formProps.errors.role
                                  }
                                >
                                  <MenuItem value={""}>Select</MenuItem>
                                  <MenuItem value={"Site Inspector"}>
                                    Site Inspector
                                  </MenuItem>
                                  <MenuItem value={"Level-1"}>Level-1</MenuItem>
                                  <MenuItem value={"Level-2"}>Level-2</MenuItem>
                                  <MenuItem value={"Level-3"}>Level-3</MenuItem>
                                  <MenuItem value={"admin"}>Admin</MenuItem>
                                  <MenuItem value={"Master"}>Master</MenuItem>
                                  <MenuItem value={"Bill-1"}>
                                    Bill Level-1
                                  </MenuItem>
                                  <MenuItem value={"Bill-2"}>
                                    Bill Level-2
                                  </MenuItem>
                                  <MenuItem value={"Bill-3"}>
                                    Bill Level-3
                                  </MenuItem>
                                  <MenuItem value={"Auditor"}>Auditor</MenuItem>
                                  <MenuItem value={"Auditor"}>Bank</MenuItem>
                                  <MenuItem value={"others"}>Others</MenuItem>
                                </TextField>
                              </Col>

                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  select
                                  variant="outlined"
                                  id="status"
                                  name="status"
                                  label="Status"
                                  value={formProps.values.status}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.status &&
                                    Boolean(formProps.errors.status)
                                  }
                                  helperText={
                                    formProps.touched.status &&
                                    formProps.errors.status
                                  }
                                >
                                  <MenuItem value={""}>Select</MenuItem>
                                  <MenuItem value={1}>Active</MenuItem>
                                  <MenuItem value={0}>InActive</MenuItem>
                                </TextField>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                    fullWidth
                                    // allowKeyboardControl={false}
                                    id="join_date"
                                    name="join_date"
                                    required
                                    label="Joning Date"
                                    inputVariant="outlined"
                                    // orientation="landscape"
                                    showTodayButton={true}
                                    // variant="inline"
                                    format="MM/dd/yyyy"
                                    size="large"
                                    value={formProps.values.join_date}
                                    onChange={(value) =>
                                      formProps.setFieldValue(
                                        "join_date",
                                        moment(value).format("YYYY-MM-DD")
                                      )
                                    }
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                    error={
                                      formProps.touched.join_date &&
                                      Boolean(formProps.errors.join_date)
                                    }
                                    helperText={
                                      formProps.touched.join_date &&
                                      formProps.errors.join_date
                                    }
                                  />
                                </MuiPickersUtilsProvider>
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="designation"
                                  name="designation"
                                  label="Designation"
                                  value={formProps.values.designation}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.designation &&
                                    Boolean(formProps.errors.designation)
                                  }
                                  helperText={
                                    formProps.touched.designation &&
                                    formProps.errors.designation
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="mobile_no"
                                  name="mobile_no"
                                  label="Mobile Number"
                                  value={formProps.values.mobile_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.mobile_no &&
                                    Boolean(formProps.errors.mobile_no)
                                  }
                                  helperText={
                                    formProps.touched.mobile_no &&
                                    formProps.errors.mobile_no
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="personal_contact"
                                  name="personal_contact"
                                  label="Personal Contact"
                                  value={formProps.values.personal_contact}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.personal_contact &&
                                    Boolean(formProps.errors.personal_contact)
                                  }
                                  helperText={
                                    formProps.touched.personal_contact &&
                                    formProps.errors.personal_contact
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="father_contact"
                                  name="father_contact"
                                  label="Father Contact"
                                  value={formProps.values.father_contact}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.father_contact &&
                                    Boolean(formProps.errors.father_contact)
                                  }
                                  helperText={
                                    formProps.touched.father_contact &&
                                    formProps.errors.father_contact
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="mother_contact"
                                  name="mother_contact"
                                  label="Mother Contact"
                                  value={formProps.values.mother_contact}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.mother_contact &&
                                    Boolean(formProps.errors.mother_contact)
                                  }
                                  helperText={
                                    formProps.touched.mother_contact &&
                                    formProps.errors.mother_contact
                                  }
                                />
                              </Col>

                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="pincode"
                                  name="pincode"
                                  label="Pincode"
                                  value={formProps.values.pincode}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.pincode &&
                                    Boolean(formProps.errors.pincode)
                                  }
                                  helperText={
                                    formProps.touched.pincode &&
                                    formProps.errors.pincode
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="city"
                                  name="city"
                                  label="City"
                                  value={formProps.values.city}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.city &&
                                    Boolean(formProps.errors.city)
                                  }
                                  helperText={
                                    formProps.touched.city &&
                                    formProps.errors.city
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <Label>KYC Document</Label>
                                <TextField
                                  type="file"
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="kyc"
                                  name="kyc"
                                  value={formProps.values.kyc}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.kyc &&
                                    Boolean(formProps.errors.kyc)
                                  }
                                  helperText={
                                    formProps.touched.kyc &&
                                    formProps.errors.kyc
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <Label>Marksheet</Label>
                                <TextField
                                  type="file"
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="marksheet"
                                  name="marksheet"
                                  value={formProps.values.marksheet}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.marksheet &&
                                    Boolean(formProps.errors.marksheet)
                                  }
                                  helperText={
                                    formProps.touched.marksheet &&
                                    formProps.errors.marksheet
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <Label>Offer Letter</Label>
                                <TextField
                                  type="file"
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="offerletter"
                                  name="offerletter"
                                  value={formProps.values.offerletter}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.offerletter &&
                                    Boolean(formProps.errors.offerletter)
                                  }
                                  helperText={
                                    formProps.touched.offerletter &&
                                    formProps.errors.offerletter
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <Label>Adhaar Card</Label>
                                <TextField
                                  type="file"
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="adhaar_card_file"
                                  name="adhaar_card_file"
                                  value={formProps.values.adhaar_card_file}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.adhaar_card_file &&
                                    Boolean(formProps.errors.adhaar_card_file)
                                  }
                                  helperText={
                                    formProps.touched.adhaar_card_file &&
                                    formProps.errors.adhaar_card_file
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <Label>Pancard Card</Label>
                                <TextField
                                  type="file"
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="pancard_file"
                                  name="pancard_file"
                                  value={formProps.values.pancard_file}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.pancard_file &&
                                    Boolean(formProps.errors.pancard_file)
                                  }
                                  helperText={
                                    formProps.touched.pancard_file &&
                                    formProps.errors.pancard_file
                                  }
                                />
                              </Col>
                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <Label>CV File</Label>
                                <TextField
                                  type="file"
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  id="cv_file"
                                  name="cv_file"
                                  value={formProps.values.cv_file}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.cv_file &&
                                    Boolean(formProps.errors.cv_file)
                                  }
                                  helperText={
                                    formProps.touched.cv_file &&
                                    formProps.errors.cv_file
                                  }
                                />
                              </Col>

                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  type="password"
                                  size="small"
                                  variant="outlined"
                                  id="password"
                                  name="password"
                                  label="Password"
                                  value={formProps.values.password}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.password &&
                                    Boolean(formProps.errors.password)
                                  }
                                  helperText={
                                    formProps.touched.password &&
                                    formProps.errors.password
                                  }
                                />
                              </Col>

                              <Col md={6} style={{ paddingBottom: "20px" }}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  variant="outlined"
                                  type="password"
                                  id="password_confirmation"
                                  name="password_confirmation"
                                  label="Confirm Password"
                                  value={formProps.values.password_confirmation}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.password_confirmation &&
                                    Boolean(
                                      formProps.errors.password_confirmation
                                    )
                                  }
                                  helperText={
                                    formProps.touched.password_confirmation &&
                                    formProps.errors.password_confirmation
                                  }
                                />
                              </Col>
                            </Row>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id=" customCheckLogin"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor=" customCheckLogin"
                              >
                                <span className="text-muted">Remember me</span>
                              </label>
                            </div>
                            <div className="text-center">
                              {/* <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                      disabled={formProps.isSubmitting}
                    >
                      Sign in
                    </Button> */}
                              <Button
                                className="my-4"
                                type="submit"
                                disabled={formProps.isSubmitting}
                                color="primary"
                              >
                                Register
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <Link
                        className="text-light"
                        to="/forgot-password"
                        style={{ textDecoration: "none" }}
                      >
                        {/* <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            > */}
                        <small>Forgot password?</small>
                        {/* </a> */}
                      </Link>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link
                        className="text-right"
                        to="/register-user"
                        xs="6"
                        style={{ textDecoration: "none" }}
                      >
                        {/* <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            > */}
                        <small>Create new account</small>
                        {/* </a> */}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </>
            </Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </React.Fragment>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
