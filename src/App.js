import React from 'react';
import './App.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl, hereReverseGeocodeUrl } from './here';

import pointsWithinPolygon from '@turf/points-within-polygon';
import {polygon} from '@turf/helpers'

class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {

         //Coordinates are in format [Latitude, Longitude]
         name: 'Seattle, WA',
         startCoordinates: [42.362451, -71.058466],
         polygon: [],
         markerPosition: [],
         filterTags: '',
         zoom: 14,
         options: {

            type: 'distance',
            range: 1000,
            mode: 'car',
            traffic: 'disabled',
            style: 'reduced.night'
         },
         range: 20,
         address: '',
         categories: [
            {
               label: 'All Alcohol',
               id: 'all_alcohol',
               active: true
            },
            {
               label: 'Farmer',
               id: 'farmer',
               active: true
            },
            {
               label: 'Malt & Wine',
               id: 'malt_&_wine',
               active: true
            },
            {
               label: 'Malt, Wine, Liquor',
               id: 'malt,_wine,_liquor',
               active: true
            },
            {
               label: 'Other',
               id: 'other',
               active: true
            },
            {
               label: 'Tavern',
               id: 'tavern',
               active: true
            }
         ]
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
               <h3>Boston Liqour Licenses</h3>
               <p>List of establishments with liqour licenses in the city of Boston, Massachusetts from 2016.</p>
               <h4>Filter by type:</h4>

               {
                  this.state.categories.map(
                     (cat, i) =>
                     <div key={i}>
                        <input onChange={this.handleCategoryFilter} type="checkbox" name="type" id={cat.id} checked={cat.active} />
                        <label htmlFor={cat.id}>
                           <div className="line" id={`${cat.id}-label`}></div>
                           {cat.label}
                        </label>
                     </div>
                  )
               }
               <h4>Explore establishments in walking distance</h4>
               <p>Click the map to add a draggable marker</p>
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
                     <button
                        onClick={this.handleClearMarker}
                     >
                        Clear Marker
                     </button>
                     <p>Within a <strong>{this.state.range}</strong> minute walk of <strong>{this.state.address}</strong>, there are <strong>{this.state.filterTags.length}</strong> establishments that serve liquor.</p>
                  </div>
               }
            </div>
            <div className="map-grid">

                  <MapContainer
                     center={this.state.startCoordinates}
                     zoom={this.state.zoom}
                     options={this.state.options}
                     handleMarkerMove={this.handleMarkerMove}
                     polygon={this.state.polygon}
                     filterTags={{
                        ids: this.state.filterTags.length > 0 ? this.state.filterTags : [],
                        categories: this.state.categories.filter(x => x.active).map(x => x.id)
                     }}
                     markerPosition={this.state.markerPosition}
                  />


            </div>
         </div>
      );
   }
}

export default App;
