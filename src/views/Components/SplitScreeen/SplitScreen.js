import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import SplitPane from "./SplitPane";
import { Divider } from "./Divider";
import { TopScreen } from "./TopScreen/TopScreen";
import { BottomScreen } from "./BottomScreen/BottomScreen";
import { LeftScreen } from "./LeftScreen/LeftScreen";
import { SplitPaneRight } from "./SplitPaneRight";
import "./splitscreen.css";
import ComponentContext from "./CompoenetContext";

//*
import ProjectDetails from "./SplitComponents/ProjectDetails/ProjectDetails";
import SiteEngineer1 from "./SplitComponents/SiteEngineer1/SiteEngineer1";
import LeftScreenFull from "./LeftScreenFull";
import RightScreenFull from "./RightScreenFull";
import TopScreenFull from "./TopScreenFull";
import BottomScreenFull from "./BottomScreeenFull";

//*Actions
import { getSingleProperty } from "../../../Redux/Creators/PropertiesCreators";
import { getProjectsList } from "../../../Redux/Creators/ProjectsCreators";
//*new
import { getProperty } from "../../../Redux/Creators/ViewWorkInProgressCreators";
import { getDropdownsList } from "../../../Redux/Creators/DropdownCreators";

//*Loder
import PreLoader from "components/Loaders/PreLoader";

function SplitScreen(props) {
  const Params = useParams();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
      id: Params.id,
    };
    props.getProperty(data);
    props.getProjectsList(data);
    props.getDropdownsList(data);
  };
  const [component, setComponent] = useState(
    <>
      <ProjectDetails />
    </>
  );
  // const { leftScreenFull } = useContext(SplitPaneContext);

  // console.log("pro", leftScreenFull);

  return (
    <div style={{ overflow: "hidden" }}>
      {props.property.isLoading && props?.projects?.isLoading ? (
        <PreLoader />
      ) : (
        <ComponentContext.Provider value={{ component, setComponent }}>
          <SplitPane className="split-pane-row">
            <LeftScreen />

            <RightScreenFull />
            <Divider className="separator-col" />
            <LeftScreenFull />

            <SplitPaneRight>
              <SplitPane className="split-pane-col">
                <TopScreen />
                <BottomScreenFull />
                <Divider className="separator-row" />
                <TopScreenFull />
                <BottomScreen />
              </SplitPane>
            </SplitPaneRight>
          </SplitPane>
        </ComponentContext.Provider>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // properties: state.properties,
    // propertyid: state.properties.propertyid,
    //*new
    property: state.property,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProperty: (data) => dispatch(getSingleProperty(data)),

    //*new
    getProperty: (data) => dispatch(getProperty(data)),

    //*
    getProjectsList: (data) => dispatch(getProjectsList(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplitScreen);
