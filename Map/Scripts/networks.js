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
			/*

