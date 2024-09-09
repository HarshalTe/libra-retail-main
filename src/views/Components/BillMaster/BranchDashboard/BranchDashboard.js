import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  Input,
} from "reactstrap";

//* Components
import OnGoingBranchCases from "./OnGoingBranchCases";
import CompletedBranchCases from "./CompletedBranchCases";

//*Actions
import { getBranchesList } from "../../../Redux/Creators/BranchesCreators";
import { getProjectsList } from "../../../Redux/Creators/ProjectsCreators";
import { getDropdownsList } from "../../../Redux/Creators/DropdownCreators";
//*
import { getBankProductsList } from "../../../Redux/Creators/BankProductsCreators";
import { getBankVerticalsList } from "../../../Redux/Creators/BankVerticalsCreators";
import LinerLoader from "components/Loaders/LinerLoader";

const BranchDashboard = (props) => {
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
  return (
    <>
      {props?.branches?.isLoading &&
      props?.projects?.isLoading &&
      props?.bankVerticals?.isLoading &&
      props?.bankProducts?.isLoading ? (
        <LinerLoader />
      ) : (
        <Container className="mt-3" fluid>
          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>OnGoing Cases</strong>
                </Col>
                <Col md={4}></Col>

                <Col md={4}>
                  <InputGroup>
                    <Input type="text" placeholder="search by name" size="sm" />
                  </InputGroup>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              <OnGoingBranchCases />
            </CardBody>
          </Card>

          <br />

          <Card>
            <CardHeader className="bg-info text-white">
              <Row>
                <Col>
                  <strong>Completed Cases</strong>
                </Col>
                <Col md={4}></Col>

                <Col md={6}>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="search by name"
                      size="sm"
                      // value={searchTerm}
                      // onChange={handleChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <CompletedBranchCases />
            </CardBody>
          </Card>
        </Container>
      )}
    </>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(BranchDashboard);
