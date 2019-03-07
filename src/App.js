import React from 'react';
import './App.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl, maxIsolineRangeLookup } from './here';

import pointsWithinPolygon from '@turf/points-within-polygon';
import {polygon} from '@turf/helpers'

class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {

         //Coordinates are in format [Latitude, Longitude]
         name: 'Seattle, WA',
         startCoordinates: [42.33621470741859, -71.08935356140138],
         polygon: [],
         center: [0, 0],
         filterTags: '',
         zoom: 13,
         options: {

            type: 'distance',
            range: 1000,
            mode: 'car',
            traffic: 'disabled',
            style: 'reduced.night'
         },
         range: 40
      }
   }


   componentDidMount = () => {

      fetch('https://xyz.api.here.com/hub/spaces/PaLBoFL4/search?access_token=AbuvUKANJJEZR4nb1zkEXBE&tags=')
         .then(res => res.json())
         .then(res => {
            this.setState({
               points: res
            })
         });
   }

   updatePolygon = () => {
      fetch(hereIsolineUrl(this.state.center, this.state.range))
      .then(res => res.json())
      .then(res => {
         if (res.hasOwnProperty('response')) {
            const turfPoly = polygon([res.response.isoline[0].component[0].shape.map(x => [Number(x.split(',')[1]), Number(x.split(',')[0])])]);

            const within = pointsWithinPolygon(this.state.points, turfPoly);

            const tags = within.features.map(feature => feature.properties.Index).join(',');

            this.setState({
               filterTags: tags,
               polygon: res.response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]])
            })
         } else {
            this.setState({
               polygon: [],
               filterTags: ''
            })
         }






      });
   }

   handleDrag = (coordinates) => {
      this.setState({
         center: coordinates
      }, () => {
         this.updatePolygon();
      })

   }

   handleSlide = (evt) => {
      this.setState({
         range: evt.target.value
      },() => {
         this.updatePolygon();
      })

   }

   handleClearMarker = () => {
      this.setState({
         center: [0, 0],
      }, () => {
         this.updatePolygon();
      })
   }


   render() {

      return (
         <div className="app">
            <div className="sidebar">
               <h3>Boston Liqour Licenses</h3>
               <p>List of establishments with liqour licenses in the city of Boston, Massachusetts</p>
               <h4>Filter by type:</h4>
               <div>
                  <input type="checkbox" name="type" id="rapid_bus" checked />

                  <label for="rapid_bus">
                     <div class="line" id="rapid_bus_line"></div>
                     Rapid Bus
                  </label>
               </div>
               <div>
                  <input type="checkbox" name="type" id="rapid_bus_transit" checked />

                  <label for="rapid_bus_transit">
                     <div class="line" id="rapid_bus_transit_line"></div>
                     Rapid Bus Transit
                  </label>

               </div>
               <div>
                  <input type="checkbox" name="type" id="street_car"checked />

                  <label for="street_car">
                     <div class="line" id="street_car_line"></div>
                     Street Car
                  </label>

               </div>
               <h4>Explore establishments in walking distance</h4>
               <p>Click the map to add a draggable marker</p>
               <div>
                  <input
                     type="range"
                     name="volume"
                     value={this.state.range}
                     min="1"
                     max="60"
                     onChange={this.handleSlide}
                  />
                  {this.state.range}{" minutes"}
               </div>
               {
                  this.state.center !== [0, 0] &&
                  <button
                     onClick={this.handleClearMarker}
                  >
                     Clear Marker
                  </button>
               }



            </div>
            <div className="map-grid">

                  <MapContainer
                     center={this.state.startCoordinates}
                     zoom={this.state.zoom}
                     options={this.state.options}
                     handleDrag={this.handleDrag}
                     polygon={this.state.polygon}
                     filterTags={this.state.filterTags}
                     markerPosition={this.state.center}
                  />


            </div>
         </div>
      );
   }
}

export default App;
