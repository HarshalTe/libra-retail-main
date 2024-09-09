import React, { useState, useContext } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import LV from "../../../assets/libra_logo1.png";

//* Main Compoenet
import ComponentContext from "./CompoenetContext";
// import { LeftScreen } from "views/Components/SplitScreeen/LeftScreen/LeftScreen";

//* All Components
import ProjectDetails from "./SplitComponents/ProjectDetails/ProjectDetails";
import SiteEngineer1 from "./SplitComponents/SiteEngineer1/SiteEngineer1";
import SiteEngineer2 from "./SplitComponents/SiteEngineer2/SiteEngineer2";
import Measurement from "./SplitComponents/Measurement/Measurement";
import Valuation from "./SplitComponents/Valuation/Valuation";
import Analog from "./SplitComponents/Analog/Analog";
import Compliances from "./SplitComponents/Compliances/Compliances";
import Remark from "./SplitComponents/Remark/Remark";
import Annexure from "./SplitComponents/Annexure/Annexure";
import FinalReport from "./SplitComponents/FinalReport/FinalReport";
import "./active.css";

const SidebarMini = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [pageName, setPageName] = useState("ProjectDetails");
  // verifies if routeName is the one active (in browser input)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };



  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  // Variables and functions we use.

  const { component, setComponent } = useContext(ComponentContext);

  const selectComponet = (data) => {
    setComponent(data);
  };

  console.log("propsprops",pageName)

  return (
    <>
      {/* <Collapse isOpen="true"> */}

      {/* <NavbarToggler onClick={toggleNavbar} className="mr-3" />
      <Collapse isOpen={collapsed} navbar> */}

      {/* <Navbar> */}
      <Navbar
        // navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
        // id="MainMenu"
      >
        <div className="scroll-wrapper" style={{ position: "relative" }}>
          <div className="scroll-content">
            <Container fluid>
              {/* Brand */}
              {/* {logo ? "LIBRA VALUERS" : null} */}
              <img src={LV} style={{ height: "60px", width: "100%" }} />
              {/* Toggler */}
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleCollapse}
              >
                <span className="navbar-toggler-icon" />
              </button>

              {/* User */}
              <Nav className="align-items-center d-md-none">
                <UncontrolledDropdown nav>
                  <DropdownToggle nav className="nav-link-icon">
                    <i className="ni ni-bell-55" />
                  </DropdownToggle>
                  <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    className="dropdown-menu-arrow"
                    right
                  >
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={
                            require("../../../assets/img/theme/team-1-800x800.jpg")
                              .default
                          }
                        />
                      </span>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>

                    <DropdownItem divider />
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              {/* Collapse */}
              <Collapse navbar isOpen={collapseOpen}>
                {/* Collapse header */}
                <div className="navbar-collapse-header d-md-none">
                  <Row>
                    {logo ? (
                      <Col className="collapse-brand" xs="6">
                        LIBRA VALUERS
                      </Col>
                    ) : null}
                    <Col className="collapse-close" xs="6">
                      <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleCollapse}
                      >
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>

                {/* Navigation */}
                {/* <Nav navbar>{createLinks(routes)}</Nav> */}

                <PerfectScrollbar className="sidebar-nav">
                  {/* <Collapse isOpen={!collapsed}> */}

                  <Nav vertical navbar>
                    <li>
                      <NavItem>
                        <NavLink
                          to="/"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          className="active"
                        >
                          {/* <i className={prop.icon} /> */}
                          Dashboard
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          // to="/admin/splitScreen"
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<ProjectDetails />);
                            setPageName("ProjectDetails");
                          }}
                          className={pageName === "ProjectDetails" || component?.props?.children?.type?.WrappedComponent?.name === "ProjectDetails" ? "active active2":"active"}
                        >
                          {/* <i className={prop.icon} /> */}
                          Project Details
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          // to="/admin/splitScreen"
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<SiteEngineer1 />);
                            setPageName("SiteEngineer1");
                          }}
                          className={pageName === "SiteEngineer1"? "active active2":"active"}
                        >
                          {/* <i className={prop.icon} /> */}
                          Site Engineer #1
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {

                            closeCollapse();
                            selectComponet(<SiteEngineer2 />);
                            setPageName("SiteEngineer2");
                          }}
                          className={pageName === "SiteEngineer2"? "active active2":"active"}
                        >
                          Site Engineer #2
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<Measurement />);
                            setPageName("Measurement");
                          }}
                          className={pageName === "Measurement"? "active active2":"active"}
                        >
                          Measurement
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<Valuation />);
                            setPageName("Valuation");
                          }}
                          className={pageName === "Valuation"? "active active2":"active"}
                        >
                          Valuation
                        </NavLink>
                      </NavItem>
                    </li>
                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<Analog />);
                            setPageName("Analog");
                          }}
                          className={pageName === "Analog"? "active active2":"active"}
                        >
                          Analog
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<Compliances />);
                            setPageName("Compliances");
                          }}
                          className={pageName === "Compliances"? "active active2":"active"}
                        >
                          Compliances
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<Remark />);
                            setPageName("Remark");
                          }}
                          className={pageName === "Remark"? "active active2":"active"}
                        >
                          Remarks
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<Annexure />);
                            setPageName("Annexure");
                          }}
                          className={pageName === "Annexure"? "active active2":"active"}
                        >
                          Annexures
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          to="#"
                          tag={NavLinkRRD}
                          onClick={() => {
                            closeCollapse();
                            selectComponet(<FinalReport />);
                            setPageName("FinalReport");
                          }}
                          className={pageName === "FinalReport"? "active active2":"active"}
                        >
                          Final Report
                        </NavLink>
                      </NavItem>
                    </li>
                  </Nav>

                  {/* </Collapse> */}
                </PerfectScrollbar>

                {/* Divider */}
                {/* <hr className="my-3" /> */}
                {/* Heading */}
                {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
                {/* Navigation */}
                {/* <Nav className="mb-md-3" navbar></Nav> */}
              </Collapse>
            </Container>
          </div>
        </div>
      </Navbar>
      {/* </Navbar> */}
      {/* </Collapse> */}

      {/* </Collapse> */}
    </>
  );
};

SidebarMini.defaultProps = {
  routes: [{}],
};

SidebarMini.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, null)(SidebarMini);
