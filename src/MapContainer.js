import React from 'react';
import { Map, Marker, Polygon, Popup } from 'react-leaflet';
import L from 'leaflet';
import TangramLayer from './TangramLayer'

export class MapContainer extends React.Component {

   constructor(props) {
      super(props);
      this.marker = React.createRef();

      this.state = {
         loaded: false,
         layer: null,
         popupPosition: [],
         popupHtml: 'Hello there'
      }
   }

   handleMapHover = (evt) => {
      if (evt.feature && this.props.tooltipActive) {
         const coordinates = evt.leaflet_event.latlng;

         const cat = evt.feature.properties['Description'];
         this.setState({
            popupPosition: [coordinates.lat, coordinates.lng],
            popupHtml: (
               <div>
                  <h3>{evt.feature.properties['Business Name']}</h3>
                  <div>Closes at <strong>{evt.feature.properties['Closing']}</strong></div>
                  {
                     evt.feature.properties['Capacity'] !== undefined &&
                     <div>Capacity of <strong>{evt.feature.properties['Capacity']}</strong></div>
                  }
                  <div>Located at <strong>{evt.feature.properties['Address']}</strong></div>
                  {
                     cat === 'All_Alcohol' || cat === 'Malt_Wine' || cat === 'Malt_Wine_Liquor'
                     ?
                     <div>Serves <strong>{cat.split('_').join(' ')}</strong></div>
                     :
                     <div>Category of <strong>{cat}</strong></div>
                  }
               </div>
            )
         })
      } else {
         this.setState({
            popupPosition: [],
            popupHtml: ''
         })
      }
   }

   componentDidMount = () => {
      setTimeout(() => {
         this.map.leafletElement.flyTo(this.props.center, 14)
      }, 500)

      this.map.leafletElement.attributionControl.addAttribution(
         '<a href="https://github.com/tangrams/tangram">Tangram</a> | <a href="https://here.xyz">HERE XYZ</a> | <a href="https://www.openstreetmap.org/">OSM</a>'
      )
   }

   handleDrag = () => {
      const coordinates = this.marker.current.leafletElement.getLatLng();
      this.props.handleMarkerMove([coordinates.lat, coordinates.lng]);
   }

   handleClick = (evt) => this.props.handleMarkerMove([evt.latlng.lat, evt.latlng.lng]);


   render() {
      const redIcon = new L.Icon({
         iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
         iconSize: [25, 41],
         iconAnchor: [12, 41],
         popupAnchor: [1, -34],
         shadowSize: [41, 41]
      });
      return (
            <Map
               ref={(ref) => { this.map = ref }}
               center={this.props.center}
               zoom={this.props.zoom}
               zoomControl={false}
               onClick={this.handleClick}
            >
               <TangramLayer
                  scene={this.props.scene}
                  onMapHover={this.handleMapHover}
               />
               {
                  this.props.markerPosition.length &&
                  <Marker
                     position={this.props.markerPosition}
                     draggable={true}
                     onDragEnd={this.handleDrag}
                     ref={this.marker}
                     icon={redIcon}
                  />
               }
               {
                  this.props.polygon.length &&
                  <Polygon
                     positions={this.props.polygon}
                     color="#FF8281"
                  />
               }
               {
                  this.state.popupPosition.length &&
                  <Popup
                     position={this.state.popupPosition}
                     className="custom"
                     closeButton={false}
                  >
                     {this.state.popupHtml}
                  </Popup>
               }
            </Map>
      )
   }
}
