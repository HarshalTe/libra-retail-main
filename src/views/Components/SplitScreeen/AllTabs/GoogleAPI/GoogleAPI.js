import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";

//*Actions
import { editGoogleApiData } from "../../../../../Redux/Creators/GoogleApi";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes"
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";


function GoogleAPI(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  console.log(props,"ooooooo")
  const[train, setTrain]=React.useState([])
  const[bus, setBus]=React.useState([])
  const[hospital, setHospital]=React.useState([])
  const[school, setSchool]=React.useState([])
  const[college, setCollege]=React.useState([])
  const[btn, setBtn]=React.useState(false)

  
  const lat = props?.property?.property?.geo_tag?.lat
  const long = props?.property?.property?.geo_tag?.long
  const Api = "AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q"

  const handleGetLocation = () => {
  //   if (lat.length>0 & long.length>0) {
      
  //     const placesResponse =  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=train_station&key=${Api}`);
  //     console.log(placesResponse.data.results)
  //   // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=train_station&key=${Api}`)
  //   // .then((response) => {
  //   //   console.log(response);
  //   //   return response.json();
  //   // })
  //   // .then((data) => {
  //   //   console.log(data);
  //   //   setTrain(data.results);
  //   // })
  //   // .catch((error) => {
  //   //   console.error(error);
  //   //   setTrain("error");
  //   // });

  //   if (train.length>0) {
      
  //     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=bus_station&key=${Api}`)
  //         .then((response)=>{ response.json()
  //         })
  //           .then((resp)=>{ 
  //             setBus(resp.results)
  //           console.warn("response", resp.results)
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           // display an error message to the user
  //         });
  
  //           //hospital
  //     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=hospital&key=${Api}`)
  //     .then((response)=>{ response.json()
  //     })
  //       .then((resp)=>{ 
  //         setHospital(resp.results)
  //       console.warn("response", resp.results)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // display an error message to the user
  //     });
      
  //   //school
  //     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=school&key=${Api}`)
  //     .then((response)=>{ response.json()
  //     })
  //       .then((resp)=>{ 
  //         setSchool(resp.results)
  //       console.warn("response", resp.results)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // display an error message to the user
  //     });
  
  //     //  secondary_school
  
  //     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=secondary_school&key=${Api}`)
  //     .then((response)=>{ response.json()
  //     })
  //       .then((resp)=>{ 
  //         setCollege(resp.results)
  //       console.warn("response", resp.results)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // display an error message to the user
  //     });
  //   } else {
  //     // Swal.fire({
  //     //   position: "error",
  //     //   icon: "error",
  //     //   title: "Error Occured!",
  //     //   text: "CORS ERROR",
  //     //   showConfirmButton: true,
  //     // });
  //   }

  // } else {
  //   Swal.fire({
  //     position: "error",
  //     icon: "error",
  //     title: "Error Occured!",
  //     text: "Location Not Available",
  //     showConfirmButton: true,
  //   });
  // }
  };

  console.log(lat,long,"ooooooo",btn)
  // train
  // React.useEffect(()=>{
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=train_station&key=${Api}`)
  //   .then((response)=>{ response.json()
  //   })
  //     .then((resp)=>{ 
  //       setTrain(resp.results)
  //     console.warn("response", resp.results)
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     // display an error message to the user
  //   });
  // },[btn])
//   console.log(data,"train")
// //bus_station
//   React.useEffect(()=>{
//     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=bus_station&key=${Api}`)
//     .then((response)=>{ response.json()
//     })
//       .then((resp)=>{ 
//         setBus(resp.results)
//       console.warn("response", resp.results)
//     })
//     .catch((error) => {
//       console.error(error);
//       // display an error message to the user
//     });
//   },[])
//   console.log(bus,"bus")
//   //hospital
//   React.useEffect(()=>{
//     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=hospital&key=${Api}`)
//     .then((response)=>{ response.json()
//     })
//       .then((resp)=>{ 
//         setHospital(resp.results)
//       console.warn("response", resp.results)
//     })
//     .catch((error) => {
//       console.error(error);
//       // display an error message to the user
//     });
//   },[])
//   console.log(hospital,"hospital",hospital[0])
//   //school
//   React.useEffect(()=>{
//     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=school&key=${Api}`)
//     .then((response)=>{ response.json()
//     })
//       .then((resp)=>{ 
//         setSchool(resp.results)
//       console.warn("response", resp.results)
//     })
//     .catch((error) => {
//       console.error(error);
//       // display an error message to the user
//     });
//   },[])
//   console.log(school,"school")
//   //secondary_school
//   React.useEffect(()=>{
//     fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=secondary_school&key=${Api}`)
//     .then((response)=>{ response.json()
//     })
//       .then((resp)=>{ 
//         setCollege(resp.results)
//       console.warn("response", resp.results)
//     })
//     .catch((error) => {
//       console.error(error);
//       // display an error message to the user
//     });
//   },[])
  console.log(college,"college")
  const trainData =train[0]
  const busData=bus[0]
  const hospitalData=hospital[0]
  const schoolData=school[0]
  const collegeData=college[0]
  const trainKm=[]
  const busKm=[]
  const hospitalKm=[]
  const schoolKm=[]
  const collegeKm=[]


  const latTrain = trainData?.geometry?.viewport?.northeast?.lat
  const longTrain = trainData?.geometry?.viewport?.northeast?.lng
  console.log(latTrain,longTrain,"ooooooo",trainData)
  const latBus = busData?.geometry?.viewport?.northeast?.lat
  const longBus = busData?.geometry?.viewport?.northeast?.lng
  console.log(latBus,longBus,"ooooooo")
  const latHospital = hospitalData?.geometry.viewport.northeast.lat
  const longHospital = hospitalData?.geometry.viewport.northeast.lng
  console.log(latHospital,longHospital,"ooooooo")
  const latSchool = schoolData?.geometry.viewport.northeast.lat
  const longSchool = schoolData?.geometry.viewport.northeast.lng
  console.log(latSchool,longSchool,"ooooooo")
  const latCollege = collegeData?.geometry.viewport.northeast.lat
  const longCollege = collegeData?.geometry.viewport.northeast.lng
  console.log(latCollege,longCollege,"ooooooo")
