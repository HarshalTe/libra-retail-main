import React, { Component } from "react";
import Header from "../../../components/Headers/Header";

import { Card, CardBody, CardHeader, Table } from "reactstrap";

class MasterTab extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        {/* <h6>MASTER TAB</h6> */}

        <Card>
          <CardHeader> MASTER TAB</CardHeader>
          <CardBody>
            <Table>
              <thead>
                <th>HEY</th>
              </thead>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MasterTab;
