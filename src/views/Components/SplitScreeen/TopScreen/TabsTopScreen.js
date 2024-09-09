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
import { Card, CardBody, CardHeader } from "reactstrap";

//* Compoenets
import Documents from "../AllTabs/Documents/Documents";
import Photos from "../AllTabs/Photos/Photos";
import PropertyDocument from "../AllTabs/Documents/PropertyDocument";

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

function TabsTopScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
    // <Box
    //   className={classes.root}
    //   sx={{
    //     bgcolor: "background.paper",
    //     width: 500,
    //     position: "relative",
    //     minHeight: 200,
    //   }}
    // >
    <Card>
      <CardHeader className="ml-2 mr-2 mt--2 mb-3 bg-info text-white"></CardHeader>
      <CardBody className="px-0">
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
            <Tab label="Photos" {...a11yProps(0)} />
            <Tab label="Documents" {...a11yProps(1)} />
            {/* <Tab label="Properties & Project Documents" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Photos setValue={setValue} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Documents setValue={setValue} />
          </TabPanel>
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
            <PropertyDocument setValue={setValue} />
          </TabPanel> */}
        </SwipeableViews>
        <SpeedDials />
      </CardBody>
    </Card>
    // </Box>
  );
}

export default TabsTopScreen;
