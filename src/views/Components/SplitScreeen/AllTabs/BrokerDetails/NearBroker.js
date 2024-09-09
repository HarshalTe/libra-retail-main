import { Button, Label, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import BrokersTable from './BrokersTable';
import { Divider } from '@material-ui/core';
import { Typography } from '@mui/material';


function NearBroker(props) {
  const [data, setData] = useState([]);
  const lat = props?.property?.property?.geo_tag?.lat
  const long = props?.property?.property?.geo_tag?.long
//   useEffect(() => {
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=real_estate_agency&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q`;
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       setData(data.results);
//       console.warn("result", data.results);
//     })
//     .catch(error => {
//       console.error(error);
//       // display an error message to the user
//     });
// }, [props.lat, props.lng]);

  return (
    <div>
<Typography variant={"h5"}>Google Brokers</Typography>
<Button variant="contained" color="primary">
      Click me!
    </Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.vicinity}</td>
            <td>{item.geometry?.location?.lat}</td>
            <td>{item.geometry?.location?.lng}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <></>
    <br />
          <Divider />
          <br />
<Label>System Brokers</Label>
    <BrokersTable/>
            </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    googleApi: state.googleApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NearBroker);
