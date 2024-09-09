import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({ brokers }) => (
  <div style={{ height: '400px', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q' }}
      defaultCenter={{ lat: 19.2863309, lng: 72.8606488 }}
      defaultZoom={12}
    >
      {brokers.map(broker => (
        <div
          key={broker.id}
          lat={broker.lat}
          lng={broker.lng}
          style={{ color: 'red', fontSize: '20px' }}
        >
          {broker.name}
        </div>
      ))}
    </GoogleMapReact>
  </div>
);

const NearBrokers = () => {
  const [brokers, setBrokers] = useState([]);

  // useEffect(() => {
  //   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=19.2863309,72.8606488&radius=5000&type=real_estate_agency&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       const brokers = data.results.map(result => ({
  //         id: result.id,
  //         name: result.name,
  //         lat: result.geometry.location.lat,
  //         lng: result.geometry.location.lng,
  //       }));
  //       setBrokers(brokers);
  //     });
  // }, []);

  return <Map brokers={brokers} />;
};

export default NearBrokers;
