import React from "react";
import { Row, Col, Table } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Divider, Typography } from "@material-ui/core";

//*switch
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function LB() {
  const [lb, setLb] = React.useState(1);
  const [plot, setPlot] = React.useState(1);
  const [construction, setConstruction] = React.useState(1);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Typography>Valuation Table for L+B</Typography>
        </Col>

        <Row className="px-4">
          <Col md={4} className="pb-4">
            <FormControlLabel
              control={
                <Switch
                  id="lb"
                  name="lb"
                  value={lb}
                  onChange={(event) => {
                    event.target.value == 1 ? setLb(0) : setLb(1);
                  }}
                  checked={lb == 1 ? true : false}
                />
              }
              label="L+B"
            />
          </Col>
          <Col md={4} className="pb-4">
            <FormControlLabel
              control={
                <Switch
                  id="plot"
                  name="plot"
                  value={plot}
                  onChange={(event) => {
                    event.target.value == 1 ? setPlot(0) : setPlot(1);
                  }}
                  checked={plot == 1 ? true : false}
                />
              }
              label="Plot"
            />
          </Col>
          <Col md={4} className="pb-4">
            <FormControlLabel
              control={
                <Switch
                  id="construction"
                  name="construction"
                  value={construction}
                  onChange={(event) => {
                    event.target.value == 1
                      ? setConstruction(0)
                      : setConstruction(1);
                  }}
                  checked={construction == 1 ? true : false}
                />
              }
              label="Construction"
            />
          </Col>
        </Row>

        {lb === 1 ? (
          <Col md={12}>
            <div
              style={{ width: "100%", overflowX: "scroll", overflow: "scroll" }}
            >
              <Table
                className="table table-sm"
                bordered
                style={{ textAlign: "center", overflowX: "scroll" }}
              >
                <thead>
                  <th></th>
                  <th>Economic life of Building</th>
                  <th>Building Age</th>
                  <th>Residual Age</th>
                  <th>BA as per plan</th>
                  <th>BA as per site</th>
                  <th>BA for evaluation</th>
                  <th>BA loading</th>
                  <th>Superplot area as per plan</th>
                  <th>SPA as per doc</th>
                  <th>SPA for valuation</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Unit</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        ) : (
          <Col md={12}></Col>
        )}
      </Row>
      <br />
      <br />
      <br />
      <Row>
        <Col md={2} />
        {plot === 1 ? (
          <Col md={8}>
            <div style={{ width: "100%", overflowX: "scroll" }}>
              <Table
                className="table table-sm px-0"
                bordered
                style={{
                  textAlign: "center",
                  overflowX: "scroll",
                }}
              >
                <thead>
                  <th>Plot Value</th>
                  <th>Sft</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Plot Area</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Plot Rate</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Add Development charges</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Other Charges</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Final Plot value</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        ) : (
          <Col md={8}></Col>
        )}

        <Col md={2} />
      </Row>
      <br />
      <br />
      <Row>
        <Col md={2} />
        {construction === 1 ? (
          <Col md={8}>
            <div style={{ width: "100%", overflowX: "scroll" }}>
              <Table
                className="table table-sm"
                bordered
                style={{
                  textAlign: "center",
                  overflowX: "scroll",
                  padding: "0px",
                }}
              >
                <thead>
                  <th>Construction Value</th>
                  <th></th>
                </thead>
                <tbody>
                  <tr>
                    <td>BA/SBA area</td>

                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Const Rate</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Const cost</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Depriciation cost</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Net Value after depriciation</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Pre renovation</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Final renovation</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Add terrace rights</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Add parking charges</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Add other charges</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Add other charges</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Total value</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>AVM value</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Final Value</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Rent per Month</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Yield((Rent*12/Final Value)*100)</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>for Distress value of property</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td> Distress value</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        ) : (
          <Col md={8}></Col>
        )}

        <Col md={2} />
      </Row>
    </div>
  );
}
