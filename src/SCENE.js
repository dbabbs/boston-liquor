import {
   xyz
} from './here.js';
import {
   categories
} from './config';
const SCENE = {
   "cameras": {
      "camera1": {
         "type": "perspective"
      }
   },
   "sources": {
      "xyz_osm": {
         "type": "MVT",
         "url": "https://xyz.api.here.com/tiles/osmbase/256/all/{z}/{x}/{y}.mvt",
         "url_params": {
            "access_token": xyz.token
         },
         "max_zoom": 16
      },
      "_boston_alcohol": {
         "type": "GeoJSON",
         "url": `https://xyz.api.here.com/hub/spaces/${xyz.space}/tile/web/{z}_{x}_{y}`,
         "url_params": {
            "access_token": xyz.token
         }
      }
   },
   "global": {
      "language": "en",
      "language_text_source": "function() {\n    // Use preferred language label if available\n    return (global.language && feature['name:'+global.language]) || feature.name;\n}\n"
   },
   "layers": {
      "boston_alcohol": {
         "data": {
            "source": "_boston_alcohol"
         },
         "draw": {
            "points": {
               "color": "function() {\n    if (feature.Description === 'All_Alcohol') {\n        return '#3C4BF1';\n    } else if (feature.Description === 'Farmer') {\n        return '#8BFFF2'\n    } else if (feature.Description === 'Malt_Wine') {\n        return '#50D05E'\n    } else if (feature.Description === 'Malt_Wine_Liquor') {\n        return '#E265F0'\n    } else if (feature.Description === 'Other') {\n        return 'yellow'\n    } else if (feature.Description === 'Tavern') {\n        return '#EC3B43'\n    }\n}\n",
               "size": [
                  [
                     13,
                     "7.5px"
                  ],
                  [
                     16,
                     "16px"
                  ]
               ],
               "order": 10000,
               "interactive": true,
               "collide": false
            }
         }
      },
      "places": {
         "data": {
            "source": "xyz_osm"
         },
         "city-points": {
            "filter": {
               "kind": "locality",
               "kind_detail": "city",
               "$zoom": {
                  "max": 18
               }
            },
            "draw": {
               "text": {
                  "text_source": "global.language_text_source",
                  "priority": 10,
                  "order": 999,
                  "font": {
                     "family": "Lato",
                     "fill": "#C3CDD4",
                     "stroke": {
                        "color": "white",
                        "width": 4
                     },
                     // "transform": "uppercase",
                     "size": [
                        [
                           4,
                           "15px"
                        ],
                        [
                           8,
                           "18px"
                        ],
                        [
                           12,
                           "26px"
                        ]
                     ],
                     "buffer": "2px"
                  }
               }
            }
         },
         "neighborhoods": {
            "filter": [{
                  "kind": [
                     "neighbourhood",
                     "macrohood"
                  ],
                  "$zoom": {
                     "min": 13
                  }
               },
               {
                  "kind": "microhood",
                  "$zoom": {
                     "min": 15
                  }
               }
            ],
            "draw": {
               "text": {
                  "text_source": "global.language_text_source",
                  "priority": 10,
                  "order": 999,
                  "font": {
                     "family": "Lato",
                     "fill": "#C3CDD4",
                     "stroke": {
                        "color": "white",
                        "width": 4
                     },
                     // "transform": "uppercase",
                     "size": [
                        [
                           4,
                           "10px"
                        ],
                        [
                           8,
                           "14px"
                        ],
                        [
                           12,
                           "14px"
                        ]
                     ],
                     "buffer": "2px"
                  }
               }
            }
         }
      },
      "earth": {
         "data": {
            "source": "xyz_osm"
         },
         "draw": {
            "polygons": {
               "order": "function() { return feature.sort_rank; }",
               "color": "white"
            }
         }
      },
      "landuse": {
         "data": {
            "source": "xyz_osm"
         },
         "draw": {
            "polygons": {
               "order": "function() { return feature.sort_rank; }",
               "color": "#E9EEF1"
            }
         }
      },
      "water": {
         "data": {
            "source": "xyz_osm"
         },
         "draw": {
            "polygons": {
               "order": "function() { return feature.sort_rank; }",
               "color": "#DEE1E3"
            }
         }
      },
      "roads": {
         "data": {
            "source": "xyz_osm"
         },
         "filter": {
            "not": {
               "kind": [
                  "path",
                  "rail",
                  "ferry"
               ]
            }
         },
         "draw": {
            "lines": {
               "order": "function() { return feature.sort_rank; }",
               "color": "#C3CDD4",
               "width": 8,
               "cap": "round"
            }
         },
         "highway": {
            "filter": {
               "kind": "highway"
            },
            "draw": {
               "lines": {
                  "order": "function() { return feature.sort_rank; }",
                  "color": "#D3DCE1",
                  "width": [
                     [
                        5,
                        5000
                     ],
                     [
                        8,
                        800
                     ],
                     [
                        10,
                        200
                     ],
                     [
                        12,
                        100
                     ],
                     [
                        14,
                        40
                     ],
                     [
                        18,
                        20
                     ]
                  ],
                  "outline": {
                     "color": "#EEEEEE",
                     "width": [
                        [
                           16,
                           0
                        ],
                        [
                           18,
                           1.5
                        ]
                     ]
                  }
               }
            }
         },
         "minor_road": {
            "filter": {
               "kind": "minor_road"
            },
            "draw": {
               "lines": {
                  "order": "function() { return feature.sort_rank; }",
                  "color": "#F8FAFB",
                  "width": 5
               }
            }
         }
      },
      "buildings": {
         "data": {
            "source": "xyz_osm"
         },
         "draw": {
            "polygons": {
               "order": "function() { return feature.sort_rank; }",
               "color": "#E9EBEB"
            }
         },
         "3d-buildings": {
            "filter": {
               "$zoom": {
                  "min": 15
               }
            },
            "draw": {
               "polygons": {
                  "extrude": "function () { return feature.height > 20 || $zoom >= 16; }"
               }
            }
         }
      }
   }
}

export default SCENE;