//train
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    trainKm.push(d)
    console.log(d,'km2')
    return d;
  }
  getDistanceFromLatLonInKm(lat,long,latTrain,longTrain)

  //bus
  function bus_station(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    busKm.push(d)
    console.log(d,'km2')
    return d;
  }
  bus_station(lat,long,latBus,longBus)
  // hospital
  function hospital_api(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    hospitalKm.push(d)
    console.log(d,'km2')
    return d;
  }
  hospital_api(lat,long,latHospital,longHospital)
  // school
  function school_api(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    schoolKm.push(d)
    console.log(d,'km2')
    return d;
  }
  school_api(lat,long,latSchool,longSchool)
  // college
  function college_api(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    collegeKm.push(d)
    console.log(d,'km2')
    return d;
  }
  college_api(lat,long,latCollege,longCollege)
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
// console.log(data3,'km')



  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    
    let data = {
      // token: token,
      id: values.id,
      property_id: values.property_id,
      railway_station: values.railway_station,
      bus_stop: values.bus_stop,
      hospital: values.hospital,
      road: values.road,
      school: values.school,
      college: values.college,
      airport: values.airport,
    };
    
    const value = 4;
    
    let progressData = {
      id: props?.property?.property?.id,
      googleProgress: 1,
      
    }

    props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    props.editGoogleApiData(data, props.setValue, value, token);
    setSubmitting(false);
  };
  const formPropsLength = 6;
  const trainM=""+trainKm[0]
  const trainA=trainM.slice(0,3)

  console.log(trainM,"dddd",trainA)
  const busM=""+busKm[0]
  const busA=busM.slice(0,3)

  console.log(trainM,"dddd",trainA)
  const hospitalM=""+hospitalKm[0]
  const hospitalA=hospitalM.slice(0,3)

  console.log(trainM,"dddd",trainA)
  const schoolM=""+schoolKm[0]
  const schoolA=schoolM.slice(0,3)

  console.log(trainM,"dddd",trainA)
  const collegeM=""+collegeKm[0]
  const collegeA=collegeM.slice(0,3)

  console.log(trainM,"dddd",trainA)

  // const trainData= data[0]
  // const busData = bus[0]
  // const hospitalData = hospital[0]
  // const schoolData = school[0]
  // const collegeData = college[0]
  // console.log(trainData.geometry.location.lat,trainData.geometry.location.lng)
  // // const trainI=trainData.name
  // console.log(props.train.na?me,"hhh")

  
  return (
    <>
      {props.googleApi.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.google_api?.id,
              property_id:
               props?.property?.property?.id,
              railway_station:
              trainData?.name+" "+
              trainA+"KM",
                // props?.property?.property?.google_api?.railway_station,
              bus_stop:
               busData?.name+" "+
               busA+"KM",

              // props?.property?.property?.google_api?.bus_stop,
              hospital:
               hospitalData?.name+" "+
              hospitalA+"KM"
              ,
              // props?.property?.property?.google_api?.hospital,
              road: props?.property?.property?.google_api?.road,
              school:
              schoolData?.name+" "+
              schoolA+"KM",
              
              //  props?.property?.property?.google_api?.school,
              college: 
              collegeData?.name+" "+
              collegeA+"KM",
              airport:props?.property?.property?.google_api?.airport
              // props?.property?.property?.google_api?.college,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <div className="pb-4">
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel value={(Object?.values(formProps?.values)?.filter((val) => val !== null && val?.length > 0)?.length/Object?.keys(formProps?.values)?.length)*100} />
                    </Box>
                  </div>
                <Typography variant={"h5"}>Google API</Typography>
                <Button variant="contained" color="primary" onClick={handleGetLocation}>
      Click me!
    </Button>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Nearest railway station &#x1F4F1;"
                      variant="standard"
                      id="railway_station"
                      name="railway_station"
                      value={formProps.values.railway_station}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.railway_station)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Nearest bus stop &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      id="bus_stop"
                      name="bus_stop"
                      value={formProps.values.bus_stop}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.bus_stop)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Nearest hospital &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      id="hospital"
                      name="hospital"
                      value={formProps.values.hospital}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.hospital)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Nearest School &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      id="school"
                      name="school"
                      value={formProps.values.school}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.school)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={12} className="pb-4">
                    <TextField
                      fullWidth
                      label="Nearest college &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      id="college"
                      name="college"
                      value={formProps.values.college}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.college)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                <Col md={12} className="pb-4">
                  <TextField
                    fullWidth
                    label="Nearest Main Road/ Highway &#x1F4F1;"
                    // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                    variant="standard"
                    id="road"
                    name="road"
                    value={formProps.values.road}
                    onChange={formProps.handleChange}
                    onBlur={() => {
                      if (formProps.values.road)
                        setProgress(progress + 100 / formPropsLength);
                    }}
                  />
                </Col>
                <Col md={12} className="pb-4">
                  <TextField
                    fullWidth
                    label="Nearest Airport &#x1F4F1;"
                    // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                    variant="standard"
                    id="airport"
                    name="airport"
                    value={formProps.values.airport}
                    onChange={formProps.handleChange}
                    onBlur={() => {
                      if (formProps.values.airport)
                        setProgress(progress + 100 / formPropsLength);
                    }}
                  />
                </Col>
                </Row>

                <Divider />
                <br />

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={()=>dispatch(ADD_ONE())}

                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    googleApi: state.googleApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editGoogleApiData: (data, setValue, value, token) =>
      dispatch(editGoogleApiData(data, setValue, value, token)),
      editProgressData: (progressData, setValue, value,token) =>dispatch(editProgressData(progressData, setValue, value,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAPI);
