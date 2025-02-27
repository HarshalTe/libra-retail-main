import React, { useEffect } from "react";
import { connect } from "react-redux";
// import InitiatedCasesForm from "./InitiatedCasesForm";

//*Actions
import { getBranchesList } from "../../../../Redux/Creators/BranchesCreators";
import { getProjectsList } from "../../../../Redux/Creators/ProjectsCreators";
import { getDropdownsList } from "../../../../Redux/Creators/DropdownCreators";
//*
import { getBankProductsList } from "../../../../Redux/Creators/BankProductsCreators";
import { getBankVerticalsList } from "../../../../Redux/Creators/BankVerticalsCreators";

//*Components
import PreLoader from "components/Loaders/PreLoader";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
// import FeesApproval from "./FeesApproval";
// import DocumentsUpload from "./DocumentsUpload";
// import CaseAllocationTable2 from "./CaseAllocationTable/CaseAllocationTable2";
import CaseAllocation from "./CaseAllocation";
import CaseAllocationTable2 from "./CaseAllocationTable/CaseAllocationTable2";
import SiteInspectorTable2 from "./SiteInspectorTable";
import CaseAllocationMap from "./CaseAllocationMap";
import EmployeeLocation from "./EmployeeLocation/EmployeeLocation";
import PropertiesLocation from "./PropertiesLocation/PropertiesLocation";

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
    padding: theme.spacing(2),
  },
}));

function CaseAllocation2(props) {
  const token = props.login?.login?.token;
  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.getBranchesList(data);
    props.getProjectsList(data);
    props.getBankProductsList(data);
    props.getBankVerticalsList(data);
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [modal2, setModal2] = React.useState(false);
  const toggle2 = () => setModal2(!modal2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      {props.branches.isLoading &&
      props.projects.isLoading &&
      props.bankVerticals.isLoading &&
      props.bankProducts.isLoading ? (
        <div>
          <PreLoader />
          {/* Loading... */}
        </div>
      ) : (
        <>
          {" "}
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
                <Tab label="Case Allocation Table" {...a11yProps(0)} />
                <Tab label="Site Inspector Table" {...a11yProps(1)} />
                <Tab label="User Live Location" {...a11yProps(2)} />
                <Tab label="live cases status" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <CaseAllocation />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <SiteInspectorTable2 />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                {/* <CaseAllocationMap /> */}
                <EmployeeLocation/>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                {/* <CaseAllocationMap /> */}
                <PropertiesLocation/>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    branches: state.branches,
    projects: state.projects,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranchesList: (data) => dispatch(getBranchesList(data)),
    getProjectsList: (data) => dispatch(getProjectsList(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),

    //!
    getBankProductsList: (data) => dispatch(getBankProductsList(data)),
    getBankVerticalsList: (data) => dispatch(getBankVerticalsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseAllocation2);