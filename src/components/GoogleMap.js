import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const Map = withScriptjs(withGoogleMap(props => {
   const lat = parseFloat(props.latitude);
   const long = parseFloat(props.longitude);
   return (
       <GoogleMap
           defaultZoom={16}
           defaultCenter={{lat:lat, lng: long}}
       >
           {props.isMarkerShown && <Marker position={{lat: lat, lng: long}}/>}
       </GoogleMap>
   )
}));

export default Map;