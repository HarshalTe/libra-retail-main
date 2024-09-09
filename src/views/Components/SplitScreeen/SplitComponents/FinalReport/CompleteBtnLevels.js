import React from "react";

import { connect } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

//*
import { completeProperty } from "../../../../../Redux/Creators/PropertiesCreators";

import Swal from "sweetalert2";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Form, Formik } from "formik";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { baseUrl } from "./../../../../../shared/baseURL";
import { assignPropertyPost } from "../../../../../Redux/Creators/AssignPropertyCreators";

import { useParams } from "react-router-dom";
import moment from "moment";

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

function CompleteBtnLevels(props) {
  const token = props.login?.login?.token;

  const param = useParams();

  
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

  let assigned_to_id
  if (props.login?.login?.user?.role=="Level-1") {
      assigned_to_id = props?.users?.users?.data?.filter((item) => {
          return (
            (item?.role == "Level-2" 
        ))
      })
  }
  else if (props.login?.login?.user?.role=="Site Inspector"){
    assigned_to_id = props?.users?.users?.data?.filter((item) => {
        return (
          (item?.role == "Level-1" 
      ))
    })
    console.log("assigned_to_id",assigned_to_id,props?.users?.users?.data)
  } 
  else if (props.login?.login?.user?.role=="Level-2"){
    assigned_to_id = props?.users?.users?.data?.filter((item) => {
        return (
          (item?.role == "Level-3" 
      ))
    })
    console.log("assigned_to_id",assigned_to_id,props?.users?.users?.data)
  } 
  else {
    assigned_to_id=[]
  }
  console.log("assigned_to_id", assigned_to_id);

  let assignId=assigned_to_id?.length<0
  ?assigned_to_id.find(pin => pin.user_pincodes.some(userPincode => userPincode.pincode == props?.property?.property?.pincode) && 
  pin.banks.some(bank => bank.bank_name === props?.property?.property?.bank?.bank_name)
   && pin.branch_master.company_detail_id == props?.property?.property?.company_detail_id)
  :assigned_to_id

  const assignId2 =
  assigned_to_id?.length > 0
    ? assigned_to_id.filter(pin =>
        pin?.banks?.some(
          bank => bank?.bank_name === props?.property?.property?.bank?.bank_name
        )
         &&
        pin?.user_pincodes?.some(
          userPincode => userPincode?.pincode === props?.property?.property?.pincode
        ) 
        &&
        pin?.branch_master?.company_detail_id === props?.property?.property?.company_detail_id
      )
    : [];

    const randomIndex = Math.floor(Math.random() * assignId2.length);
const randomObject = assignId2[randomIndex];

console.log("assigned_to_id",randomObject)


  console.log("assigned_to_id",assignId2,"4",assigned_to_id,"4",assignId,props?.property?.property?.bank?.bank_name,props?.property?.property?.pincode)
  

  const approveAll = () => {

    if (randomObject) {
      let data = {
          token: token,
          property_id: param.id,
          assigned_to: randomObject?.id ,
          completed_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        console.log("assigned_to_id",data)
      props.assignPropertyPost(data);
      console.log("assigned_to_id",assignId)
    } else {
      console.log("assigned_to_id",assignId)
      swalWithBootstrapButtons
      .fire({
        title: "Bank And Pincode or Branch Did'nt Match To Users",
        icon: "warning",
        // showCancelButton: true,
        // confirmButtonText: "Yes, Delete!",
        // cancelButtonText: "No, cancel!",
        reverseButtons: false,
      })  
    
    }
    

  };
  const handleSubmit = (values, { setSubmitting }) => {
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
        // Swal.fire({
        //   title: "Thank you for your feedback!",
        //   text: "",
        //   icon: "success",
        //   confirmButtonText: "OK",
        // });
      })
      .catch((err) => {
        console.log("err", err);
        setSubmitting(false);
      });
    // props.completeProperty(user);
    approveAll()

    return;
  };

  return (
    <div  style={{"display": "flex","align-items": "center"}}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          toggle();
          // handleSubmit()
          // swalWithBootstrapButtons
          //   .fire({
          //     title: "Do You want to Complete This Case?",
          //     icon: "question",
          //     showCancelButton: true,
          //     confirmButtonText: "Yes, Complete!",
          //     html:
          //       "You can use <b>bold text</b>, " +
          //       '<a href="//sweetalert2.github.io">links</a> ' +
          //       "and other HTML tags",
          //     cancelButtonText: "No, cancel!",
          //     reverseButtons: false,
          //   })
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     approveAll();
            //   }
            // });
        }}
      >
        Complete Case
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={"modal-md"}>
        <ModalHeader toggle={toggle}>Give Rating to User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
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
                <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
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
    users: state.users,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeProperty: (data) => dispatch(completeProperty(data)),
    assignPropertyPost: (data) => dispatch(assignPropertyPost(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteBtnLevels);
