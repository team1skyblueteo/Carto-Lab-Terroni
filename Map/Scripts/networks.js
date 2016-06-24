////////////////////////////////////////// MAPBOX JS VERSION //////////////////////////////////////////

/*var WasteLayer;
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
*/
////////////////////////////////////////// MAPBOX GL VERSION //////////////////////////////////////////


var wasteDiameters = [0,160,200,400,800,2000];
/// temporary

Diameters=wasteDiameters;

        //var wasteDiameters = [0,160,250,675,1000,2100];
        var stormDiameters = [0,355,760,1530,3500,6000];
        var Materials = ['uPVC',
    		         'Stoneware',
    		         'Steel - spiral weld',
    		         'Steel - epoxy lined',
    		         'Steel - cement lined',
    		         'Steel',
    		         'Reinforced Concrete',
    		         'PVC - Blue Brute',
    		         'Polyvinyl Chloride',
    		         'Polyethylene',
    		         'PLST',
    		         'Pitch Fibre',
    		         'PE80B',
    		         'PE100',
    		         'NPRN',
    		         'mPVC',
    		         'Medium Density Polyethylene',
    		         'High Pressure Polyethylene',
    		         'High Density Polyethylene',
    		         'Hdpe',
    		         'Galvanised Steel',
    		         'Galvanised Iron',
    		         'Earthenware',
    		         'Eare',
    		         'Ductile Iron - cement lined',
    		         'Ductile Iron',
    		         'Copper',
    		         'Concrete',
    		         'Cast Iron',
    		         'Brick',
    		         'Asbestos Cement',
    		         '',
    		         ];
var materialGroups = ['ceramics','metals','concrete','fibre-composite','PVC-plastics','Polyethylene-plastics','other-unknown'];
var years = [9999,1840,1900,1920,1940,1950,1960,1970,1980,1990,2000,2010,2015];
// CONSIDERE MIN AND MAX ZOOM
var wasteLayersNames=[];
var stormLayersNames=[];
var wasteLayersNamesOw=[];
var stormLayersNamesOw=[];
var vlayer='';
map.on("load", function(){
	map.addSource("wastePipeline",{
            "type": "geojson",
            "data": "./Data/Wastwater_pipe2.geojson",//data
        });
        // get data from the server - DISABLED
        /*map.addSource("wastePipeline",{
            type: 'vector',
        url: 'mapbox://giuliot.7os1815f'
        });*/
        //mapboxgl.util.getJSON("./Data/Stormwater.geojson", function(err, data){
	map.addSource("stormPipeline",{
            "type": "geojson",
            "data": "./Data/Stormwater2.geojson",//data
        });
        vlayer='waste';
        Diameters=wasteDiameters;
        //});
        loadStormWater();
	loadWasteWater();
    //get data using geojson -> you can also get it directly in data property of addSource method. Check out https://www.mapbox.com/mapbox-gl-style-spec/#sources-geojson
    //mapboxgl.util.getJSON("data/pipe.geojson", function(err, data){
        
})
/***
	LOAD WASTE WATER
			***/
// feature higligts when hover - DISABLED TOO SLOW
/*map.addLayer({
			"id": "pipe-hover"+wasteDiameters[i],
			 "type": "line",
       			 "source": "pipeline",
   			 "layout": {
			            "line-join": "round",
				    "line-cap": "round",
				},
   			 "paint": {
   		       		  "line-width":	Math.pow(Math.log10(( wasteDiameters[i]+wasteDiameters[i+1]) /2),2),
     			          "line-color": 'red',
      		         	  "line-opacity": 0.8,
   				 },
			"filter": ["==", "Asset_ID", ""]
		});*/
