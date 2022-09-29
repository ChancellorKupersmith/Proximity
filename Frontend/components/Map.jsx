import React, { Component, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import keys from "../../keys"
import mapStyles from '../Styles/mapStyles';
import AreaSearchBar from './AreaSearch.jsx';

// initialize GoogleMap params outside of component 
// because react state treats array literals as new objects
const mapContainerStyle = {
  width: '98.5vw',
  height: '98vh',
};

const initMapPosition = {
  lat: 47.606209,
  lng: -122.332069,
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

const Map = (props) => {

  //21.37
  const [city, setCityLocation] = React.useState();
  // Order matters here? has to be above google api call
  // Used for referencing map later without updating state
  const mapRef = useRef();
  // use callback is used so map ref is only updated if we get a new map
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  // Loads map from google maps api
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: keys.GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  if(loadError) return 'Error loading maps';
  if(!isLoaded) return 'Loading Maps'; 
  

  return <div>
    <h1>Proximity</h1>
    <AreaSearchBar
      key='area-search-bar'
      city={city}
      setCityLocation={ (position)=>{
        setCityLocation(position);
        mapRef.current?.panTo(position);
      }}
    />
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={12} 
      center={initMapPosition}
      options={mapOptions}
      onLoad={onLoad}
      >
    </GoogleMap>
  </div>
}
export default Map;