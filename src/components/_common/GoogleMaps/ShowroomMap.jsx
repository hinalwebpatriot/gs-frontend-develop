import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";
import clientConfig from "../../../config/client.config";

const mapStyles = {
  width: "100%"
  // height: '250px',
  // height: '52vh'
};

class ShowroomMap extends React.Component {
  render() {
    const { location, initialZoom = 13 } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={initialZoom}
        style={mapStyles}
        initialCenter={location}
        center={location}
        disableDefaultUI={true}
        // className="col"
      >
        <Marker position={location} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: clientConfig.googleMaps.key,
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
})(ShowroomMap);
