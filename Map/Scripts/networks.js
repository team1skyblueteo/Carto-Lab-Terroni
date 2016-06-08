var WasteLayer;
var WasteData = loadJson('./Data/Wastwater_pipe200-2100.geojson')
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}
var WasteLayer = L.geoJson(WasteData, {style: style,
    					onEachFeature: onEachFeature
    					}).addTo(map);
 /*   					
map.on('style.load', function () {
map.addSource(
"geojson-lines": {
  "type": "geojson",
  "data": "./Data/Wastwater_pipe200-2100.geojson"
}

});*/


WasteLayer.addData(WasteData, {style: style});
function style(feature) {
    return {
	weigth: getDimension(feature.properties.Diameter),
        opacity: 1,
        color: 'black',
    };
}

function getDimension(Diameter){
	return Math.round(Math.log(Diameter)/2*10)/10;
}


function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        color: 'red',
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    infoPipe.update(layer.feature.properties);
}

function resetHighlight(e) {
    WasteLayer.resetStyle(e.target);
    infoPipe.update();
}

/** SECTION TAB WITH INFO ABOUT THE PIPE **/


var infoPipe = L.control();

infoPipe.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'infoPipe'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoPipe.update = function (props) {
    this._div.innerHTML = '<h4>Pipe Properties</h4>'+
    			  '<hr>'+
    			  (props ?
    			  '<div class=\'container\'>'+
    			  '<div class=\'proplist\'>'+
                                '<b>Material:  </b>'+props.Pipe_mat_1+'<br>'+
                                '<b>Gradient:  </b>'+props.Gradient+'<br>'+
                                '<b>Installed:  </b>'+props.Date_ins_1+'<br>'+
                                '<b>Hydraulic Diameter:  </b>'+props.Diameter+'<br>'+
                          '</div>'+
                          '<div class=\'pipeshape\'></div>'+
                          '</div>'
                          :'Hover hover a pipe');
  if (props){
      shapeDiv= this._div.childNodes[2].childNodes[1];
      switch (props.Pipe_sha_1){
          case "U-shaped": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/Ushaped.svg)";
                           break;
          case "TRI": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/triangular.svg)";
                           break;
          case "Rectangular Box": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/rectangular.svg)";
                           break;
          case "Ovoid A": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/ovoid.svg)";
                           break;
          case "Ovoid B": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/ovoid.svg)";
                           break;
          case "Ovoid": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/ovoid.svg)";
                           break;
          case "Egg-Shaped": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/ovoid.svg)";
                           break;
          case "Circular": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/circular.svg)";
                           break;
          case "CIRCC": shapeDiv.style.backgroundImage= "url(Scripts/svg-pipes/circular.svg)";
                           break;
          default: shapeDiv.innerHTML = 'No shape info avaliabel';
  }
};}

infoPipe.addTo(map);
/** 
	FLOW DIRECTION
			***/
console.log(nodeArray);
console.log(WasteLayer);
// only after zoom 14
map.on('zoomend', function() {
    if (map.getZoom() >= 14) {
        
        // to hide or show it.
        map.on('move', function() {
    		// Construct an empty list to fill with onscreen markers.
    		var inBounds = [],
    		// Get the map bounds - the top-left and bottom-right locations.
    		    bounds = map.getBounds();

    		// For each marker, consider whether it is currently visible by comparing
    		// with the current map bounds.
    		WasteLayer.options.onEachFeature(function(feature) {
    		    if (bounds.contains(feature.getLatLng())) {
    		        console.log(feature);
    		    }
    		});
    	});
    } else {
        map.on('move', function() {});
    }
});


console.log(map.latLngToContainerPoint([-41.2833, 174.7666]));
var testCoo = map.latLngToContainerPoint([-41.2833, 174.7666]);
var testDiv = document.getElementsByClassName("testPt")[0];
console.log(parseInt(testCoo.y)+39);
testDiv.style.top=(parseInt(testCoo.y)+39).toString()+'px';
testDiv.style.left=testCoo.x+'px';

function getFlowParam(DSid,UPis){
	var DSn=ParseInt(DSid)-1;
	var USn=ParseInt(USid)-1;
	var tempNode=nodeArray.data[DSn];
	if (tempNode[4]==0){
		DSxy=[tempNode[0],tempNode[0]];
		}
	else{
		tempNode=nodeArray.data[DSn-tempNode[4]];
		DSxy=[tempNode[0],tempNode[0]];};
	var tempNode=nodeArray.data[USn];
	if (tempNode[4]==0){
		USxy=[tempNode[0],tempNode[0]];
		}
	else{
		tempNode=nodeArray.data[USn-tempNode[4]];
		USxy=[tempNode[0],tempNode[0]];};
	Meanxy = [(USxy[0]+DSxy[0])/2,(USxy[1]+DSxy[1])/2];
	Bearing = Math.atan2(DSxy[0]-USxy[0], DSxy[1]-USxy[1]);
	return [Meanxy,Bearing];		
}

function plotFlow(flowParam){
	var arrayCoo = map.latLngToContainerPoint(flowParam[0].reverse());
	var arrowDiv = document.createElement('div');
	arrowDiv.className = 'arrowFlow';
	
	arrowDiv.style.top=(parseInt(testCoo.y)+39).toString()+'px';
	arrowDiv.style.left=testCoo.x+'px';
	document.body.appendChild(arrowDiv);
	}

/*// tile options
var tileOptions = {
            maxZoom: 20,  // max zoom to preserve detail on
            tolerance: 5, // simplification tolerance (higher means simpler)
            extent: 4096, // tile extent (both width and height)
            buffer: 64,   // tile buffer on each side
            debug: 0,      // logging level (0 to disable, 1 or 2)

            indexMaxZoom: 0,        // max zoom in the initial tile index
            indexMaxPoints: 100000, // max number of points per tile in the index
        };
// build an initial index of tiles
var tileIndex = geojsonvt(WasteData);

// request a particular tile
var features = tileIndex.getTile(11, 2018, 765).features; //1282
console.log(features);

// show an array of tile coordinates created so far
console.log(tileIndex.tileCoords); // [{z: 0, x: 0, y: 0}, ...]
*/