function loadWasteWater(){
	 // uniform layer to be shown at higher zooms
	 for (var k=0; k < years.length-1; k++) {
	 wasteLayersNamesOw.push("wastePipe-ow"+years[k].toString());
	 map.addLayer({
   			 "id": "wastePipe-ow"+years[k].toString(),
   			 "type": "line",
       			 "source": "wastePipeline",
       			 "source-layer": "Wastwater_pipe",
       			 "minzoom": 13,
       			 "maxzoom": 14,//getMinZoom(i),
   			 "filter": getFilterY(years[k],years[k+1]),
   			 "layout": {
			            "line-join": "round",
				    "line-cap": "round",
				    'visibility': 'visible'
				},
   			 "paint": {
   		       		  "line-width":	0.6,//Math.pow(Math.log10(( wasteDiameters[i]+wasteDiameters[i+1]) /3),2),
     			          "line-color": 'blue',
      		         	  "line-opacity": 0.6,
   				 }
			  },"housenum-label");
	}
	// create different styled layer depending on year, diameter and material type
	for(var i=0; i < wasteDiameters.length-1; i++) {
		
		for (var j=0; j<materialGroups.length;j++){
		     wasteLayersNames.push("wastePipe-"+wasteDiameters[i].toString()+materialGroups[j]);
		     map.addLayer({
   			 "id": "wastePipe-"+wasteDiameters[i].toString()+materialGroups[j],
   			 "type": "line",
       			 "source": "wastePipeline",
       			 "source-layer": "Wastwater_pipe",
       			 "minzoom": 14,//getMinZoom(i),
       			 // get the correct filter depending on the prop
   			 "filter": getFilterMD(wasteDiameters[i],wasteDiameters[i+1],materialGroups[j]),
   			 "layout": {
			            "line-join": "round",
				    "line-cap": "round",
				    'visibility': 'visible'
				},
   			 "paint": {
   		       		  "line-width":	Math.pow(Math.log10(( wasteDiameters[i]+wasteDiameters[i+1]) /3),2),
   		       		  	/*{
   		       		  	"stops":getLineWidthZoom(( wasteDiameters[i]+wasteDiameters[i+1]) /2)
   		       		  	},*/
     			          "line-color": getGroupColor(materialGroups[j]),
      		         	  "line-opacity": 0.8,
      		         	  	/*{
      		         	  		"stops":[[12,0.3],[18,0.8]],
      		         	  	},*/
   				 }
			  },"housenum-label");
			}
		}
		//Diameters=wasteDiameters;
};
/***
	LOAD STORM WATER
			***/

