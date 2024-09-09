import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Component
import EditPhotos from "./EditPhotos";
import UploadOthers from "./UploadOthers";
import DeletePhotos from "./DeletePhotos";
import LinerLoader from "components/Loaders/LinerLoader";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import Swal from "sweetalert2";
import { editPropertyPhotos3 } from "../../../../../Redux/Creators/PropertyPhotographsCreators";
import { useDispatch } from "react-redux";
import printJS from "print-js";

function Photos(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  // const [checked, setChecked] = React.useState("");
  const token = props.login?.login?.token;

  const handleChange = (id,PhotoStatus) => {
    // setChecked(id);
    UpdateAll(id,PhotoStatus);
  };
  const formPropsLength = 2;
  const UpdateAll = (id,PhotoStatus) => {
    let data = {
      id: id,
      property_id: props?.property?.property?.id,
      is_ok: PhotoStatus,
    };
    swalWithBootstrapButtons
      .fire({
        title: "Do You want to Show this Photo in Final Report?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Show!",
        cancelButtonText: "No, cancel!",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          props.editPropertyPhotos3(data, token);
        }
      });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const printPdf = () => {
    printJS({
      printable: "htmlToPdf3",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "11pt",
      maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };

  return (
    <>
      {props?.propertyPhotographs?.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />

          <Formik
            initialValues={{
              //*
              audio: "",
              video: "",
              //*
              photographs: props?.property?.property?.photographs,
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => {
              console.log("photos", formProps.values.photographs);
              return (
                <Form>
                  <div className="">
                    <Box sx={{ width: "90%" }}>
                      <LinearProgressWithLabel
                        value={
                          (Object?.values(formProps?.values)?.filter(
                            (val) => val !== null && val?.length > 0
                          )?.length /
                            Object?.keys(formProps?.values)?.length) *
                          100
                        }
                      />
                    </Box>
                  </div>
                  {/* <Typography variant={"h5"}>Property Photograph</Typography> */}
                  {/* <Divider /> */}
                  <br />

                  <Row className="form-group">
                    <Typography variant={"h6"}>Site Engg Audio</Typography>
                    <Col md={2} className="pb-4">
                      <Button
                        variant="outlined"
                        size="medium"
                        component="label"
                      >
                        Upload
                        <TextField
                          type="file"
                          name="audio"
                          id="audio"
                          onChange={(e) =>
                            formProps.setFieldValue(
                              "audio",
                              e.currentTarget.files[0]
                            )
                          }
                          hidden
                        />
                      </Button>
                    </Col>
                    <Col md={2} className="pb-4">
                      <TextField
                        fullWidth
                        id="audio_description"
                        name="audio_description"
                        //   label="Audio description"
                        variant="standard"
                        //   disabled
                        value={formProps.values.audio.name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.audio.name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                    {/* </Row> */}
                    {/* <Row className="form-group"> */}
                    <Typography variant={"h6"}>Property Video</Typography>
                    <Col md={2} className="pb-4">
                      <Button
                        variant="outlined"
                        size="medium"
                        component="label"
                      >
                        Upload
                        <TextField
                          type="file"
                          name="video"
                          id="video"
                          onChange={(e) =>
                            formProps.setFieldValue(
                              "video",
                              e.currentTarget.files[0]
                            )
                          }
                          hidden
                        />
                      </Button>
                    </Col>
                    <Col md={2} className="pb-4">
                      <TextField
                        fullWidth
                        id="video_description"
                        name="video_description"
                        //   label="Video description"
                        variant="standard"
                        //   disabled
                        value={formProps.values.video.name}
                        onChange={formProps.handleChange}
                        onBlur={() => {
                          if (formProps.values.video.name)
                            setProgress(progress + 100 / formPropsLength);
                        }}
                      />
                    </Col>
                  </Row>

                  <Divider />
                  <br />
                  <Typography variant={"h6"}>Property Photograph</Typography>
                  <Divider />
                  <br />

                  <Row>
                    {formProps?.values?.photographs
                      ?.filter((photo) => photo?.name !== "others")
                      ?.map((photo) => (
                        <Col md={6} className="pb-4">
                          <Typography variant="h6">{photo?.name}</Typography>
                          <br />
                          <img alt=""
                            src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${photo?.file}`}
                            className="thumbnail pb-4"
                            style={{ width: "200px", height: "300px" }}
                          />
                          <div className="d-flex">
                            <EditPhotos data={photo} />

                            <DeletePhotos id={photo?.id} />
                          </div>
                        </Col>
                      ))}
                  </Row>

                  <br />
                  <Typography variant={"h6"}>Others</Typography>
                  <Divider />
                  <br />

                  <Row>
                    <Col md={6}>
                      <UploadOthers />
                    </Col>
                    <Col md={6}>
                       <Button
                        size="medium"
                        // className="ml-2"
                        variant="contained"
            color="success"
            onClick={printPdf}
            className="print-button w-20"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Photographs
          </Button>
                    </Col>
                  </Row>

                  <br />
<div style={{display:"none"}}>

                  <div id="htmlToPdf3" className="d-flex">
                        {props.property.property?.photographs
                          ?.filter((row) => row?.is_ok == 1)
                          ?.map((img, i) => {
                            return (
                              <div className="w-50">
                                <div className="w-80 pt-2 mr-auto ml-auto">
                                  {img.file != null ? (
                                    <>
                                      <img
                                        className="w-100"
                                        src={`https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${img?.file}`}
                                        alt=""
                                      />
                                      <p className="mt-4 m-0 p-1 ">
                                        {img.created_at}
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
</div>


                  <Row>
                    {formProps?.values?.photographs
                      ?.filter((photo) => photo?.name === "others")
                      .sort((a, b) => b.is_ok - a.is_ok)
                      .map((photo) => {
                        const imageUrl = `https://lvpl.in/librabackend/storage/app/public/PropertyPhotographs/${photo?.file}`;
                        const buttonText =
                          photo.is_ok === 1
                            ? "Remove From Report"
                            : "Display in Report";
                            let PhotoStatus = +!photo.is_ok
                        return (
                          <Col md={6} className="pb-4" key={photo.id}>
                            <img
                              src={imageUrl}
                              alt="Photograph"
                              className="thumbnail pb-4"
                              style={{ width: "280px", height: "300px" }}
                            />
                            <div className="d-flex">
                              <DeletePhotos id={photo?.id} />
                              <Button
                                size="small"
                                className="mr-5"
                                variant="contained"
                                color={
                                  photo.is_ok === 1 ? "success" : "error"
                                }
                                onClick={() => handleChange(photo?.id,PhotoStatus)}
                              >
                                {buttonText}
                              </Button>
                            </div>
                          </Col>
                        );
                      })}
                  </Row>

                  <br />
                  <Divider />
                  <br />

                  <Row className="form-group">
                    <Col>
                      <Button
                        // className="bg-gradient-info"
                        size="medium"
                        color="success"
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          props.setValue(1);
                          dispatch(ADD_ONE());
                        }}
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    propertyPhotographs: state.propertyPhotographs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPropertyPhotos3: (data, token) =>
      dispatch(editPropertyPhotos3(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
