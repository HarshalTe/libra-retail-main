import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";

//*Components
import Composite from "./Composite/Composite";
import PC from "./PC/PC";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";

function Measurement(props) {
  const [component, setCompoenet] = useState(
    props?.property?.property?.measurement?.measurement_type !== null
      ? props?.property?.property?.measurement?.measurement_type
      : "Composite"
  );

  const onHandleChange = (event) => setCompoenet(event.target.value);
  return (
    <div>
      <Card>
        <CardHeader className="bg-gradient-info"></CardHeader>
        {props.measurement.isLoading ? (
          <CardBody>
            <Row>
              <LinerLoader />
            </Row>
          </CardBody>
        ) : (
          <CardBody>
            <Row>
              <Col md={12}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  size="small"
                  label="Physical Mesurement"
                  value={component}
                  onChange={(event) => onHandleChange(event)}
                >
                  <MenuItem value="Composite">Composite</MenuItem>
                  <MenuItem value="PC">P+C</MenuItem>
                </TextField>
              </Col>
            </Row>
            <br />
            {component == "Composite" ? <Composite /> : <PC />}
          </CardBody>
        )}
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    measurement: state.measurement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // editValuationData: (data, setValue, value, token) =>
    //   dispatch(editValuationData(data, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Measurement);
