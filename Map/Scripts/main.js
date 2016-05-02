/*
	Carto LAb
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: M. Lehmann
	Author: G. Tagliaferro
	Versions:
	2016-04-21
*/

// Set variables for maxBounds and for map
var southWest = L.latLng(-41.3500, 174.6000),
    northEast = L.latLng(-41.2100, 174.9000),
    bounds = L.latLngBounds(southWest, northEast);
var map = L.map('map', { zoomControl: false ,
	// Set that bounding box as maxBounds to restrict moving the map
    // See full maxBounds documentation:
    maxBounds: bounds,
    maxZoom: 17,
    minZoom: 13})
	.setView([-41.2833, 174.7666], 13);

//	Load OpenStreeMap data from Mapbox.
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2l1bGlvdCIsImEiOiJjaWg5ZGs1d2MwMDR0dnNtMzlydHhxaGs3In0.TfMvSNQas5gBS882h-Oh4g';
L.mapbox.styleLayer('mapbox://styles/giuliot/cina7yy7000mad5m3dmzkaf1f').addTo(map);
// Change zoom position
new L.Control.Zoom({ position: 'topright' }).addTo(map);
