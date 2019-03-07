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
			"max_zoom": 16
		},
		"_boston_alcohol": {
			"type": "GeoJSON",
			"url": "https://xyz.api.here.com/hub/spaces/PaLBoFL4/tile/web/{z}_{x}_{y}",
			"url_params": {
				"access_token": "AbuvUKANJJEZR4nb1zkEXBE"
			}
		}
	},
	"global": {
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
				160
			],
			[
				14,
				60
			],
			[
				18,
				20
			]
		],
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
					"color": "#0258AE",
					"size": [
						[
							13,
							"7.5px"
						],
						[
							17,
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
					"not": {
						"name": "Arlington"
					},
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
							"family": "Roboto Mono",
							"fill": "#C3CDD4",
							"stroke": {
								"color": "white",
								"width": 4
							},
							"transform": "uppercase",
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
					"color": "#C3CDD4"
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
