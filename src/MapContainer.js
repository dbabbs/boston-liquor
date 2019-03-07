import React from 'react';
import { Map, Marker, Polygon } from 'react-leaflet';
import { hereTileUrl } from './here';

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

      if (this.state.loaded) {
         this.state.layer.scene.config.sources._boston_alcohol.url = 'https://xyz.api.here.com/hub/spaces/PaLBoFL4/tile/web/{z}_{x}_{y}?tags=' + this.props.filterTags;
         //SCENE.sources._boston_alcohol.url = 'https://xyz.api.here.com/hub/spaces/PaLBoFL4/tile/web/{z}_{x}_{y}?tags=' + this.props.filterTags;
         // console.log(this.state.layer.scene.config.sources._boston_alcohol.url)
         this.state.layer.scene.updateConfig()
         // this.state.layer.scene.load(SCENE);
      }
   }

   handleDrag = () => {
      const coordinates = this.marker.current.leafletElement.getLatLng();
      this.props.handleDrag([coordinates.lat, coordinates.lng]);
   }

   handleClick = (evt) => {

      this.props.handleDrag([evt.latlng.lat, evt.latlng.lng])
   }

   render() {
      console.log(this.props);
      return (
            <Map
               ref={(ref) => { this.map = ref }}
               center={this.props.center}
               zoom={this.props.zoom}
               zoomControl={false}
               attributionControl={this.props.index === 8}
               onClick={this.handleClick}
            >

               <Marker
                  position={this.props.markerPosition}
                  draggable={true}
                  onDragEnd={this.handleDrag}
                  ref={this.marker}

               />
               {
                  this.props.polygon.length > 0 &&
                  <Polygon
                     positions={this.props.polygon}
                     color="#2DD5C9"
                  />
               }
            </Map>
      )
   }
}
