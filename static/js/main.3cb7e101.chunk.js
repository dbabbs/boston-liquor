(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,a){e.exports=a(37)},31:function(e,t,a){},32:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(12),i=a.n(o),s=(a(31),a(7)),l=a(8),c=a(10),u=a(9),p=a(11),d=(a(32),a(39)),h=a(38),m=a(40),f=a(41),g=a(4),b=a.n(g),y=a(20),E=a.n(y),k=a(16),v=a(6),_=a(17),x=a.n(_),w=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"createLeafletElement",value:function(e){var t=(e.leaflet||this.context).map;return this.layer=E.a.leafletLayer({scene:e.scene,events:{click:e.onMapClick,hover:e.onMapHover}}).addTo(t),this.layer}},{key:"updateLeafletElement",value:function(e,t){this.layer.scene.updateConfig()}},{key:"componentWillUnmount",value:function(){var e=this.context.map;this.layer.removeFrom(e)}}]),t}(k.a);w.propTypes={scene:x.a.object.isRequired,onMapClick:x.a.func,onMapHover:x.a.func};var C=Object(v.b)(w),S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleMapHover=function(e){if(e.feature&&a.props.tooltipActive){var t=e.leaflet_event.latlng,n=e.feature.properties.Description;a.setState({popupPosition:[t.lat,t.lng],popupHtml:r.a.createElement("div",null,r.a.createElement("h3",null,e.feature.properties["Business Name"]),r.a.createElement("div",null,"Closes at ",r.a.createElement("strong",null,e.feature.properties.Closing)),void 0!==e.feature.properties.Capacity&&r.a.createElement("div",null,"Capacity of ",r.a.createElement("strong",null,e.feature.properties.Capacity)),r.a.createElement("div",null,"Located at ",r.a.createElement("strong",null,e.feature.properties.Address)),"All_Alcohol"===n||"Malt_Wine"===n||"Malt_Wine_Liquor"===n?r.a.createElement("div",null,"Serves ",r.a.createElement("strong",null,n.split("_").join(" "))):r.a.createElement("div",null,"Category of ",r.a.createElement("strong",null,n)))})}else a.setState({popupPosition:[],popupHtml:""})},a.componentDidMount=function(){setTimeout(function(){a.map.leafletElement.flyTo(a.props.center,14)},500),a.map.leafletElement.attributionControl.addAttribution('<a href="https://github.com/tangrams/tangram">Tangram</a> | <a href="https://here.xyz">HERE XYZ</a> | <a href="https://www.openstreetmap.org/">OSM</a>')},a.handleDrag=function(){var e=a.marker.current.leafletElement.getLatLng();a.props.handleMarkerMove([e.lat,e.lng])},a.handleClick=function(e){return a.props.handleMarkerMove([e.latlng.lat,e.latlng.lng])},a.marker=r.a.createRef(),a.state={loaded:!1,layer:null,popupPosition:[],popupHtml:"Hello there"},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=new b.a.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});return r.a.createElement(d.a,{ref:function(t){e.map=t},center:this.props.center,zoom:this.props.zoom,zoomControl:!1,onClick:this.handleClick},r.a.createElement(C,{scene:this.props.scene,onMapHover:this.handleMapHover}),this.props.markerPosition.length&&r.a.createElement(h.a,{position:this.props.markerPosition,draggable:!0,onDragEnd:this.handleDrag,ref:this.marker,icon:t}),this.props.polygon.length&&r.a.createElement(m.a,{positions:this.props.polygon,color:"#FF8281"}),this.state.popupPosition.length&&r.a.createElement(f.a,{position:this.state.popupPosition,className:"custom",closeButton:!1},this.state.popupHtml))}}]),t}(r.a.Component),M="amxmh2DxNV8EYfX6W9Lm",j="WFmyiFcGFxyYEOgrZjDcGA",z={space:"Vv1iS7FJ",token:"ALWZfy8j9YlwT0ejfMRv0lE"},A=function(e,t){return"https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=".concat(M,"&app_code=").concat(j,"&mode=shortest;pedestrian;traffic:disabled&start=geo!").concat(e[0],",").concat(e[1],"&range=").concat(60*t,"&rangetype=time")},F=function(e){return"https://geocoder.api.here.com/6.2/geocode.json?app_id=".concat(M,"&app_code=").concat(j,"&searchtext=").concat(e)},D=function(e){return"https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=".concat(e[0],",").concat(e[1],",250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=").concat(M,"&app_code=").concat(j)},O=a(24),P=a(23),L=[{label:"All Alcohol",id:"All_Alcohol",active:!0,background:"#3C4BF1"},{label:"Malt & Wine",id:"Malt_Wine",active:!0,background:"#50D05E"},{label:"Malt, Wine, Liquor",id:"Malt_Wine_Liquor",active:!0,background:"#E265F0"},{label:"Tavern",id:"Tavern",active:!0,background:"#EC3B43"},{label:"Farmer",id:"Farmer",active:!0,background:"#8BFFF2"},{label:"Other",id:"Other",active:!0,background:"yellow"}],T={cameras:{camera1:{type:"perspective"}},sources:{xyz_osm:{type:"MVT",url:"https://xyz.api.here.com/tiles/osmbase/256/all/{z}/{x}/{y}.mvt",url_params:{access_token:z.token},max_zoom:16},_boston_alcohol:{type:"GeoJSON",url:"https://xyz.api.here.com/hub/spaces/".concat(z.space,"/tile/web/{z}_{x}_{y}"),url_params:{access_token:z.token}}},global:{language:"en",language_text_source:"function() {\n    // Use preferred language label if available\n    return (global.language && feature['name:'+global.language]) || feature.name;\n}\n"},layers:{boston_alcohol:{data:{source:"_boston_alcohol"},draw:{points:{color:"function() {\n    if (feature.Description === 'All_Alcohol') {\n        return '#3C4BF1';\n    } else if (feature.Description === 'Farmer') {\n        return '#8BFFF2'\n    } else if (feature.Description === 'Malt_Wine') {\n        return '#50D05E'\n    } else if (feature.Description === 'Malt_Wine_Liquor') {\n        return '#E265F0'\n    } else if (feature.Description === 'Other') {\n        return 'yellow'\n    } else if (feature.Description === 'Tavern') {\n        return '#EC3B43'\n    }\n}\n",size:[[13,"7.5px"],[16,"16px"]],order:1e4,interactive:!0,collide:!1}}},places:{data:{source:"xyz_osm"},"city-points":{filter:{kind:"locality",kind_detail:"city",$zoom:{max:18}},draw:{text:{text_source:"global.language_text_source",priority:10,order:999,font:{family:"Lato",fill:"#C3CDD4",stroke:{color:"white",width:4},size:[[4,"15px"],[8,"18px"],[12,"26px"]],buffer:"2px"}}}},neighborhoods:{filter:[{kind:["neighbourhood","macrohood"],$zoom:{min:13}},{kind:"microhood",$zoom:{min:15}}],draw:{text:{text_source:"global.language_text_source",priority:10,order:999,font:{family:"Lato",fill:"#C3CDD4",stroke:{color:"white",width:4},size:[[4,"10px"],[8,"14px"],[12,"14px"]],buffer:"2px"}}}}},earth:{data:{source:"xyz_osm"},draw:{polygons:{order:"function() { return feature.sort_rank; }",color:"white"}}},landuse:{data:{source:"xyz_osm"},draw:{polygons:{order:"function() { return feature.sort_rank; }",color:"#E9EEF1"}}},water:{data:{source:"xyz_osm"},draw:{polygons:{order:"function() { return feature.sort_rank; }",color:"#DEE1E3"}}},roads:{data:{source:"xyz_osm"},filter:{not:{kind:["path","rail","ferry"]}},draw:{lines:{order:"function() { return feature.sort_rank; }",color:"#C3CDD4",width:8,cap:"round"}},highway:{filter:{kind:"highway"},draw:{lines:{order:"function() { return feature.sort_rank; }",color:"#D3DCE1",width:[[5,5e3],[8,800],[10,200],[12,100],[14,40],[18,20]],outline:{color:"#EEEEEE",width:[[16,0],[18,1.5]]}}}},minor_road:{filter:{kind:"minor_road"},draw:{lines:{order:"function() { return feature.sort_rank; }",color:"#F8FAFB",width:5}}}},buildings:{data:{source:"xyz_osm"},draw:{polygons:{order:"function() { return feature.sort_rank; }",color:"#E9EBEB"}},"3d-buildings":{filter:{$zoom:{min:15}},draw:{polygons:{extrude:"function () { return feature.height > 20 || $zoom >= 16; }"}}}}}},N=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).updateFilterTags=function(e){var t=Object.assign({},a.state.scene);t.sources._boston_alcohol.url="https://xyz.api.here.com/hub/spaces/".concat(z.space,"/tile/web/{z}_{x}_{y}?tags=")+e.join(","),a.setState({scene:t,filterTags:e})},a.updatePolygon=function(){fetch(A(a.state.markerPosition,a.state.range)).then(function(e){return e.json()}).then(function(e){if(e.hasOwnProperty("response")){var t=Object(P.polygon)([e.response.isoline[0].component[0].shape.map(function(e){return[Number(e.split(",")[1]),Number(e.split(",")[0])]})]),n=Object(O.a)(a.state.points,t).features.map(function(e){return e.properties.Index});a.setState({polygon:e.response.isoline[0].component[0].shape.map(function(e){return[e.split(",")[0],e.split(",")[1]]})}),a.updateFilterTags(n)}else a.setState({polygon:[]}),a.updateFilterTags([])})},a.updateAddressText=function(){fetch(D(a.state.markerPosition)).then(function(e){return e.json()}).then(function(e){var t=e.Response.View[0].Result[0].Location.Address;a.setState({address:"".concat(void 0!==t.HouseNumber?t.HouseNumber:"","  ").concat(void 0!==t.Street?t.Street:""," ").concat(t.City),addressSearch:"".concat(void 0!==t.HouseNumber?t.HouseNumber:"","  ").concat(void 0!==t.Street?t.Street:""," ").concat(t.City)})})},a.handleMarkerMove=function(e){a.setState({markerPosition:e},function(){a.updatePolygon(),a.updateAddressText()})},a.handleSlide=function(e){a.setState({range:e.target.value},function(){a.updatePolygon()})},a.handleClearMarker=function(){a.setState({markerPosition:[]},function(){a.updatePolygon()})},a.handleEscapeKey=function(e){27===e.keyCode&&a.handleClearMarker()},a.handleAddressSearch=function(e){var t=e.target.value;a.setState({addressSearch:t})},a.handleAddressSearchClick=function(){fetch(F(a.state.addressSearch)).then(function(e){return e.json()}).then(function(e){if(e.Response.View.length>0){var t=e.Response.View[0].Result[0].Location.DisplayPosition;a.handleMarkerMove([t.Latitude,t.Longitude])}else a.setState({addressSearch:"Error!"})})},a.componentDidMount=function(){document.onkeydown=a.handleEscapeKey,fetch("https://xyz.api.here.com/hub/spaces/".concat(z.space,"/search?access_token=AbuvUKANJJEZR4nb1zkEXBE&tags=")).then(function(e){return e.json()}).then(function(e){a.setState({points:e})})},a.state={name:"Seattle, WA",startCoordinates:[42.35999762427866,-71.05780662703944],polygon:[],markerPosition:[],filterTags:"",zoom:10,range:20,address:"",categories:L,addressSearch:"134 Salem St. Boston",tooltipActive:!1,scene:T},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"sidebar"},r.a.createElement("h1",null,"Boston Liquor Licenses \ud83c\udf7b"),r.a.createElement("p",null,"List of establishments with liquor licenses in Boston, MA from 2016."),r.a.createElement("input",{type:"checkbox",id:"tooltip",checked:this.state.tooltipActive,onChange:function(){return e.setState({tooltipActive:!e.state.tooltipActive})}}),r.a.createElement("label",{htmlFor:"tooltip"},"Tooltip active"),r.a.createElement("h2",null,"Establishment type"),this.state.categories.map(function(e,t){return r.a.createElement("div",{className:"line-parent",key:t},r.a.createElement("div",{className:"line",id:"".concat(e.id,"-label"),style:{background:e.background}}),e.label)}),r.a.createElement("h2",null,"Explore establishments in walking distance"),this.state.markerPosition.length<1&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Click the map to add a draggable marker to explore establishments."),r.a.createElement("p",null,"...or enter an address:"),r.a.createElement("input",{type:"text",value:this.state.addressSearch,onChange:this.handleAddressSearch}),r.a.createElement("span",{style:{marginRight:"10px",display:"inline-block"}}),r.a.createElement("button",{onClick:this.handleAddressSearchClick},"Search")),this.state.markerPosition.length>0&&r.a.createElement("div",null,r.a.createElement("div",{className:"slider-container"},r.a.createElement("input",{type:"range",value:this.state.range,min:"1",max:"60",onChange:this.handleSlide}),"  ",this.state.range," minutes"),r.a.createElement("p",null,"Within a ",r.a.createElement("strong",null,this.state.range)," minute walk of ",r.a.createElement("strong",null,this.state.address),", there are ",r.a.createElement("strong",null,this.state.filterTags.length)," establishments that serve liquor."),r.a.createElement("button",{onClick:this.handleClearMarker},"Clear Filter")),r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",id:"link",href:"https://here.xyz"},"Get mappy with HERE XYZ")),r.a.createElement("div",{className:"map-grid"},r.a.createElement(S,{center:this.state.startCoordinates,zoom:this.state.zoom,handleMarkerMove:this.handleMarkerMove,polygon:this.state.polygon,markerPosition:this.state.markerPosition,tooltipActive:this.state.tooltipActive,scene:this.state.scene})))}}]),t}(r.a.Component);i.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.3cb7e101.chunk.js.map