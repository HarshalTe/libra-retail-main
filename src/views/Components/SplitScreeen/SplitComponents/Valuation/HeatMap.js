import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker,Circle, InfoWindow } from 'react-google-maps';
import { connect } from "react-redux";
// import { baseURL } from "../../../../../shared/baseURL";
import { baseUrl } from "../../../../../shared/baseURL";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Col, Row } from 'reactstrap';



function HeatMap(props) {
  const [markers, setMarkers] = useState([]);
  const [radius, setRadius] = useState(3000);
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  // const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(5);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const handleChange = (event) => {
    setRadius(event.target.value);
  };

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    // setCenter(place.pos);
  };

    // Iterate myPlaces to size, center, and zoom map to contain all markers
    const fitBounds = (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      markers.map((place) => {
        bounds.extend({lat:+place?.latitude,lng:+place?.longitude});
        return place.id;
      });
      map.fitBounds(bounds);
    };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  }

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
      .then((data) => {
        // Add the "name" key to each marker object
        const markersWithNames = data.map(marker => ({
          ...marker,
          knowFor: `Enginerr name:${""} , Pending Visit:${""} , Current Location:${""} , Total Visit:${""}` // Replace with the desired name
        }));
        setMarkers(markersWithNames);
      })
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
          onLoad={(marker) => markerLoadHandler(marker, marker)}
          onClick={(event) => markerClickHandler(event, marker)}
        >
        </Marker>
      ))}

{infoOpen && selectedPlace && (
                <InfoWindow
                  anchor={markerMap[selectedPlace.id]}
                  onCloseClick={() => setInfoOpen(false)}
                >
                  <div>
                    <h3>{selectedPlace.id}</h3>
                    <div>{selectedPlace.knowFor}</div>
                  </div>
                </InfoWindow>
              )}

<Circle
    center={{
      lat: +props?.property?.property?.latitude,
      lng: +props?.property?.property?.longitude
    }}
    radius={radius}
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
    <div style={{ width: '100%', height: '500px' }}>
      <Row>
        <Col md={4}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Radius Area</InputLabel>
  
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={radius}
    label="Radius Area"
    onChange={handleChange}
    >
    <MenuItem value={1000}>&nbsp; &nbsp; 1000</MenuItem>
    <MenuItem value={2000}>&nbsp; &nbsp; 2000</MenuItem>
    <MenuItem value={3000}>&nbsp; &nbsp; 3000</MenuItem>
    <MenuItem value={4000}>&nbsp; &nbsp; 4000</MenuItem>
    <MenuItem value={5000}>&nbsp; &nbsp; 5000</MenuItem>
    <MenuItem value={6000}>&nbsp; &nbsp; 6000</MenuItem>
    <MenuItem value={10000}>&nbsp; &nbsp; 10000</MenuItem>
  </Select>
</FormControl>
        </Col>
          <Col md={8}></Col>
      </Row>
      <Box sx={{ minWidth: 120 }}>
  
     
</Box>
        Google Heat Map
      <GoogleMapComponent
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);