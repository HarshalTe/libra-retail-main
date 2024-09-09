import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SpeedDials from "./SpeedDials";
import { connect } from "react-redux";


//* Components
import Observations from "../../AllTabs/Observations/Observations";
import Deviation from "../../AllTabs/Deviation/Deviation";
import NDMCParameter from "../../AllTabs/NDMCParameter/NDMCParameter";
import GoogleAPI from "../../AllTabs/GoogleAPI/GoogleAPI";
import Measurement from "../Measurement/Measurement";
import ComponentContext from "../../CompoenetContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  



  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

function SiteErTabs2(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const[train, setTrain]=React.useState([])
  const[bus, setBus]=React.useState([])
  const[hospital, setHospital]=React.useState([])
  const[school, setSchool]=React.useState([])
  const[college, setCollege]=React.useState([])

  const { component, setComponent } = React.useContext(ComponentContext);
  if (value===4) {
    setComponent(<Measurement />);
  }


  console.log(props,"hjhj")
  const lat = 19.0760
  const long = 72.8777
  // const lat = props?.property?.property?.geo_tag?.lat
  // const long = props?.property?.property?.geo_tag?.long
  console.log(lat,long,"ooooooo")
  // const latTrain = trainData?.geometry.viewport.northeast.lat
  // const longTrain = trainData?.geometry.viewport.northeast.lng
  // console.log(latTrain,longTrain,"ooooooo")
  // console.log(props,"ooooooo")
  // const apiMap = "AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q"
  const apiMap = ""

    //train
  // React.useEffect(()=>{
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=train_station&key=${apiMap}`)
  //   .then((result)=>{ result.json()
  //     .then((resp)=>{ 
  //       setTrain(resp.results)
  //     console.warn("result22", resp.results)
  //   })
  //   })
  // },[])
  // console.log(train,"train")
  // //bus_station
  // React.useEffect(()=>{
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=bus_station&key=${apiMap}`)
  //   .then((result)=>{ result.json()
  //     .then((resp)=>{ 
  //       setBus(resp.results)
  //     console.warn("result", resp.results)
  //   })
  //   })
  // },[])
  // console.log(bus,"bus")
  // //hospital
  // React.useEffect(()=>{
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=hospital&key=${apiMap}`)
  //   .then((result)=>{ result.json()
  //     .then((resp)=>{ 
  //       setHospital(resp.results)
  //     console.warn("result", resp.results)
  //   })
  //   })
  // },[])
  // console.log(hospital,"hospital",hospital[0])
  // //school
  // React.useEffect(()=>{
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=school&key=${apiMap}`)
  //   .then((result)=>{ result.json()
  //     .then((resp)=>{ 
  //       setSchool(resp.results)
  //     console.warn("result", resp.results)
  //   })
  //   })
  // },[])
  // console.log(school,"school")
  // //secondary_school
  // React.useEffect(()=>{
  //   fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=secondary_school&key=${apiMap}`)
  //   .then((result)=>{ result.json()
  //     .then((resp)=>{ 
  //       setCollege(resp.results)
  //     console.warn("result", resp.results)
  //   })
  //   })
  // },[])
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


  const latTrain = trainData?.geometry.viewport.northeast.lat
  const longTrain = trainData?.geometry.viewport.northeast.lng
  console.log(latTrain,longTrain,"ooooooo")
  const latBus = busData?.geometry.viewport.northeast.lat
  const longBus = busData?.geometry.viewport.northeast.lng
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Observations" {...a11yProps(0)} />
          <Tab label="Deviation" {...a11yProps(1)} />
          <Tab label="NDMA Parameters" {...a11yProps(2)} />
          <Tab label="Google API" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Observations setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Deviation setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <NDMCParameter setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <GoogleAPI setValue={setValue} trainKm={trainKm} busKm={busKm} hospitalKm={hospitalKm} schoolKm={schoolKm} collegeKm={collegeKm} 
          trainData={trainData} busData={busData} hospitalData={hospitalData} schoolData={schoolData} collegeData={collegeData} />
        </TabPanel>

        <SpeedDials toggle2={props.toggle2} modal2={props.modal2} />
      </SwipeableViews>
    </Box>
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

export default connect(mapStateToProps) (SiteErTabs2);
