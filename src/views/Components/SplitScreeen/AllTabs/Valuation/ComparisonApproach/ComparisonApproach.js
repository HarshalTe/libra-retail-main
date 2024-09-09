import React from "react";
import { Row, Col, Table } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Divider, Typography } from "@material-ui/core";

//*switch
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function ComparisonApproach() {
  const [comparison, setComparison] = React.useState(1);
  const [carpet, setCarpet] = React.useState(1);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Typography>Valuation Method for Composite Method</Typography>
        </Col>

        <Row className="px-4">
          <Col md={6} className="pb-4">
            <FormControlLabel
              control={
                <Switch
                  id="comparison"
                  name="comparison"
                  value={comparison}
                  onChange={(event) => {
                    event.target.value == 1
                      ? setComparison(0)
                      : setComparison(1);
                  }}
                  checked={comparison == 1 ? true : false}
                />
              }
              label="Comparison"
            />
          </Col>
          <Col md={6} className="pb-4">
            <FormControlLabel
              control={
                <Switch
                  id="carpet"
                  name="carpet"
                  value={carpet}
                  onChange={(event) => {
                    event.target.value == 1 ? setCarpet(0) : setCarpet(1);
                  }}
                  checked={carpet == 1 ? true : false}
                />
              }
              label="Carpet"
            />
          </Col>
        </Row>

        {comparison === 1 ? (
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
        {carpet === 1 ? (
          <Col md={8}>
            <div style={{ width: "100%", overflowX: "scroll" }}>
              <Table
                className="table table-sm"
                bordered
                style={{
                  textAlign: "center",
                  overflowX: "scroll",
                }}
              >
                <thead>
                  <th></th>
                  <th></th>
                </thead>
                <tbody>
                  <tr>
                    <td>Carpet Area</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Built up Area</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Super Built up Area</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Base rate per sft</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Built up Area</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Value</td>
                    <td>
                      <TextField fullWidth variant="standard" />
                    </td>
                  </tr>
                  <tr>
                    <td>Add for renovation</td>
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
                    <td>Add parking chargess</td>
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
                    <td>Distress value</td>
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
