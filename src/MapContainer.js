import React from 'react';
import { Map, Marker, Polygon, Popup } from 'react-leaflet';

import Tangram from 'tangram';

import SCENE from './SCENE'


export class MapContainer extends React.Component {

   constructor(props) {
      super(props);
      this.marker = React.createRef();

      this.state = {
         loaded: false,
         scene: SCENE,
         layer: null
      }
   }

   componentDidMount () {
      this.setState({
         layer: Tangram.leafletLayer({
            scene: this.state.scene
         })
      }, () => {
         this.state.layer.scene.subscribe({
            load: (scene) => {
               this.setState({
                  loaded: true
               })
            }
         })
         this.state.layer.addTo(this.map.leafletElement);
      })





   }

   componentDidUpdate() {
      // console.log('new')
      // console.log(this.state.loaded)
      const tags = this.props.filterTags.ids.join(',') + '+' + this.props.filterTags.categories.join('+');
      if (this.state.loaded) {
         this.state.layer.scene.config.sources._boston_alcohol.url = 'https://xyz.api.here.com/hub/spaces/PaLBoFL4/tile/web/{z}_{x}_{y}?tags=' + tags;
         //SCENE.sources._boston_alcohol.url = 'https://xyz.api.here.com/hub/spaces/PaLBoFL4/tile/web/{z}_{x}_{y}?tags=' + this.props.filterTags;
         // console.log(this.state.layer.scene.config.sources._boston_alcohol.url)
         this.state.layer.scene.updateConfig()
         // this.state.layer.scene.load(SCENE);
         console.log(this.state.layer.scene.config.sources._boston_alcohol.url)
      }
   }

   handleDrag = () => {
      const coordinates = this.marker.current.leafletElement.getLatLng();
      this.props.handleMarkerMove([coordinates.lat, coordinates.lng]);
   }

   handleClick = (evt) => {
      this.props.handleMarkerMove([evt.latlng.lat, evt.latlng.lng])
   }

   render() {
      console.log(this.props.filterTags);
      return (
            <Map
               ref={(ref) => { this.map = ref }}
               center={this.props.center}
               zoom={this.props.zoom}
               zoomControl={false}
               onClick={this.handleClick}
            >
               {
                  this.props.markerPosition.length &&
                  <Marker
                     position={this.props.markerPosition}
                     draggable={true}
                     onDragEnd={this.handleDrag}
                     ref={this.marker}
                  />
               }
               {
                  this.props.polygon.length &&
                  <Polygon
                     positions={this.props.polygon}
                  />
               }
            </Map>
      )
   }
}
