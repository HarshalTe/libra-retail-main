import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Divider, Typography } from "@mui/material";

//* Components
// import LB from "./LB/LB";
import LB2 from "./LB/LB2";
import ComparisonApproach2RC from "./ComparisonApproach/ComparisonApproach2RC";

// import ComparisonApproach from "./ComparisonApproach/ComparisonApproach";
import ComparisonApproach2 from "./ComparisonApproach/ComparisonApproach2";

//*Actions
import { editValuationData } from "../../../../../Redux/Creators/ValuationCreators";
import LinerLoader from "components/Loaders/LinerLoader";
import { getAvmPage } from "../../../../../Redux/Creators/AvmCreators";

function Valuation(props) {
  console.log("props", props);
  const [component, setCompoenet] = useState(
    props?.property?.property?.valuation?.type?.valuation_type
  );
  const onHandleChange = (event) => setCompoenet(event.target.value);
  const token = props.login?.login?.token;

  React.useEffect(() => {
    let data = {
      token: token,
    };
    props.getAvmPage(data);
  }, []);

  return (
    <>
      {props.valuation.isLoading || props.projects.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <Row>
            <Col md={10} className="pb-4">
              <Typography variant={"h5"}>Valuation</Typography>
            </Col>
            <Col md={2} className="pb-4">
              {/* <EditValuation /> */}
            </Col>
          </Row>

          <Divider />
          <br />
          <Row className="form-group">
            <Col md={12}>
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                label="Valuation"
                value={component}
                onChange={(event) => onHandleChange(event)}
              >
                {/* <MenuItem value="">Select</MenuItem> */}
                <MenuItem value="LB">
                  L+B(Bungalows+Industrial Property)
                </MenuItem>
                <MenuItem value="CA">
                  Comparison Approach(Flat, Office, Showroom)
                </MenuItem>
                <MenuItem value="RC">
                Rent Capitalization
                </MenuItem>
              </TextField>
            </Col>
          </Row>

          <Divider />
          <br />

          <Divider />
          <br />

          <Row>
            <Col md={12}>
              {component == "LB" ? (
                <LB2 setValue={props.setValue} />
              ) : 
              component == "RC" ? (
                <ComparisonApproach2RC setValue={props.setValue} />
              ):
              (
                <ComparisonApproach2 setValue={props.setValue} />
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    valuation: state.valuation,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editValuationData: (data, setValue, value, token) =>
      dispatch(editValuationData(data, setValue, value, token)),
      getAvmPage: (data) => dispatch(getAvmPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Valuation);
