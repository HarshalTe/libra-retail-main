import React from 'react';

const MapImage = ({ latitude, longitude, surroundingDevelopment }) => {
  const apiKey = 'api'; // Replace with your Mappls API key

  // Use `maptype=satellite` for satellite view or `maptype=hybrid` for hybrid view
  const mapUrl = `https://apis.mappls.com/advancedmaps/v1/${apiKey}/still_image?center=${latitude},${longitude}&zoom=15&size=600x296&maptype=hybrid`;

  return (
    <div className="mx-auto" style={{textAlign: "center"}}>
      <img
        src={mapUrl}
        alt={`Map of property at coordinates (${latitude}, ${longitude})`}
        style={{ width: '95%', height: 'auto' }}
      />
      <p className="p-1 mt-4 text-center">
        Latitude, Longitude: {latitude}, {longitude} &
        <br />
        Surrounding Development: {surroundingDevelopment}
      </p>
    </div>
  );
};

export default MapImage;
