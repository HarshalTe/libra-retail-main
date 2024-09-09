import React from 'react';
import QRCode from 'qrcode.react';

const QrCodeGeoTag = (props) => {
  return <QRCode value={`Latitude=${props?.data?.lat},Longitude=${props?.data?.long}`} size={120} />;
};

export default QrCodeGeoTag;