function loadStormWater(){
	for (var k=0; k < years.length-1; k++) {
	stormLayersNamesOw.push("stormPipe-ow"+years[k].toString());
	map.addLayer({
   			 "id": "stormPipe-ow"+years[k].toString(),
   			 "type": "line",
       			 "source": "stormPipeline",
       			 //"source-layer": "Stormwater-pipe-noSump",
       			 "minzoom": 13,
       			 "maxzoom": 14,//getMinZoom(i),
   			 "filter": getFilterY(years[k],years[k+1]),
   			 "layout": {
			            "line-join": "round",
				    "line-cap": "round",
				    'visibility': 'none'
				},
   			 "paint": {
   		       		  "line-width":	0.6,//Math.pow(Math.log10(( wasteDiameters[i]+wasteDiameters[i+1]) /3),2),
     			          "line-color": 'red',
      		         	  "line-opacity": 0.6,
   				 }
			  },"housenum-label");
	}
        
	for(var i=0; i < stormDiameters.length-1; i++) {
		for (var j=0; j<materialGroups.length;j++){
		     stormLayersNames.push("stormPipe-"+stormDiameters[i].toString()+materialGroups[j]);
		     map.addLayer({
   			 "id": "stormPipe-"+stormDiameters[i].toString()+materialGroups[j],
   			 "type": "line",
       			 "source": "stormPipeline",
       			 //"source-layer": "Stormwater-pipe-noSump",
       			 "minzoom": 14,
   			 "filter": getFilterMD(stormDiameters[i],stormDiameters[i+1],materialGroups[j]),
   			 "layout": {
			            "line-join": "round",
				    "line-cap": "round",
				    'visibility': 'none'
				},
   			 "paint": {
   		       		  "line-width":	Math.pow(Math.log10(( stormDiameters[i]+stormDiameters[i+1]) /3),2),
     			          "line-color": getGroupColor(materialGroups[j]),
      		         	  "line-opacity": 0.8,
   				 }
			  },"housenum-label");
			}
		}
		
		//Diameters=stormDiameters;
};
function toggleWaste(){
	Diameters=wasteDiameters;
	vlayer='waste';
	updateLegend();
	for (var k=0; k < years.length-1; k++) {
			toggleLayerVisbility("wastePipe-ow"+years[k].toString());
	}
	for(var i=0; i < wasteDiameters.length-1; i++) {
			for (var j=0; j<materialGroups.length;j++){
			toggleLayerVisbility("wastePipe-"+stormDiameters[i].toString()+materialGroups[j]);
			}
		}
}
function toggleStorm(){
	console.log("togg");
	Diameters=stormDiameters;
	vlayer='storm';
	updateLegend();
	for (var k=0; k < years.length-1; k++) {
			toggleLayerVisbility("stormPipe-ow"+years[k].toString());
	}
	for(var i=0; i < stormDiameters.length-1; i++) {
			for (var j=0; j<materialGroups.length;j++){
			toggleLayerVisbility("stormPipe-"+stormDiameters[i].toString()+materialGroups[j]);
			}
		}
}
function togglePipe(){
	if (vlayer=='waste'){Diameters=stormDiameters;
	vlayer='storm';}
	else{
	Diameters=wasteDiameters;
	vlayer='waste';}
	updateLegend();
	for (var k=0; k < years.length-1; k++) {
			toggleLayerVisbility("wastePipe-ow"+years[k].toString());
			toggleLayerVisbility("stormPipe-ow"+years[k].toString());
	}
	
	for (var j=0; j<materialGroups.length;j++){
		for(var i=0; i < stormDiameters.length-1; i++) {
			toggleLayerVisbility("stormPipe-"+stormDiameters[i].toString()+materialGroups[j]);
			}
		for(var i=0; i < wasteDiameters.length-1; i++) {
			toggleLayerVisbility("wastePipe-"+wasteDiameters[i].toString()+materialGroups[j]);
			}
			
		}
}
/***
	Get MIN ZOOM
			***/
function getMinZoom(i){
	if (i==0){return 13}else{return 12};
}
/*** 
	get random color - NOT USED
				***/
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/*** 
	get color for material - NOT USED
				***/
function getMaterialColor(material){
	switch(material){
		// ceramic based
		case 'brick':return '#841F27';
			break;
		case 'Earthenware':return '#841F27';
			break;
		case 'Eare':return '#841F27';
			break;
		case 'Stoneware':return '#841F27';
			break;
		// metals
		case 'Steel - spiral weld':return '#66a61e';
			break;
		case 'Steel - epoxy lined':return '#66a61e';
			break;
		case 'Steel - cement lined':return '#66a61e';
			break;
		case 'Steel':return '#66a61e';
			break;
		case 'Galvanised Steel':return '#66a61e';
			break;
		case 'Galvanised Iron':return '#66a61e';
			break;
		case 'Ductile Iron - cement lined':return '#66a61e';
			break;
		case 'Ductile Iron':return '#66a61e';
			break;
		case 'Copper':return '#66a61e';
			break;
		case 'Cast Iron':return '#66a61e';
			break;
		// cement concrete
		case 'Reinforced Concrete':return '#1b9e77';
			break;
		case 'Concrete':return '#1b9e77';
			break;
		// Fiber material
		case 'Pitch Fibre':return '#e6ab02';
			break;
		case 'Asbestos Cement':return '#e6ab02';
			break;
		// 	Polyvinyl Chloride plastics
		case 'uPVC':return '#ffa500';
			break;
		case 'PVC - Blue Brute':return '#ffa500';
			break;
		case 'Polyvinyl Chloride':return '#ffa500';
			break;
		case 'mPVC':return '#ffa500';
			break;
		// Polyethylene plastics
		case 'Polyethylene':return '#7570b3';
			break;
		case 'Medium Density Polyethylene':return '#7570b3';
			break;
		case 'High Pressure Polyethylene':return '#7570b3';
			break;
		case 'High Density Polyethylene':return '#7570b3';
			break;
		case 'Hdpe':return '#7570b3';
		// unknown Plastic 
			break;
		case 'PLST':return '#e7298a';
			break;
		case 'NPRN':return '#e7298a';
			break;
		// no material
		default: return '#666666';

		
			}
};
//version for groups
function getGroupColor(material){
	switch(material){
		case'ceramics':return '#841F27';
			break;
		case'metals':return '#66a61e';
			break;
		case'concrete':return '#1b9e77';
			break;
		case'fibre-composite':return '#e6ab02';
			break;
		case'PVC-plastics':return '#ffa500';
			break;
		case'Polyethylene-plastics':return '#7570b3';
			break;
		case'other-unknown':return '#666666';
			break;
	}
	
}
/**** 
		GET FILTERS
					***/
