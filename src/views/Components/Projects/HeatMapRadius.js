import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import { connect } from "react-redux";
import { baseUrl } from "../../../shared/baseURL";
import { Tooltip } from '@mui/material';



function HeatMapRadius(props) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + props?.login?.login?.token,
    });

    fetch(baseUrl+`nearby-properties/${props.property.property.id}`, {
      method: 'GET',
      headers: myheader,
    })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
      .then((response) => response.json())
      .then((data) => setMarkers(data))
      .catch((error) => console.log(error));
    }, []);
    console.log("markers",markers)

  const GoogleMapComponent = withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: +props?.property?.property?.latitude, lng: +props?.property?.property?.longitude }}
    >
      {markers?.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: +marker.latitude, lng: +marker.longitude }}
          title={marker.location}
        >
             {/* <Tooltip title={"kokw"} arrow>
      <div>{"joi"}</div>
    </Tooltip> */}
        </Marker>
      ))}

<Circle
    center={{
      lat: +props?.property?.property?.latitude,
      lng: +props?.property?.property?.longitude
    }}
    radius={3000}
    options={{
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    }}
  />
    </GoogleMap>
  ));
  const GoogleMapComponent2 = withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: +props?.property?.property?.latitude, lng: +props?.property?.property?.longitude }}
    >
        {/* <Marker
      position={{
        lat: +props?.property?.property?.latitude,
        lng: +props?.property?.property?.longitude
      }}
      title="Default Location"
      icon={{
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new window.google.maps.Size(32, 32),
      }}
    /> */}
      {props.data?.map((marker) =>{
        console.log("markers",marker.latitude)
      return(
        <Marker
          key={marker.id}
          position={{ lat: +marker.latitude, lng: +marker.longitude }}
          title={marker.location}
          >
             {/* <Tooltip title={"kokw"} arrow>
      <div>{"joi"}</div>
    </Tooltip> */}
        </Marker>
      )})}

<Circle
    center={{
      lat: +props?.property?.property?.latitude,
      lng: +props?.property?.property?.longitude
    }}
    radius={3000}
    options={{
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    }}
  />
    </GoogleMap>
  ));

  return (
    <div style={{ width: '100%', height: '100%' }}>
        {
            props.data.length>0
            ?
            <GoogleMapComponent2
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
            :
            <GoogleMapComponent
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
  }

    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      login: state.login,
      users: state.users,
      property: state.property,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HeatMapRadius);