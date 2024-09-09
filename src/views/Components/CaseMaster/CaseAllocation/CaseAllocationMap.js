import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  Container,
  PaginationLink,
  Pagination,
  PaginationItem,
  Form,
} from "reactstrap";

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

function CaseAllocationMap() {
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
    // googleMapsApiKey: "AIzaSyAgO1Q3qXFvuv91idppFlJk-FCP3-1KbJI",
    // comment
    // googleMapsApiKey: "AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q",
    // libraries: "",
  });

  // The places I want to create markers for.
  // This could be a data-driven prop.
  const myPlaces = [
    {
      id: "SVIS",
      pos: { lat: 19.227, lng: 72.8309 },
      knowFor: `Enginerr name:${""} , Pending Visit:${""} , Current Location:${""} , Total Visit:${""}`,
    },
    {
      id: "Phoenix Hospital",
      pos: { lat: 19.2196, lng: 72.8381 },
      knowFor: `Enginerr name:${""} , Pending Visit:${""} , Current Location:${""} , Total Visit:${""}`,
    },
    {
      id: "MHB Police Station",
      pos: { lat: 19.2322, lng: 72.8405 },
      knowFor: `Enginerr name:${""} , Pending Visit:${""} , Current Location:${""} , Total Visit:${""}`,
    },
    {
      id: "Water Kingdom",
      pos: { lat: 19.2315, lng: 72.8075 },
      knowFor: `Enginerr name:${""} , Pending Visit:${""} , Current Location:${""} , Total Visit:${""}`,
    },

    {
      id: "EsselWorld",
      pos: { lat: 19.2315, lng: 72.8051 },
      knowFor: `Enginerr name:${""} , Pending Visit:${""} , Current Location:${""} , Total Visit:${""}`,
    },
  ];

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    myPlaces.map((place) => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // We have to create a mapping of our places to actual Marker objects
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

  const renderMap = () => {
    return (
      <Fragment>
        <Card>
          <CardHeader className="bg-info text-white">
            <Row>
              <Col>
                <strong>Live Engineer Status</strong>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <GoogleMap
              // Do stuff on map initial laod
              onLoad={loadHandler}
              // Save the current center position in state
              //   onCenterChanged={() => setCenter(mapRef.getCenter().toJSON())}
              // Save the user's map click position
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

              {selectedPlace && (
                <Circle center={selectedPlace.pos} radius={2000} />
              )}
            </GoogleMap>
          </CardBody>
        </Card>

        {/* Our center position always in state */}
        {/* <h3>
          Center {center.lat}, {center.lng}
        </h3> */}

        {/* Position of the user's map click */}
        {/* {clickedLatLng && (
          <h3>
            You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        )} */}

        {/* Position of the user's map click */}
        {/* {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>} */}
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default CaseAllocationMap;
