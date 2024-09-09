import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SpeedDials from "./SpeedDials";

//*Components
import CaseDetails from "../../AllTabs/CaseDetails/CaseDetails";
import UnitDetails from "../../AllTabs/UnitDetails/UnitDetails";
import Occupation from "../../AllTabs/Occupation/Occupation";
import Specifications from "../../AllTabs/Specifications/Specifications";
import Surroundings from "../../AllTabs/Surroundings/Surroundings";
import ProjectStage from "../../AllTabs/ProjectStage/ProjectStage";
import ComponentContext from "../../CompoenetContext";
import SiteEngineer2 from "../SiteEngineer2/SiteEngineer2";

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


function SiteErTabs1(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { component, setComponent } = React.useContext(ComponentContext);
  if (value===6) {
    setComponent(<SiteEngineer2 />);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log("objectvalue",value)

  return (
    <Box className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="none" // Removes the blue underline
          textColor="primary"
          variant="scrollable"
          // scrollButtons="auto"
          aria-label="scrollable auto tabs example" 
        >
          <Tab label="Case Details" {...a11yProps(0)}
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '25px',
            marginRight: '8px',
            padding: '6px 12px',
            minHeight: '48px',
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
          }} />
          <Tab
  label="Unit Details"
  {...a11yProps(1)}
  sx={{
    border: '2px solid #1976d2',
    borderRadius: '25px',
    marginRight: '8px',
    padding: '6px 12px',
    minHeight: '48px',
    '&.Mui-selected': {
      backgroundColor: '#1976d2',
      color: 'white',
    },
  }}
/>
          <Tab label="Occupation" {...a11yProps(2)} 
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '25px',
            marginRight: '8px',
            padding: '6px 12px',
            minHeight: '48px',
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: 'white',
            },
          }}/>
          <Tab label="Specification" {...a11yProps(3)}sx={{
    border: '2px solid #1976d2',
    borderRadius: '25px',
    marginRight: '8px',
    padding: '6px 12px',
    minHeight: '48px',
    '&.Mui-selected': {
      backgroundColor: '#1976d2',
      color: 'white',
    },
  }} />
          <Tab label="Surrounding" {...a11yProps(4)} sx={{
    border: '2px solid #1976d2',
    borderRadius: '25px',
    marginRight: '8px',
    padding: '6px 12px',
    minHeight: '48px',
    '&.Mui-selected': {
      backgroundColor: '#1976d2',
      color: 'white',
    },
  }} />
          <Tab label=" Project Stage/ Flat Configuration" {...a11yProps(5)} sx={{
    border: '2px solid #1976d2',
    borderRadius: '25px',
    marginRight: '8px',
    padding: '6px 12px',
    minHeight: '48px',
    '&.Mui-selected': {
      backgroundColor: '#1976d2',
      color: 'white',
    },
  }} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CaseDetails setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UnitDetails setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Occupation setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Specifications setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <Surroundings setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <ProjectStage setValue={setValue} />
        </TabPanel>
        <SpeedDials modal2={props.modal2} toggle2={props.toggle2} />
      </SwipeableViews>
    </Box>
  );
}

export default SiteErTabs1;
