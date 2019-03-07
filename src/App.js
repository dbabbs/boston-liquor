import React from 'react';
import './App.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl, hereReverseGeocodeUrl } from './here';

import pointsWithinPolygon from '@turf/points-within-polygon';
import {polygon} from '@turf/helpers'
import { categories } from './config.js'

class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         name: 'Seattle, WA',
         startCoordinates: [42.35999762427866, -71.05780662703944],
         polygon: [],
         markerPosition: [],
         filterTags: '',
         zoom: 14,
         range: 20,
         address: '',
         categories: categories
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
      fetch(hereIsolineUrl(this.state.markerPosition, this.state.range))
      .then(res => res.json())
      .then(res => {
         if (res.hasOwnProperty('response')) {
            const turfPoly = polygon([res.response.isoline[0].component[0].shape.map(x => [Number(x.split(',')[1]), Number(x.split(',')[0])])]);

            const within = pointsWithinPolygon(this.state.points, turfPoly);

            const tags = within.features.map(feature => feature.properties.Index);

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

   updateAddressText = () => {
      fetch(hereReverseGeocodeUrl(this.state.markerPosition))
      .then(res => res.json())
      .then(res => {
         console.log(res);
         const address = res.Response.View[0].Result[0].Location.Address;
         console.log(address);
         this.setState({
            address: `${address.HouseNumber !== undefined ? address.HouseNumber : ''}  ${address.Street !== undefined ? address.Street : ''} ${address.City}`
         })
      })
   }

   handleMarkerMove = (coordinates) => {
      this.setState({
         markerPosition: coordinates
      }, () => {
         this.updatePolygon();
         this.updateAddressText();
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
         markerPosition: [],
      }, () => {
         this.updatePolygon();
      })
   }

   handleCategoryFilter = (evt) => {
      console.log(evt.target);
      const copy = this.state.categories.slice();

      this.setState({
         categories: copy.map(c => {
            if (c.id === evt.target.id) {
               c.active = !c.active;
            }
            return c;
         })
      })

   }

   render() {
      return (
         <div className="app">
            <div className="sidebar">
               <h1>Boston Liquor Licenses 🍻</h1>
               <p>List of establishments with liqour licenses in Boston, MA from 2016.</p>
               <h2>Establishment type</h2>

               {
                  this.state.categories.map(
                     (cat, i) =>
                     <div className="line-parent" key={i}>
                           <div className="line" id={`${cat.id}-label`} style={{background: cat.background}}></div>
                           {cat.label}
                     </div>
                  )
               }
               <h2>Explore establishments in walking distance</h2>
               {
                  !this.state.markerPosition.length &&
                  <p>Click the map to add a draggable marker</p>
               }

               {
                  this.state.markerPosition.length &&
                  <div>
                     <div>
                        <input
                           type="range"
                           value={this.state.range}
                           min="1"
                           max="60"
                           onChange={this.handleSlide}
                        />
                        {this.state.range}{" minutes"}
                     </div>
                     <p>Within a <strong>{this.state.range}</strong> minute walk of <strong>{this.state.address}</strong>, there are <strong>{this.state.filterTags.length}</strong> establishments that serve liquor.</p>
                     <button
                        onClick={this.handleClearMarker}
                     >
                        Clear Isoline Filter
                     </button>
                  </div>
               }
               <a id="link" href="https://here.xyz">Get mappy with HERE XYZ</a>
            </div>
            <div className="map-grid">

               <MapContainer
                  center={this.state.startCoordinates}
                  zoom={this.state.zoom}
                  handleMarkerMove={this.handleMarkerMove}
                  polygon={this.state.polygon}
                  filterTags={this.state.filterTags.length > 0 ? this.state.filterTags : []}
                  markerPosition={this.state.markerPosition}
               />


            </div>
         </div>
      );
   }
}

export default App;