function getFilter(diameterI,diameterII,material,yearI,yearII){
	if (yearI==9999){
		switch(material){
			case'ceramics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'brick' , 'Earthenware' , 'Eare' , 'Stoneware' ],["in", "year", ""]];
				break;
			case'metals':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Steel - spiral weld' , 'Steel - epoxy lined' , 'Steel - cement lined' , 'Steel', 'Galvanised Steel' , 'Galvanised Iron' , 'Ductile Iron - cement lined' , 'Ductile Iron' , 'Copper' , 'Cast Iron' ],["in", "year", ""]];
				break;
			case'concrete':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Reinforced Concrete' , 'Concrete' ],["in", "year", ""]];
				break;
			case'fibre-composite':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Pitch Fibre', 'Asbestos Cement' ],["in", "year", ""]];
				break;
			case'PVC-plastics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'uPVC' , 'PVC - Blue Brute' , 'Polyvinyl Chloride', 'mPVC' ],["in", "year", ""]];
				break;
			case'Polyethylene-plastics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Polyethylene' , 'Medium Density Polyethylene' , 'High Pressure Polyethylene' , 'High Density Polyethylene' , 'Hdpe' ],["in", "year", ""]];
				break;
			case'other-unknown':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'PLST' , 'NPRN' , '' ],["in", "year", ""]];
				break;
		}
	}
	else{
		switch(material){
			case'ceramics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'brick' , 'Earthenware' , 'Eare' , 'Stoneware' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
			case'metals':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Steel - spiral weld' , 'Steel - epoxy lined' , 'Steel - cement lined' , 'Steel', 'Galvanised Steel' , 'Galvanised Iron' , 'Ductile Iron - cement lined' , 'Ductile Iron' , 'Copper' , 'Cast Iron' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
			case'concrete':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Reinforced Concrete' , 'Concrete' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
			case'fibre-composite':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Pitch Fibre', 'Asbestos Cement' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
			case'PVC-plastics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'uPVC' , 'PVC - Blue Brute' , 'Polyvinyl Chloride', 'mPVC' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
			case'Polyethylene-plastics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Polyethylene' , 'Medium Density Polyethylene' , 'High Pressure Polyethylene' , 'High Density Polyethylene' , 'Hdpe' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
			case'other-unknown':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'PLST' , 'NPRN' , '' ],[">=", "year", yearI],["<", "year", yearII ]];
				break;
		}
	}
	
}
/****	
		GET FILTER YEAR
					****/
function getFilterY(yearI,yearII){
	if (yearI==9999){
		return ["in", "year", ""];		
	}
	else{
		return ["all",[">=", "year", yearI],["<", "year", yearII ]];
		
	}
	
}
/**** 
		GET FILTERS MAT DIAM
					***/
