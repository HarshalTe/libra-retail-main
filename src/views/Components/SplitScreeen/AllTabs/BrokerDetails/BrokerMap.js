import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '700px',
  height: '700px'
};

const center = {
  lat: 19.0760,
  lng: 72.8777,
};

function BrokerMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // googleMapsApiKey: "AIzaSyCuvDyzSmFHob__by1B7fcoZOFVlX90SOM"
    // googleMapsApiKey: "AIzaSyAKlPRku6WRueqWw_Cn4-QVInGCFYU5NTA"
    // comment
    // googleMapsApiKey: "AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q"
  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(BrokerMap)