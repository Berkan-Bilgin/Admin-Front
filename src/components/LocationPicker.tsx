import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Google Maps API anahtarınızı buraya girin
const API_KEY = '';

interface LocationPickerProps {
  onLocationSelected: (lat: number, lng: number) => void;
}

const defaultCenter = {
  lat: 41.0082, // İstanbul için enlem
  lng: 28.9784, // İstanbul için boylam
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelected }) => {
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [currentCenter, setCurrentCenter] = useState(defaultCenter);

  const mapRef = useRef<google.maps.Map | null>(null);

  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    console.log(event);
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setSelectedPosition(newLocation);

      if (onLocationSelected) {
        onLocationSelected(newLocation.lat, newLocation.lng);
      }

      // Haritayı yeni konuma yavaşça kaydır
      if (mapRef.current) {
        mapRef.current.panTo(newLocation);
      }

      setCurrentCenter(newLocation);
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          onClick={onMapClick}
          onLoad={(map) => {
            mapRef.current = map; // Harita yüklendiğinde referansı ayarla
          }}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default LocationPicker;
