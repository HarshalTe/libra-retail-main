import React from "react";
import { connect } from "react-redux";
import InitiatedCasesForm from "./InitiatedCasesForm";

//*Actions
import { getBranchesPage } from "../../../../Redux/Creators/BranchesCreators";
import { getProjects } from "../../../../Redux/Creators/ProjectsCreators";
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

function InitiatedCases(props) {
  const token = props.login?.login?.token;
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10000);
  React.useEffect(() => {
    let data = {
      pageno: page,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getBranchesPage(data);
    props.getProjects(data);
    props.getBankProductsList(data);
    props.getBankVerticalsList(data);
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
                <Tab label="Customer Detail" {...a11yProps(0)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <InitiatedCasesForm />
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
    getBranchesPage: (data) => dispatch(getBranchesPage(data)),
    getProjects: (data) => dispatch(getProjects(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),

    //!
    getBankProductsList: (data) => dispatch(getBankProductsList(data)),
    getBankVerticalsList: (data) => dispatch(getBankVerticalsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiatedCases);
