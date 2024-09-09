import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Row, Col, CardFooter } from "reactstrap";

import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  // Button,
  Divider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//*Components
import Ready from "./Ready/Ready";
import UnderConstruction from "./UnderConstruction/UnderConstruction";

function StageCalculator(props) {
  console.log("props st", props);
  const [component, setCompoenet] = useState(
    props?.property?.property?.stage_calculator?.type == null
      ? "Ready"
      : props?.property?.property?.stage_calculator?.type
  );

  const onHandleChange = (event) => setCompoenet(event.target.value);
  return (
    <div>
          <div>
            <Row className="pb-2">
              <Col md={12}>
                {/* <InputLabel>Under Construction</InputLabel> */}
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  size="small"
                  // label="Under Construction"
                  value={component}
                  onChange={(event) => onHandleChange(event)}
                >
                  <MenuItem value="Ready">Ready</MenuItem>
                  <MenuItem value="UD">Under Construction</MenuItem>
                </TextField>
              </Col>
            </Row>

            <div>
              {component == "Ready" ? (
                <Ready setValue={props.setValue} />
              ) : (
                <UnderConstruction />
              )}
            </div>
          </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    stageCalculator: state.stageCalculator,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // editStageCalculator: (data, setValue, value, token) =>
    //   dispatch(editStageCalculator(data, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StageCalculator);
