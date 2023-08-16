import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const GoogleMapCard = ({ address }) => {
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`
        );

        const { results } = response.data;
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setMapCenter({ lat, lng });
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    geocodeAddress();
  }, [address]);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      {mapCenter && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={14}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapCard;
