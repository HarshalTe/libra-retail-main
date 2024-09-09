import React from "react";

import { connect } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

//*
import { completeProperty } from "../../../../../Redux/Creators/PropertiesCreators";
import { completePropertyAdmin } from "../../../../../Redux/Creators/PropertiesCreators";

import Swal from "sweetalert2";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Form, Formik } from "formik";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { baseUrl } from "./../../../../../shared/baseURL";
import { useParams } from "react-router-dom";
import { getMatrixsList } from "../../../../../Redux/Creators/UserMatrixCreators";
import moment from "moment";
import { assignPropertyPost } from "../../../../../Redux/Creators/AssignPropertyCreators";


const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function CompleteButton(props) {
  const token = props.login?.login?.token;

  const param = useParams();
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;
  let data = {
    token: token,
  };
    props.getMatrixsList(data);
  };
  const rows = props.matrixs?.isLoading
  ? []
  : props.matrixs?.matrixs?.length > 0
  ? props.matrixs?.matrixs.filter(row =>
    row.property_type === props?.property?.property?.property_type)?.find(row =>
      row.user_id === props.login?.login?.user?.id)
  : [];


  
  const user = props?.users?.users?.data?.find((item) => {
    return (
      (item?.role ==  "Master"
  ))
})
console.log(rows,"rows")
console.log(user,"rows")

const approveFromMaster = () => {
    let data = {
        token: token,
        property_id: param.id,
        assigned_to: user?.id ,
        completed_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      console.log("assigned_to_id",data)
      console.log("assigned_to_id",user)
      props.assignPropertyPost(data);


};

  const approveAll = () => {
    let data = {
      token: token,
      property_id: props?.property?.property?.id,
      is_completed: 1,
      completed_date:new Date()
    };
    console.log("data", data);
  if (props?.login?.login?.user?.role == "admin") {
      props.completePropertyAdmin(data);
    } else {
      props.completeProperty(data);
    }
  };



  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  function reply(feel) {
    Swal.setActionValue(feel);
  }
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Email Ref:", values);
    setSubmitting(true);

    let user = {
      property_id: param.id,
      rating: value,
      review: values.review,
      user_id: props.login?.login?.user?.id,
    };

    axios
      .post(baseUrl + "ratings", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toggle();
        setSubmitting(false);
        Swal.fire({
          title: "Thank you for your feedback!",
          text: "",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.log("err", err);
        setSubmitting(false);
      });
      approveAll()
    // props.completeProperty(user);
    // if (rows?.limit > props?.property?.property?.valuation?.type?.property_value) {
    //   console.log("object master",rows.limit > props?.property?.property?.valuation?.type?.property_value , rows.limit , props?.property?.property?.valuation?.type?.property_value)
    //   approveFromMaster()
    // } else {
    //   console.log("object complete" , rows.limit > props?.property?.property?.valuation?.type?.property_value, rows.limit , props?.property?.property?.valuation?.type?.property_value)
    //   approveAll()
    // }
    
    return;
  };
  // console.log("object complete" , rows.limit < props?.property?.property?.valuation?.type?.property_value, rows.limit , props?.property?.property?.valuation?.type?.property_value)

  return (
    <div style={{"display": "flex","align-items": "center"}}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          toggle();
        }}
      >
        Complete Case
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={"modal-md"}>
        <ModalHeader toggle={toggle}>Give Rating to User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              subject: "",
              review: "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <Row>                
                  <Col md={12}  >
                  Assigned From: {props?.property?.property?.property_transactions?.[props?.property?.property?.property_transactions.length - 1]?.assigned_from?.name}
                  </Col>
                </Row>
                <Row className="form-group d-flex justify-content-center">
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={value}
                      precision={0.5}
                      getLabelText={getLabelText}
                      size="large"
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                      </Box>
                    )}
                  </Box>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="large"
                      label="Review"
                      id="review"
                      name="review"
                      value={formProps.values.review}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button
                      type="reset"
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      className="ml-3"
                      type="submit"
                      disabled={formProps.isSubmitting}
                    >
                      Submit
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
    property: state.property,
    users: state.users,
    matrixs: state.matrixs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatrixsList: (data) => dispatch(getMatrixsList(data)),
    completeProperty: (data) => dispatch(completeProperty(data)),
    assignPropertyPost: (data) => dispatch(assignPropertyPost(data)),
    completePropertyAdmin: (data) => dispatch(completePropertyAdmin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteButton);
