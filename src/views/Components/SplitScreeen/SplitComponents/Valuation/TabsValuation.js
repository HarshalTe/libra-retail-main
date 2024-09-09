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
import RateCard from "../../RateCard";
import { Row, Col } from "reactstrap";
import Button from "@mui/material/Button";

//*components
import Valuation from "../../AllTabs/Valuation/Valuation";
import GraphConfig from "./GraphConfig";
import TableCompatable from "../../AllTabs/Valuation/CompatableTabLayout/TableCompatable";
import Documents from "../../../SplitScreeen/AllTabs/Documents/Documents";
import NearBroker from "../../AllTabs/BrokerDetails/NearBroker";
import HeatMap from "./HeatMap";
import ReadyReckner from "../../AllTabs/Valuation/ReadyReckner/ReadyReckner";
import Analog from "../Analog/Analog";
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


function TabsValuation() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [modal2, setModal2] = React.useState(false);

  const { component, setComponent } = React.useContext(ComponentContext);
  if (value===7) {
    setComponent(<Analog />);
  }

  const toggle2 = () => setModal2(!modal2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  console.log("valuevalue",value)
  return (
    <>
      <RateCard modal2={modal2} toggle2={toggle2} />
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
            <Tab label="Valuation" {...a11yProps(0)} />
            <Tab label="Documents" {...a11yProps(1)} />
            <Tab label="Ready Reckoner" {...a11yProps(2)} />
            <Tab label="Comparables" {...a11yProps(3)} />
            <Tab label="Graphs" {...a11yProps(4)} />
            <Tab label="Heat Map" {...a11yProps(6)} />
            <Tab label="Brokers" {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Valuation setValue={setValue} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Documents value={value} setValue={setValue} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ReadyReckner setValue={setValue} />
            <Row className="form-group pb-4">
              <Col>
                <Button
                  color="success"
                  variant="contained"
                  // disabled={formProps.isSubmitting}
                  fullWidth
                  onClick={() => setValue(3)}
                  type="submit"
                >
                  Next
                </Button>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <TableCompatable setValue={setValue} />
            <Row className="form-group pb-4">
              <Col>
                <Button
                  color="success"
                  variant="contained"
                  // disabled={formProps.isSubmitting}
                  fullWidth
                  onClick={() => setValue(4)}
                  type="submit"
                >
                  Next
                </Button>
              </Col>
            </Row>
            {/* <ComparableReport/> */}
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <GraphConfig setValue={setValue} />
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}>
            <HeatMap setValue={setValue} />
            <Row className="form-group pb-4">
              <Col>
                <Button
                  color="success"
                  variant="contained"
                  // disabled={formProps.isSubmitting}
                  fullWidth
                  onClick={() => setValue(6)}
                  type="submit"
                >
                  Next
                </Button>
              </Col>
            </Row>
          </TabPanel>
          <TabPanel value={value} index={6} dir={theme.direction}>
            <NearBroker setValue={setValue} />
            <Row className="form-group pb-4">
              <Col>
                <Button
                  color="success"
                  variant="contained"
                  // disabled={formProps.isSubmitting}
                  fullWidth
                  onClick={() => setValue(7)}
                  type="submit"
                >
                  Next
                </Button>
              </Col>
            </Row>
          </TabPanel>

          <SpeedDials modal2={modal2} toggle2={toggle2} />
        </SwipeableViews>
      </Box>
    </>
  );
}

export default TabsValuation;
