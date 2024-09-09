import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
  NavbarBrand,
  NavbarToggler,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { event } from "jquery";
import { colors } from "@material-ui/core";
import LV from "../../assets/libra_logo1.png";

//* Main Compoenet
import { LeftScreen } from "views/Components/SplitScreeen/LeftScreen/LeftScreen";

//* All Components
import SiteEngineer1 from "views/Components/SplitScreeen/SplitComponents/SiteEngineer1/SiteEngineer1";

var ps;

const SidebarMini = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  //! case master collapse, bank, bill
  const [caseCollapsed, setCaseCollapsed] = useState(false);
  const [bankCollapsed, setBankCollapsed] = useState(false);
  const [billCollapsed, setBillCollapsed] = useState(false);
  const [userCollapsed, setUserCollapsed] = useState(false);

  // const [collapsed, setCollapsed] = useState(false);
  // const toggleCase = () => {
  //   setCollapsed(!collapsed);
  // };

  const [mainNavBar, setMainNavBar] = useState(true);

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const toggleMainNavbar = () => setMainNavBar(!mainNavBar);
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
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
  const sidenavOpen = true;
  const toggleSidenav = null;
  const onMouseEnterSidenav = null;
  const onMouseLeaveSidenav = null;

  const selectComponet = (data) => {
    console.log("reeoe");
    <LeftScreen data={data} />;
  };

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
                            require("../../assets/img/theme/team-1-800x800.jpg")
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
                          to="/admin/splitScreen"
                          tag={NavLinkRRD}
                          onClick={() => {
                            {
                              closeCollapse();
                            }
                            {
                              selectComponet("hello");
                            }
                          }}
                          activeClassName="active"
                        >
                          {/* <i className={prop.icon} /> */}
                          Site Engineer #1
                        </NavLink>
                      </NavItem>
                    </li>

                    {/* {props?.login?.login?.user?.role === "admin" ? (
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/masterTab"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active"
                          >
                            MasterTab
                          </NavLink>
                        </NavItem>
                      </li>
                    ) : (
                      ""
                    )} */}

                    {/* <li>
                      <NavItem>
                        <NavLink
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          Site Engineer #2
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          Measurement
                        </NavLink>
                      </NavItem>
                    </li>

                    <li>
                      <NavItem>
                        <NavLink
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          Valuation
                        </NavLink>
                      </NavItem>
                    </li> */}
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
