import React, { Component } from 'react';
import { GoogleMap, useJsApiLoader, useLoadScript, Marker } from "@react-google-maps/api";
import keys from "../../keys"
import mapStyles from '../Styles/mapStyles';
// initialize array outside of load script object because react state treats array literals as new objects
const libraries = ["places"];

const mapContainerStyle = {
  width: '98.5vw',
  height: '98vh',
};

const mapPosition = {
  lat: 47.606209,
  lng: -122.332069,
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: keys.GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  
  if(loadError) return 'Error loading maps';
  if(!isLoaded) return 'Loading Maps';
  // example of how to add marker
  // const [markers, setMarkers] = React.useState([]);
  // const addMarker = (event) =>{
  //   setMarkers(currentState => [...currentState, {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   }])
  // }
  
  return <div>
    <h1>Proximity</h1>
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={12} 
      center={mapPosition}
      options={mapOptions}
      >
    </GoogleMap>
  </div>
}
export default Map;


// const mapStateToProps = (state) => ({
//   markers: state.markers,
// })

// const mapDispatchToProps = (dispatch) => ({
//   setMarkers: (marker) => dispatch(actions.markerCreator(marker)),
// });
// class Map extends Component {
//   constructor(props){
//     super(props);
//   }

//   render() {
//     const {isLoaded, loadError} = useLoadScript({
//       googleMapsApiKey: keys.GOOGLE_MAPS_API_KEY,
//       libraries: libraries,
//     });

//     if(loadError) return 'Error loading maps';
//     if(!isLoaded) return 'Loading Maps';  
//     return(
//     <div>
//       <h1>Proximity</h1>
//       <GoogleMap 
//         mapContainerStyle={mapContainerStyle} 
//         zoom={8} 
//         center={mapPosition}
//         options={mapOptions}
//         onClick={this.props.setMarkers}
//       >
//       </GoogleMap>
//     </div>
//     );
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Map);