function getFilterMD(diameterI,diameterII,material){
		switch(material){
			case'ceramics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'brick' , 'Earthenware' , 'Eare' , 'Stoneware' ]];
				break;
			case'metals':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Steel - spiral weld' , 'Steel - epoxy lined' , 'Steel - cement lined' , 'Steel', 'Galvanised Steel' , 'Galvanised Iron' , 'Ductile Iron - cement lined' , 'Ductile Iron' , 'Copper' , 'Cast Iron' ]];
				break;
			case'concrete':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Reinforced Concrete' , 'Concrete' ]];
				break;
			case'fibre-composite':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Pitch Fibre', 'Asbestos Cement' ]];
				break;
			case'PVC-plastics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'uPVC' , 'PVC - Blue Brute' , 'Polyvinyl Chloride', 'mPVC' ]];
				break;
			case'Polyethylene-plastics':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'Polyethylene' , 'Medium Density Polyethylene' , 'High Pressure Polyethylene' , 'High Density Polyethylene' , 'Hdpe' ]];
				break;
			case'other-unknown':return ["all", [">", "Diameter", diameterI ] , ["<=", "Diameter", diameterII ], ["in", "Material", 'PLST' , 'NPRN' , '' ]];
				break;
		}	
}
/*** 
		ZOOM DEPENDING LIEN WIDTH - NOT USED - NOT WORKING
					***/
function getLineWidthZoom(meanDiameter){
	return [[12, Math.pow(Math.log10(meanDiameter/4),2)], [17,Math.pow(Math.log10(meanDiameter/1.5),2)]];
/*
	if (meanDiameter<=180){
		return [[13, 0], [17,meanDiameter/50]];
		}
	if (meanDiameter>180){
		return [[13, meanDiameter/250], [17,meanDiameter/50]];
		}*/

}
/***
	ZOOM DEPENDIG VISIBILTY - NOT USED
				***/
function getVisibility(maxDiameter){
	if (maxDiameter<160){
		return 'none';
		}
	else{
		return 'visible';
		}
}		

/** SECTION TAB WITH INFO ABOUT THE PIPE - NOT USED JS**/


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
                                '<b>Material:  </b>'+props.Material+'<br>'+
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

//infoPipe.addTo(map);

/***
		MOUSE OVER EVENT
					***/
map.on('mousemove', function (e) {

    var features = map.queryRenderedFeatures(e.point, {layers: wasteLayersNames.concat(wasteLayersNamesOw.concat(stormLayersNames.concat(stormLayersNamesOw)))});
    if (features.length>0) {
    	    var feature = features[0];
    	    updatePipeInspector(feature);
    	    /*for(var i=0; i < Diameters.length-1; i++) {
            	map.setFilter("pipe-hover"+Diameters[i], ["==", "Asset_ID", features[0].properties.Asset_ID]);
            }*/
        } else {
            /*for(var i=0; i < Diameters.length-1; i++) {
            	map.setFilter("pipe-hover"+Diameters[i], ["==", "Asset_ID", ""]);
            }*/
            updatePipeInspector('clear');
    
        }
    
});
/////////////////////////////////////////// PIPE INSPECTOR //////////////////////////////////////////////////
function updatePipeInspector(feature){
	var pipeInspDivc = document.getElementById('pipe-inspector-c');
	pipeInspDivc.style.height="170px";
	var pipeInspDiv = document.getElementById('pipe-inspector');
	if (feature=='clear'){
	    		pipeInspDivc.style.height="60px";
			pipeInspDiv.innerHTML= "<span style=\"font-size:13px\">Hover over a pipe<span>";
		}else{
		
	switch (feature.properties.Pipe_Shape){
		  case "U-shaped": showU();
		                   break;
		  case "TRI": showTri();
		                   break;
		  case "Rectangular Box": showRect();
		                   break;
		  case "Ovoid A": showOvoid();
		                   break;
		  case "Ovoid B": showOvoid();
		                   break;
		  case "Ovoid": showOvoid();
		                   break;
		  case "Egg-Shaped": showOvoid();
		                   break;
		  case "Circular": showCircle();
		                   break;
		  case "CIRCC": showCircle();
		                   break;
		  default: ;
	  }
	function showCircle(){
		pipeInspDiv.innerHTML= circlepipe;
	}
	function showU(){
		pipeInspDiv.innerHTML= upipe;
	}
	function showTri(){
		pipeInspDiv.innerHTML= tripipe;
	}
	function showRect(){
		pipeInspDiv.innerHTML= rectpipe;
	}
	function showOvoid(){
		pipeInspDiv.innerHTML= ovopipe;
	}
	if (feature.properties.Diameter!=''||feature.properties.Diameter!='NaN'){
		document.getElementById('myDiam').innerHTML= feature.properties.Diameter+' mm';
	}
	else{document.getElementById('myDate').innerHTML= 'unknown'};
	if (feature.properties.Date_ins_1!=''){
		document.getElementById('myDate').innerHTML= feature.properties.Date_ins_1;
	}
	else{document.getElementById('myDiam').innerHTML= 'unknown'};
	if (feature.properties.Gradient!=''||feature.properties.Gradient!='NaN'){
		
		document.getElementById('myGrad').innerHTML= (Math.round(parseFloat(feature.properties.Gradient)*1000)/10000).toString();
	}
	else{document.getElementById('myGrad').innerHTML= 'unknown'};
	if (feature.properties.Material!=''){
		document.getElementById('myMat').innerHTML= feature.properties.Material;
	}
	else{document.getElementById('myMat').innerHTML= 'unknown'};
}
}    

