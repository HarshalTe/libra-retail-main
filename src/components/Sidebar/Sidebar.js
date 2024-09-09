import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import "./active.css";

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
import LV from "../../assets/libra_logo1.png";

var ps;

const Sidebar = (props) => {
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
  const [dashboard, setDashboard] = useState(false);
  const [companyMaster, setCompanyMaster] = useState(false);
  const [master, setMaster] = useState(false);
  const [hr, setHr] = useState(false);
  const [bank, setBank] = useState(false);
  const [estate, setEstate] = useState(false);
  const [project, setProject] = useState(false);
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

  //*pages

  let dashboard_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "dashboard_page"
  );
  let master_tab_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "master_tab_page"
  );
  let emp_loc_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "emp_loc_page"
  );
  let project_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "project_page"
  );
  let broker_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "broker_page"
  );

  //*case_master_page
  let case_master_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "case_master_page"
  );
  let initiated_case_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "initiated_case_page"
  );
  let work_in_progress_case_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "work_in_progress_case_page"
  );
  let completed_case_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "completed_case_page"
  );
  // let case_on_hold_page = props?.login?.login?.user?.rights.find(
  //   (o) => o.page.name == "case_on_hold_page"
  // );

  let case_allocation_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "case_allocation_page"
  );

  let mis_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "mis_page"
  );

  //*user_master_page
  let user_master_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "user_master_page"
  );

  let user_creation_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "user_creation_page"
  );

  let rights_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "rights_page"
  );

  //*bank_master_page
  let bank_master_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bank_master_page"
  );

  let bank_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bank_page"
  );

  let branch_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "branch_page"
  );

  let aggreement_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "aggreement_page"
  );

  let external_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "external_page"
  );

  let negative_project_master_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "negative_project_master_page"
  );

  //*bill_master_page
  let bill_master_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_master_page"
  );
  let bill_initiation_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_initiation_page"
  );
  let bill_initiation_approval_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_initiation_approval_page"
  );
  let completed_bill_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "completed_bill_page"
  );
  let level3_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "level3_page"
  );
  let bill_dashboard_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_dashboard_page"
  );
  let pending_amount = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "pending_amount"
  );

  //*
  let policy_link_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "policy_link_page"
  );
  let technical_policy_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name == "technical_policy_page"
  );
  let real_estate_link_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "real_estate_link_page"
  );
  let under_contruction_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "under_contruction_page"
  );
  let real_resarch_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "real_resarch_page"
  );
  let avm_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "avm_page"
  );

  let learning_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "learning_page"
  );
  let queries = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "queries"
  );
  let tickets = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "tickets"
  );
  let mail_setting_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "mail_setting_page"
  );
  let branch_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "branch_master"
  );
  let email_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "email_master"
  );

  let company_document = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "company_document"
  );
  let tutorial_page = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "tutorial_page"
  );

  //*
  let company_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "company_master"
  );

  let document_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "document_master"
  );
  let tds_details = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "tds_details" //r
  );
  let npa_project_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "npa_project_master"
  );
  let ready_reckner_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "ready_reckner_master"
  );
  let expense_management = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "expense_management"
  );
  let bill_history = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_history"
  );
  let credit_note_created = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "credit_note_created" //r
  );
  let credit_note_approval = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "credit_note_approval" //r
  );
  let un_billed_details = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "un_billed_details" //r
  );
  let cases_uploaded_online_field = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "cases_uploaded_online_field" //r
  );
  let received_courier = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "received_courier" //r
  );
  let courier_details = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "courier_details" //r
  );
  let leave_management = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "leave_management"
  );
  let leaving_letter = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "leaving_letter"
  );
  let offer_letter = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "offer_letter"
  );
  let assets = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "assets"
  );
  let matrix_management = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "matrix_management"
  );
  let task_management = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "task_management"
  );
  let payment_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "payment_master"
  );
  let pincode_master = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "pincode_master"
  );
  let bill_statistic = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "bill_statistic" //r
  );
  let project_report = props?.login?.login?.user?.rights?.find(
    (o) => o.page.name == "project_report" //r
  );

  console.log("work_in_progress_case_page", work_in_progress_case_page);

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
              <img src={LV} alt="" style={{ height: "60px", width: "100%" }} />
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

                <PerfectScrollbar className="sidebar-nav">
                  <Nav vertical navbar>
                    {dashboard_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setDashboard(!dashboard)}
                            aria-expanded={dashboard ? "true" : "false"}
                          >
                            Dashboard
                          </a>
                        </NavItem>

                        <Collapse isOpen={dashboard}>
                          <ul className="nav nav-sm flex-column">
                            {dashboard_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Dashboard
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {/* hide due to static graphs */}
                            {dashboard_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/dashboard"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Dashboard 2
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {dashboard_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/siteDashboard"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Site Dashboard
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {bill_dashboard_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/billDashboard"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Bill Dashboard
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {bill_statistic?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/bill-statistics"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Bill Statistic
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}

{emp_loc_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/employeeLocation"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Employee Location
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                    {user_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setCompanyMaster(!companyMaster)}
                            aria-expanded={companyMaster ? "true" : "false"}
                          >
                            Company Detail Master
                          </a>
                        </NavItem>

                        <Collapse isOpen={companyMaster}>
                          <ul className="nav nav-sm flex-column">
                            {company_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/companymaster"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Company Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                             {branch_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/branchMaster"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Libra Branch Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                              )}
                              {payment_master?.view_status == "1" ? (
                                <li>
                                  <NavItem>
                                    <NavLink
                                      to="/admin/payment-master"
                                      tag={NavLinkRRD}
                                      onClick={closeCollapse}
                                      activeClassName="active active2"
                                    >
                                      {/* <i className={prop.icon} /> */}
                                      {/* payment master */}
                                      Libra Bank Details
                                    </NavLink>
                                  </NavItem>
                                </li>
                              ) : (
                                ""
                              )}
                                {company_document?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/companyDocument"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Libra Company Document
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                           
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}
                    {user_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setMaster(!master)}
                            aria-expanded={master ? "true" : "false"}
                          >
                            Report Master
                          </a>
                        </NavItem>

                        <Collapse isOpen={master}>
                          <ul className="nav nav-sm flex-column">
                            {/* {master_tab_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/masterTab"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    MasterTab
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )} */}
                          
                           
                            {document_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/masterDocuments"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Master Documents/Remarks
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {matrix_management?.view_status == "1" ? (
                               <li>
                              <NavItem>
                                <NavLink
                                  to="/admin/matrixs"
                                  tag={NavLinkRRD}
                                  onClick={closeCollapse}
                                  activeClassName="active active2"
                                >
                                  {/* <i className={prop.icon} /> */}
                                  Internal System Approval Matrix
                                </NavLink>
                              </NavItem>
                            </li>
                              ) : (
                                ""
                              )}
                            {/* {emp_loc_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/employeeLocation"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Employee Location
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )} */}
                            {mis_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/misMaster"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    MIS Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {mail_setting_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/mailSettings"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Mail Settings
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

{pincode_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/pincodes"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Pincodes Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}
                     {bank_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setBankCollapsed(!bankCollapsed)}
                            aria-expanded={bankCollapsed ? "true" : "false"}
                            aria-controls="navbar-dashboards"
                          >
                            Bank Master
                          </a>
                        </NavItem>

                        <Collapse isOpen={bankCollapsed}>
                          <ul className="nav nav-sm flex-column">
                            {bank_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/bank"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Bank
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {branch_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/branch"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Branch
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {aggreement_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/agreementRenewal"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Agreement Renewal
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                             {email_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/emailDetail"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Client Email Details
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}

                    {user_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setHr(!hr)}
                            aria-expanded={hr ? "true" : "false"}
                          >
                            Hr
                          </a>
                        </NavItem>

                        <Collapse isOpen={hr}>
                          <ul className="nav nav-sm flex-column">
                            {user_creation_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/userCreation"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    User Creation
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {rights_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/pageRights"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Page Rights
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {task_management?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/task-management"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Task Management
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {leave_management?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/leaveManagement"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    leave Management
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                             
                               {assets?.view_status == "1" ? (
                                 <li>
                              <NavItem>
                                <NavLink
                                  to="/admin/assetsMaster"
                                  tag={NavLinkRRD}
                                  onClick={closeCollapse}
                                  activeClassName="active active2"
                                >
                                  {/* <i className={prop.icon} /> */}
                                  Company Asset Master
                                </NavLink>
                              </NavItem>
                            </li>
                              ) : (
                                ""
                              )}
                               {offer_letter?.view_status == "1" ? (
                                 <li>
                              <NavItem>
                                <NavLink
                                  to="/admin/offerLetter"
                                  tag={NavLinkRRD}
                                  onClick={closeCollapse}
                                  activeClassName="active active2"
                                  >
                                  {/* <i className={prop.icon} /> */}
                                  Offer Letter
                                </NavLink>
                              </NavItem>
                            </li>
                              ) : (
                                ""
                                )}
                                 {leaving_letter?.view_status == "1" ? (
                                   <li>
                              <NavItem>
                                <NavLink
                                  to="/admin/leavingLetter"
                                  tag={NavLinkRRD}
                                  onClick={closeCollapse}
                                  activeClassName="active active2"
                                  >
                                  {/* <i className={prop.icon} /> */}
                                  Relieving Letter
                                </NavLink>
                              </NavItem>
                            </li>
                                  ) : (
                                    ""
                                  )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}



                    {/* Create Project Repeort */}

                    {/* <div className="collapse navbar-collapse"> */}

                    {case_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            name="casemaster"
                            onClick={() => setCaseCollapsed(!caseCollapsed)}
                            aria-expanded={caseCollapsed ? "true" : "false"}
                          >
                            Case
                          </a>
                        </NavItem>
                        <Collapse isOpen={caseCollapsed}>
                          <ul className="nav nav-sm flex-column">
                            {/* nav nav-treeview  */}
                            {initiated_case_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/initiatedCases"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Initiate Cases
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {case_allocation_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/caseAllocation"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Case Allocation
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {work_in_progress_case_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/workInProgressCases"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Work In Progress Cases
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {completed_case_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/completedCases"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Completed Cases
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {courier_details?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/courier"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Courier Details
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {/* received courier */}
                            {received_courier?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/receivedCourier"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Received Courier
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {cases_uploaded_online_field?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/CasesUplaodedOnline"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Cases Uploaded Online Field
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {/* {case_on_hold_page.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/casesOnHold"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Cases On Hold
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )} */}{" "}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}

                    {bill_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setBillCollapsed(!billCollapsed)}
                            aria-expanded={billCollapsed ? "true" : "false"}
                          >
                            Bill
                          </a>
                        </NavItem>

                        <Collapse isOpen={billCollapsed}>
                          <ul className="nav nav-sm flex-column">
                            {bill_initiation_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/billInitiation"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Bill Generate
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {bill_initiation_approval_page?.view_status ==
                            "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/billInitiationAndApproval"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Bill Initiation & Approval
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {completed_bill_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/completedBill"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Completed Bill
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {level3_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/billLevel3"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    CA Level
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {tds_details?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/tdsDetails"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    TDS Details
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {pending_amount?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/pendingAmount"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Pending Amount
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {un_billed_details?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/unBilledDetails"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Un-Billed Details
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {credit_note_approval?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/creditNoteApproval"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Credit Note Approval
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {credit_note_created?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/creditNoteCreated"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Credit Note Created
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {bill_history?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/billHistory"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Bill History
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {expense_management?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/ExpenseManagement"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Expense Management
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}

                    {user_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setEstate(!estate)}
                            aria-expanded={estate ? "true" : "false"}
                          >
                            Real Estate Intellignce
                          </a>
                        </NavItem>

                        <Collapse isOpen={estate}>
                          <ul className="nav nav-sm flex-column">
                            {policy_link_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/dcrGovPolicyLinks"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    DCR/GOV Policy Links
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {technical_policy_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/technicalPolicyBank"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Technical Policy(Bank)
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {real_estate_link_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/realEstateLinkState"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Real Estate Link(State)
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {ready_reckner_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/ReadyRecknerMaster"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    Ready Reckoner Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {broker_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/brokers"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Brokers
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {real_resarch_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/realResearchGraphs"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Real Research Graphs
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {external_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/externalDataUpload"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    External Data Upload
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {avm_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/avm"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    AVM
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}

                    {user_master_page?.view_status == "1" ? (
                      <li className="nav-item">
                        <NavItem>
                          <a
                            className="nav-link active"
                            data-toggle="collapse"
                            role="button"
                            onClick={() => setProject(!project)}
                            aria-expanded={project ? "true" : "false"}
                          >
                            Project
                          </a>
                        </NavItem>

                        <Collapse isOpen={project}>
                          <ul className="nav nav-sm flex-column">
                            {project_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/projects"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Projects
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                            {/* {project_report?.view_status == "1" ? (
                        <li>
                      <NavItem>
                        <NavLink
                          to="/admin/ProjectReport"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active active2"
                          >
                          Project Report
                        </NavLink>
                      </NavItem>
                    </li>
                          ) : (
                            ""
                            )} */}
                            {negative_project_master_page?.view_status ==
                            "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/negativeProjectMaster"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Negative Project Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {npa_project_master?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/npaProjectMaster"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    NPA Project Master
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}

                            {under_contruction_page?.view_status == "1" ? (
                              <li>
                                <NavItem>
                                  <NavLink
                                    to="/admin/underConstructionProjects"
                                    tag={NavLinkRRD}
                                    onClick={closeCollapse}
                                    activeClassName="active active2"
                                  >
                                    {/* <i className={prop.icon} /> */}
                                    Under Construction Projects
                                  </NavLink>
                                </NavItem>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}

                    {queries?.view_status == "1" ? (
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/queries"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active active2"
                          >
                            {/* <i className={prop.icon} /> */}
                            Queries
                          </NavLink>
                        </NavItem>
                      </li>
                    ) : (
                      ""
                    )}
                    {tickets?.view_status == "1" ? (
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/tickets"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active active2"
                          >
                            {/* <i className={prop.icon} /> */}
                            Tickets
                          </NavLink>
                        </NavItem>
                      </li>
                    ) : (
                      ""
                    )}

                    {/* <li>
                      <NavItem>
                        <NavLink
                          to="/admin/splitScreen"
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active active2"
                        >
                          Split Screen
                        </NavLink>
                      </NavItem>
                    </li> */}

                    {learning_page?.view_status == "1" ? (
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/learnings"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active active2"
                          >
                            {/* <i className={prop.icon} /> */}
                            Learnings
                          </NavLink>
                        </NavItem>
                      </li>
                    ) : (
                      ""
                    )}
                    {tutorial_page?.view_status == "1" ? (
                      <li>
                        <NavItem>
                          <NavLink
                            to="/admin/softwareTutorial"
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            activeClassName="active active2"
                          >
                            {/* <i className={prop.icon} /> */}
                            Software Tutorial
                          </NavLink>
                        </NavItem>
                      </li>
                    ) : (
                      ""
                    )}
                  </Nav>
                </PerfectScrollbar>
              </Collapse>
            </Container>
          </div>
        </div>
      </Navbar>
    </>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
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
    // imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
