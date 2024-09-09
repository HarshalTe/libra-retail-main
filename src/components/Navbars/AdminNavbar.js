import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Button,
} from "reactstrap";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import { removeLogin } from "../../Redux/Creators/LoginCreatorss";
import LinearProgressWithCase from "../../../src/views/Components/SplitScreeen/AllTabs/ProjectDetails/LinearProgressWithCase"
import { useSelector } from "react-redux";

const AdminNavbar = (props) => {
  const [progress, setProgress] = React.useState(0);
  const myState = useSelector((state) => state.AdminProgressBar);

  let barCount = props?.property?.property

  const filteredKeys = Object.keys(barCount).filter(key => key.endsWith('Progress'));
const filteredValues = filteredKeys.map(key => barCount[key]);
const sum = (filteredValues.reduce((acc, val) => +acc + +val, 0)/filteredValues.length)*100;
console.log("filteredValues",filteredValues,barCount,sum)

  useEffect(() => {
    setProgress(sum)
    console.log("3322",props,myState)
  },[props]);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          {/* <Button
            className="nav-link"
            data-widget="pushmenu"
            href="/"
            role="button"
          >
            <i className="fas fa-bars" />
          </Button> */}

          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to={props.path}
          >
            {props.brandText}
            <div className="pb-4" style={props.brandText=='Work In Progress Case'?{width: "64vw",
    display: "flex",
    justifyContent: "space-around"}:{display:"none"}}>
                      <Box sx={{ width: "100%" }} style={{width: "26vw"}}>
                        <LinearProgressWithCase value={progress} />
                      </Box>
                    </div>
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            {/* <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
              <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                  </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup> */}
          </Form>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Libra Valuers
                    </span>
                  </Media>
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
                <DropdownItem href="#" onClick={() => props.removeLogin()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    AdminProgressBar:state.AdminProgressBar,
    property: state.property,

  };
};
const mapDispatchToProps = (dispatch) => ({
  removeLogin: () => dispatch(removeLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
