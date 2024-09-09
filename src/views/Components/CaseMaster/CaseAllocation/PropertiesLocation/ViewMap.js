import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { baseUrl } from '../../../../../shared/baseURL';

function ViewMap(props) {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(5);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  

  useEffect(() => {
    const myheader = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props?.login?.login?.token,
    });

    fetch(baseUrl + `render-properties`, {
      method: 'GET',
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          'Error:' + response.status + 'Error Text: ' + response.statusText
        );

        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((data) => setMarkers(data))
      .catch((error) => console.log(error));
  }, []);

  const myPlaces = markers.map((place) =>{
    return(
      { id: place?.id, pos:{lat:place?.latitude , long:place?.longitude} })
    } 
      );

// console.log("myPlaces",myPlaces,markers)
  const handleMarkerClick = (marker) => {
    const map = mapRef.current;
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(+marker.latitude, +marker.longitude));
    map.fitBounds(bounds);
  };
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
     myPlaces?.map((place) => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    setMapRef(map);
    fitBounds(map);
  };
  


  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    if (zoom < 13) {
      setZoom(13);
    }

  };

  const GoogleMapComponent = withGoogleMap(() => (
    <GoogleMap
    onLoad={loadHandler}
    onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
    center={center}
    zoom={zoom}
    mapContainerStyle={{
      height: "100vh",
      width: "100%",
    }}
  >
      {markers?.map((marker) => (
       
        <Marker
        key={marker.id}
        position={{ lat: +marker.latitude, lng: +marker.longitude }}
        onLoad={(mark) => markerLoadHandler(mark, marker)}
        onClick={(event) => markerClickHandler(event, marker)}
      />
      ))}
    </GoogleMap>
  ));

  return (
    <div style={{ width: '100%', height: '500px' }}>
      Google Map
      <GoogleMapComponent
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    employeeLocation: state.employeeLocation,
    propertiesLocation: state.propertiesLocation,
  };
};

export default connect(mapStateToProps)(ViewMap);
