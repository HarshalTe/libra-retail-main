import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";


// We will use these things from the lib
// https://react-google-maps-api-docs.netlify.com/
import {
  useLoadScript,
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";

function ViewMap(props) {
  // The things we need to track in state
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [zoom, setZoom] = useState(5);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    // Enter your own Google Maps API key
    id: "google-map-script",
    // googleMapsApiKey: "AIzaSyAKlPRku6WRueqWw_Cn4-QVInGCFYU5NTA",
    // googleMapsApiKey: "AIzaSyCuvDyzSmFHob__by1B7fcoZOFVlX90SOM",
    // googleMapsApiKey: "AIzaSyCx-ksqCuDmUoxr6RDIDHpLLMsdINEyJTk",
    // googleMapsApiKey: "AIzaSyAo7eG1o-xCE6kQc35dj14lnOmjrkRJbxE",
    // comment
    googleMapsApiKey: "AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q",

    // libraries: "",
  });

  React.useEffect(()=>{

  },[])
  
  
  const myPlaces = props?.empLive.length==0 ?[
    {
      id: "Start Location",
      pos: { lat: +props?.employeeLocation?.employeeLocation[0]?.lat, lng:+props?.employeeLocation?.employeeLocation[0]?.long },
      knowFor: "Start Location",
    },
    {
      id: "End Location",
      pos: { lat: +props?.employeeLocation?.employeeLocation[
        props?.employeeLocation?.employeeLocation.length - 1
      ]?.lat, lng: +props?.employeeLocation?.employeeLocation[
        props?.employeeLocation?.employeeLocation.length - 1
      ]?.long },
      knowFor: "End Location",
    },
  ] : props?.empLive
  // const myPlaces=props?.empLive
  ;
  // const myPlaces = props?.empLocation
  console.log("objectmyPlaces",myPlaces)

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

  const renderMap = () => {
    return (
      <Fragment>
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
          {myPlaces.map((place) => (
            <Marker
              key={place.id}
              position={place.pos}
              onLoad={(marker) => markerLoadHandler(marker, place)}
              onClick={(event) => markerClickHandler(event, place)}
            />
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

          {selectedPlace && <Circle center={selectedPlace.pos} radius={2000} />}
        </GoogleMap>

      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    employeeLocation: state.employeeLocation,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMap);