/** 
	FLOW DIRECTION
			***/
map.on('move', function() {
	    var zoom = map.getZoom();
	    removeElementsByClass('arrowFlow');
	    // only after zoom 18
	    if (zoom >= 17&&vlayer=="waste") {
		
		// to hide or show it.
		//map.on('move', function() {
	    		// Get the map bounds - the top-left and bottom-right locations.
	    		bounds = map.getBounds();
	    		var features = map.queryRenderedFeatures(bounds, {layers: wasteLayersNames});
	    		for (i=0,l=features.length;i<l;i++){
	    			if (features[i].properties.DS_node_ID!= 'undefined'&&features[i].properties.US_node_ID!= 'undefined'){
		    			//var t0 = performance.now();
		    			flowParam = getFlowParam(features[i].properties.DS_node_ID,features[i].properties.US_node_ID);
		    			//var t1 = performance.now();
		    			//console.log('flowParam: '+(t1-t0));
		    			plotFlow(flowParam);
		    			//var t2 = performance.now();
		    			//console.log('plotFlow: '+(t2-t1));
	    			}
	    		}
	    	//});
	    } else {
	    
		//map.on('move', function() {});
	    }
	});

/*

var testCoo = map.latLngToContainerPoint([-41.2833, 174.7666]);
var testDiv = document.getElementsByClassName("testPt")[0];
console.log(parseInt(testCoo.y)+39);
testDiv.style.top=(parseInt(testCoo.y)+39).toString()+'px';
testDiv.style.left=testCoo.x+'px';
*/

function getFlowParam(DSid,USid){
	var DSn=parseInt(DSid.substring(2))-1;
	var USn=parseInt(USid.substring(2))-1;
	var tempNode=nodeArray.data[DSn];
	if (tempNode[4]==0){
		DSxy=[parseFloat(tempNode[0]),parseFloat(tempNode[1])];
		}
	else{
		tempNode=nodeArray.data[DSn-parseInt(tempNode[4])];
		DSxy=[parseFloat(tempNode[0]),parseFloat(tempNode[1])];};
	tempNode=nodeArray.data[USn];
	if (tempNode[4]==0){
		USxy=[parseFloat(tempNode[0]),parseFloat(tempNode[1])];
		}
	else{
		tempNode=nodeArray.data[USn-parseInt(tempNode[4])];
		USxy=[parseFloat(tempNode[0]),parseFloat(tempNode[1])];};
	Meanxy = [(USxy[0]+DSxy[0])/2,(USxy[1]+DSxy[1])/2];
	Bearing = Math.atan2(DSxy[0]-USxy[0], DSxy[1]-USxy[1])/Math.PI*180;
	return [Meanxy,Bearing];		
}

function plotFlow(flowParam){
	//var t3 = performance.now();
	var arrayCoo = map.project(flowParam[0]);
	//var t4 = performance.now();
	//console.log('Mapbox gl project: '+(t4-t3));
	if (arrayCoo.x<1289&&arrayCoo.y<408){
		var arrowDiv = document.createElement('div');
		var deg = flowParam[1]-90;
		arrowDiv.className = 'arrowFlow';
		arrowDiv.style.top=(parseInt(arrayCoo.y)+39-10).toString()+'px';
		arrowDiv.style.left=(parseInt(arrayCoo.x)-10).toString()+'px';
		arrowDiv.innerHTML= "<svg width=\"20\" height=\"20\" id=\"svg2\">"+
					    "<path d=\"m 13.658879,5.0000001 -0.547611,0.4471824 0,3.4709551 -13.111268,0 0,2.2612094 13.111268,0 0,3.373471 L 13.658879,15 20,10.447695 20,9.5533297 z\" id=\"path7\" style=\"fill:#006df0\" transform = \"rotate("+deg.toString()+ " 10 10)\"/>"+
				    "</svg>";
		document.body.appendChild(arrowDiv);
	}
	}
///////////////////////////////////////// FILL LEGEND //////////////////////////////////////////////////
updateLegend();
function updateLegend(){
	var divMat = document.getElementById('mat-legend');
	divMat.innerHTML = "";
	var divDiam = document.getElementById('diam-legend');
	divDiam.innerHTML = "";
	for(var i=0; i < Diameters.length-1; i++) {(function(i){ // for onclik
		var newNode = document.createElement('div');      
		newNode.innerHTML = "<input type=\"checkbox\" id=\"diamCheckBox"+(Diameters[i]).toString()+"\"checked=\"checked\"><svg class=\"legend-svg\" height=\"15\" width=\"30\">"+
  					"<line x1=\"5\" y1=\"12\" x2=\"25\" y2=\"12\" stroke=\"rgb(255,0,0)\" stroke-width=\""+Math.pow(Math.log10(( Diameters[i]+Diameters[i+1]) /3),2).toString()+"\" stroke-linecap=\"round\"/>"+
  					"Sorry, your browser does not support inline SVG."+
				    "</svg><div class=\"legend-label\">   "+(Diameters[i]+1).toString()+" - "+Diameters[i+1].toString()+"</div>";
  		newNode.className="legend-item-diam";
  		newNode.className+=" legend-item";
  		newNode.addEventListener('click',function(){toggleDiamVisbility(Diameters[i].toString());});
		divDiam.appendChild( newNode );})(i)
	}
	
	for (var i=0; i<materialGroups.length;i++){
		var newNode = document.createElement('div');      
		newNode.innerHTML = "<svg class=\"legend-svg\" height=\"15\" width=\"30\">"+
  					"<line x1=\"5\" y1=\"12\" x2=\"25\" y2=\"12\" stroke=\""+getGroupColor(materialGroups[i])+"\" stroke-width=\"6\" stroke-linecap=\"round\"/>"+
  					"Sorry, your browser does not support inline SVG."+
				    "</svg><div class=\"legend-label\">   "+materialGroups[i]+"</div>";
		newNode.className="legend-item-mat";
		newNode.className+=" legend-item";  
		divMat.appendChild( newNode );
	}
	
}

/**** toggle visibility of Dimater *****/

// IMPORATNT GENRALIZE FOR STORM TOO  
// SOLVE WAIT FOR ASYNCH TASK 
function toggleDiamVisbility(Diam){
	function tDv(callback){
		//for (var k=0; k < years.length-1; k++) {
			for (j=0;j<materialGroups.length;j++){
				toggleLayerVisbility(vlayer+"Pipe-"+Diam+materialGroups[j]);//+years[k].toString()
			}
		//}

		callback.call();}
	function tCv(){
		var currentCheckBox=document.getElementById("diamCheckBox"+Diam);
		if (currentCheckBox.checked == true){
			currentCheckBox.checked=false;			
		}else{currentCheckBox.checked=true;};}
	tDv(tCv);
        };
function toggleLayerVisbility(id){
	var visibility = map.getLayoutProperty(id, 'visibility');
  	if (visibility === 'visible') {
	    map.setLayoutProperty(id, 'visibility', 'none');
	   // this.className = '';
	} else {
	    //this.className = 'active';
	    map.setLayoutProperty(id, 'visibility', 'visible');
	}
        };
////////////////////////////////// CHANGE LAYERS VISIBILITY wrt TIME ///////////////////////////////////////////
// global variable to see what changed in the years
var yearChange ={miny:[null,startyr[0]],maxy:[null,startyr[1]]};
function changeYear(newY,flag){
	if (flag=='min'){
		yearChange.miny.push(newY);
		yearChange.miny=yearChange.miny.slice(1);
		var yearsToChange=getInBetween(years.slice(1,years.length-1),yearChange.miny);
		yearsToChange=yearsToChange.slice(0,yearsToChange.length-1);
	}
	if (flag=='max'){
		yearChange.maxy.push(newY);
		yearChange.maxy=yearChange.maxy.slice(1);
		var yearsToChange=getInBetween(years.slice(1,years.length-1),yearChange.maxy);
		yearsToChange=yearsToChange.slice(1);
	}
	//console.log(yearsToChange);
	for (var k=0; k < yearsToChange.length; k++) {
		//for(var i=0; i < wasteDiameters.length-1; i++) {
			//for (j=0;j<materialGroups.length;j++){
				toggleLayerVisbility(vlayer+"Pipe-ow"+yearsToChange[k].toString());
			//}
		//}
	}
	
	
};
function getInBetween(array,bounds){
//console.log(array);
//console.log(bounds);

	bounds.sort();
	for (var i=0;i<array.length;i++){
		if (array[i]>=bounds[0]){
			array = array.slice(i);
			break;
		}
		if (i==array.length-1){
			array =[];
			break;
		};
	}
	for (var i=0;i<array.length;i++){
		if (array[i]>=bounds[1]){
			array = array.slice(0,i+1);
			break;
		}
	 }
	return array;
}
///////////////////////////////////////// GENERAL FUNCTION /////////////////////////////////////////////////////
/***
	REMOVE ALL ELEMT OF A CLASS PLAIN JS
					***/
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
/***
	WEB MERCATOR PROJ - NOT USED
					***/
function WEBMercatorProj(lng,lat,zoom){
	x=128/Math.PI*Math.pow(2,zoom)*(lng/180*Math.PI+Math.PI);
	y=128/Math.PI*Math.pow(2,zoom)*(Math.PI-Math.log(Math.tan(Math.PI/4+lat/180*Math.PI/2)));
	return [x,y];
}
/***
	FROM LAT LONG TO CONTAINER COORD - NOT USED
					***/
function LngLatToContainerPoint(lngLat){
	var lng = lngLat[0]/180*Math.PI;
	var lat = lngLat[1]/180*Math.PI;
	var zoom = map.getZoom();
	var bounds = map.getBounds();
	var leftLng= bounds._ne.lng/180*Math.PI;
	var topLat= bounds._ne.lat/180*Math.PI;
	//console.log(lng-leftLng,lat,topLat);
	x=128/Math.PI*Math.pow(2,zoom)*(lng+Math.PI)-128/Math.PI*Math.pow(2,zoom)*(leftLng+Math.PI);
	y=128/Math.PI*Math.pow(2,zoom)*(Math.PI-Math.log(Math.tan(Math.PI/4+lat/2)))-128/Math.PI*Math.pow(2,zoom)*(Math.PI-Math.log(Math.tan(Math.PI/4+topLat/2)));
	//console.log([x,y]);
	return [x,y];
}


