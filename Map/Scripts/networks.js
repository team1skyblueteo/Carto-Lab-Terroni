/*
	Carto Lab network visualisation (.js) file
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: M. Lehmann
	Author: G. Tagliaferro
	Versions:
	2016-06-28
*/

////////////////////////////////////////// MAPBOX GL VERSION //////////////////////////////////////////

/***	 	
	Variable class for visualisation
					****/
var wasteDiameters = [0, 160, 200, 400, 800, 2000];
var stormDiameters = [0, 355, 760, 1530, 3500, 6000];
var materialGroups = ['Ceramics', 'Metals', 'Concrete', 'Fibre-composite', 'PVC-plastics', 'Polyethylene-plastics', 'Other-unknown'];
var years = [9999, 1840, 1900, 1920, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2015];
// CONSIDERE MIN AND MAX ZOOM
var wasteLayersNames = [];
var stormLayersNames = [];
var wasteLayersNamesOw = [];
var stormLayersNamesOw = [];
var vlayer = '';
/***
	ADD DATA SOURCE
			***/
map.on("load", function() {
        map.addSource("wastePipeline", {
            "type": "geojson",
            "data": "./Data/Wastwater_pipe2.geojson", 
        });
        map.addSource("stormPipeline", {
            "type": "geojson",
            "data": "./Data/Stormwater2.geojson", //data
        });
        vlayer = 'storm';
        Diameters = stormDiameters;
        loadStormWater();
        document.getElementById("node_level-1-1").click();
        loadWasteWater();

    })
    /***
    	LOAD WASTE WATER
    			***/

function loadWasteWater() {
    // uniform layer to be shown at higher zooms
    for (var k = 0; k < years.length - 1; k++) {
        wasteLayersNamesOw.push("wastePipe-ow" + years[k].toString());
        map.addLayer({
            "id": "wastePipe-ow" + years[k].toString(),
            "type": "line",
            "source": "wastePipeline",
            "source-layer": "Wastwater_pipe",
            "minzoom": 13,
            "maxzoom": 14, //getMinZoom(i),
            "filter": getFilterY(years[k], years[k + 1]),
            "layout": {
                "line-join": "round",
                "line-cap": "round",
                'visibility': 'none'
            },
            "paint": {
                "line-width": 0.6, //Math.pow(Math.log10(( wasteDiameters[i]+wasteDiameters[i+1]) /3),2),
                "line-color": 'red',
                "line-opacity": 0.6,
            }
        }, "housenum-label");
    }
    // create different styled layer depending on year, diameter and material type
    for (var i = 0; i < wasteDiameters.length - 1; i++) {

        for (var j = 0; j < materialGroups.length; j++) {
            wasteLayersNames.push("wastePipe-" + wasteDiameters[i].toString() + materialGroups[j]);
            map.addLayer({
                "id": "wastePipe-" + wasteDiameters[i].toString() + materialGroups[j],
                "type": "line",
                "source": "wastePipeline",
                "source-layer": "Wastwater_pipe",
                "minzoom": 14, //getMinZoom(i),
                // get the correct filter depending on the prop
                "filter": getFilterMD(wasteDiameters[i], wasteDiameters[i + 1], materialGroups[j]),
                "layout": {
                    "line-join": "round",
                    "line-cap": "round",
                    'visibility': 'none'
                },
                "paint": {
                    "line-width": Math.pow(Math.log10((wasteDiameters[i] + wasteDiameters[i + 1]) / 3), 2),
                    /*{
                    "stops":getLineWidthZoom(( wasteDiameters[i]+wasteDiameters[i+1]) /2)
                    },*/
                    "line-color": getGroupColor(materialGroups[j]),
                    "line-opacity": 0.8,
                    /*{
                    	"stops":[[12,0.3],[18,0.8]],
                    },*/
                }
            }, "housenum-label");
        }
    }
    //Diameters=wasteDiameters;
};
/***
	LOAD STORM WATER
			***/

function loadStormWater() {
    for (var k = 0; k < years.length - 1; k++) {
        stormLayersNamesOw.push("stormPipe-ow" + years[k].toString());
        map.addLayer({
            "id": "stormPipe-ow" + years[k].toString(),
            "type": "line",
            "source": "stormPipeline",
            //"source-layer": "Stormwater-pipe-noSump",
            "minzoom": 13,
            "maxzoom": 14, //getMinZoom(i),
            "filter": getFilterY(years[k], years[k + 1]),
            "layout": {
                "line-join": "round",
                "line-cap": "round",
                'visibility': 'visible'
            },
            "paint": {
                "line-width": 0.6, //Math.pow(Math.log10(( wasteDiameters[i]+wasteDiameters[i+1]) /3),2),
                "line-color": 'blue',
                "line-opacity": 0.6,
            }
        }, "housenum-label");
    }

    for (var i = 0; i < stormDiameters.length - 1; i++) {
        for (var j = 0; j < materialGroups.length; j++) {
            stormLayersNames.push("stormPipe-" + stormDiameters[i].toString() + materialGroups[j]);
            map.addLayer({
                "id": "stormPipe-" + stormDiameters[i].toString() + materialGroups[j],
                "type": "line",
                "source": "stormPipeline",
                //"source-layer": "Stormwater-pipe-noSump",
                "minzoom": 14,
                "filter": getFilterMD(stormDiameters[i], stormDiameters[i + 1], materialGroups[j]),
                "layout": {
                    "line-join": "round",
                    "line-cap": "round",
                    'visibility': 'visible'
                },
                "paint": {
                    "line-width": Math.pow(Math.log10((stormDiameters[i] + stormDiameters[i + 1]) / 3), 2),
                    "line-color": getGroupColor(materialGroups[j]),
                    "line-opacity": 0.8,
                }
            }, "housenum-label");
        }
    }

    //Diameters=stormDiameters;
};
/***
	FUNCTION TO SWITCH BETWEEN THE VISUALISATION OF THE TWO NETWORK
									***/
function togglePipe(layer) {
    if (layer == vlayer) {} else {
        if (vlayer == 'waste') {
            removeElementsByClass('arrowFlow');
            Diameters = stormDiameters;
            vlayer = 'storm';
        } else {
            Diameters = wasteDiameters;
            vlayer = 'waste';
        }
        updateLegend();
        for (var k = 0; k < years.length - 1; k++) {
            toggleLayerVisbility("wastePipe-ow" + years[k].toString());
            toggleLayerVisbility("stormPipe-ow" + years[k].toString());
        }

        for (var j = 0; j < materialGroups.length; j++) {
            for (var i = 0; i < stormDiameters.length - 1; i++) {
                toggleLayerVisbility("stormPipe-" + stormDiameters[i].toString() + materialGroups[j]);
            }
            for (var i = 0; i < wasteDiameters.length - 1; i++) {
                toggleLayerVisbility("wastePipe-" + wasteDiameters[i].toString() + materialGroups[j]);
            }

        }
    }
}

/****	
		GET COLOR FOR MATERIAL GROUP
					****/
function getGroupColor(material) {
    switch (material) {
        case 'Ceramics':
            return '#841F27';
            break;
        case 'Metals':
            return '#66a61e';
            break;
        case 'Concrete':
            return '#1b9e77';
            break;
        case 'Fibre-composite':
            return '#e6ab02';
            break;
        case 'PVC-plastics':
            return '#ffa500';
            break;
        case 'Polyethylene-plastics':
            return '#7570b3';
            break;
        case 'Other-unknown':
            return '#666666';
            break;
    }

}

/****	
		GET FILTER YEAR
					****/
function getFilterY(yearI, yearII) {
    if (yearI == 9999) {
        return ["in", "year", ""];
    } else {
        return ["all", [">=", "year", yearI],
            ["<", "year", yearII]
        ];

    }

}
/**** 
		GET FILTERS MAT DIAM
					***/
function getFilterMD(diameterI, diameterII, material) {
    switch (material) {
        case 'Ceramics':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'brick', 'Earthenware', 'Eare', 'Stoneware']
            ];
            break;
        case 'Metals':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'Steel - spiral weld', 'Steel - epoxy lined', 'Steel - cement lined', 'Steel', 'Galvanised Steel', 'Galvanised Iron', 'Ductile Iron - cement lined', 'Ductile Iron', 'Copper', 'Cast Iron']
            ];
            break;
        case 'Concrete':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'Reinforced Concrete', 'Concrete']
            ];
            break;
        case 'Fibre-composite':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'Pitch Fibre', 'Asbestos Cement']
            ];
            break;
        case 'PVC-plastics':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'uPVC', 'PVC - Blue Brute', 'Polyvinyl Chloride', 'mPVC']
            ];
            break;
        case 'Polyethylene-plastics':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'Polyethylene', 'Medium Density Polyethylene', 'High Pressure Polyethylene', 'High Density Polyethylene', 'Hdpe']
            ];
            break;
        case 'Other-unknown':
            return ["all", [">", "Diameter", diameterI],
                ["<=", "Diameter", diameterII],
                ["in", "Material", 'PLST', 'NPRN', '']
            ];
            break;
    }
}

/***
		MOUSE OVER EVENT
					***/
map.on('mousemove', function(e) {

    var features = map.queryRenderedFeatures(e.point, {
        layers: wasteLayersNames.concat(wasteLayersNamesOw.concat(stormLayersNames.concat(stormLayersNamesOw)))
    });
    if (features.length > 0) {
        var feature = features[0];
        updatePipeInspector(feature);
    } else {
        updatePipeInspector('clear');
    }

});
/////////////////////////////////////////// PIPE INSPECTOR //////////////////////////////////////////////////
function updatePipeInspector(feature) {
    var pipeInspDivc = document.getElementById('pipe-inspector-c');
    pipeInspDivc.style.height = "170px";
    var pipeInspDiv = document.getElementById('pipe-inspector');
    if (feature == 'clear') {
        pipeInspDivc.style.height = "60px";
        pipeInspDiv.innerHTML = "<span style=\"font-size:13px\">Hover over a pipe<span>";
    } else {

        switch (feature.properties.Pipe_Shape) {
            case "U-shaped":
                showU();
                break;
            case "TRI":
                showTri();
                break;
            case "Rectangular Box":
                showRect();
                break;
            case "Ovoid A":
                showOvoid();
                break;
            case "Ovoid B":
                showOvoid();
                break;
            case "Ovoid":
                showOvoid();
                break;
            case "Egg-Shaped":
                showOvoid();
                break;
            case "Circular":
                showCircle();
                break;
            case "CIRCC":
                showCircle();
                break;
            default:
                ;
        }

        function showCircle() {
            pipeInspDiv.innerHTML = circlepipe;
        }

        function showU() {
            pipeInspDiv.innerHTML = upipe;
        }

        function showTri() {
            pipeInspDiv.innerHTML = tripipe;
        }

        function showRect() {
            pipeInspDiv.innerHTML = rectpipe;
        }

        function showOvoid() {
            pipeInspDiv.innerHTML = ovopipe;
        }
        if (feature.properties.Diameter != '' || feature.properties.Diameter != 'NaN') {
            document.getElementById('myDiam').innerHTML = feature.properties.Diameter + ' mm';
        } else {
            document.getElementById('myDate').innerHTML = 'unknown'
        };
        if (feature.properties.Date_ins_1 != '') {
            document.getElementById('myDate').innerHTML = feature.properties.Date_ins_1;
        } else {
            document.getElementById('myDiam').innerHTML = 'unknown'
        };
        if (feature.properties.Gradient != '' || feature.properties.Gradient != 'NaN') {

            document.getElementById('myGrad').innerHTML = (Math.round(parseFloat(feature.properties.Gradient) * 1000) / 10000).toString();
        } else {
            document.getElementById('myGrad').innerHTML = 'unknown'
        };
        if (feature.properties.Material != '') {
            document.getElementById('myMat').innerHTML = feature.properties.Material;
        } else {
            document.getElementById('myMat').innerHTML = 'unknown'
        };
    }
}


////////////////////////////////   FLOW DIRECTION    ////////////////////////////////////////////
/***
	GET HEIGHT OF THE MENU
				***/
var menuHeight = document.getElementById("toolbar").offsetHeight;
//console.log(menuHeight);
window.addEventListener("resize", function() {
    menuHeight = document.getElementById("toolbar").offsetHeight;
    //console.log(menuHeight);
});
/***
	EVENT LISTENER TO PLOT ARROW
				***/
map.on('move', function() {
    var zoom = map.getZoom();
    removeElementsByClass('arrowFlow');
    // only after zoom 18
    if (zoom >= 17 && vlayer == "waste") {

        bounds = map.getBounds();
        var features = map.queryRenderedFeatures(bounds, {
            layers: wasteLayersNames
        });
        for (i = 0, l = features.length; i < l; i++) {
            if (features[i].properties.DS_node_ID && features[i].properties.US_node_ID) {
                //var t0 = performance.now();
                flowParam = getFlowParam(features[i].properties.DS_node_ID, features[i].properties.US_node_ID);
                //var t1 = performance.now();
                //console.log('flowParam: '+(t1-t0));
                if (flowParam) {
                    plotFlow(flowParam, features[i].properties.DS_node_ID, features[i].properties.US_node_ID);
                } //var t2 = performance.now();
                //console.log('plotFlow: '+(t2-t1));
            }
        }
        //});
    } else {

    }
});
/***
	GET POSITION AND ORIENTATION OF THE ARROW
							***/


function getFlowParam(DSid, USid) {
    var DSn = parseInt(DSid.substring(2)) - 1;
    var USn = parseInt(USid.substring(2)) - 1;
    var tempNode = nodeArray.data[DSn];
    DSxy = [parseFloat(tempNode[0]), parseFloat(tempNode[1])];
    var tempNode = nodeArray.data[USn];
    USxy = [parseFloat(tempNode[0]), parseFloat(tempNode[1])];
    //plotPt(DSxy,DSid)

    //plotPt(USxy,USid)
    //console.log([USid,tempNode[2]]);
    Dist = Math.sqrt(Math.pow((USxy[0] - DSxy[0]), 2) + Math.pow((USxy[1] - DSxy[1]), 2));
    if (Dist < 0.0001) {
        //console.log(Dist);
        return false
    } else {
        Meanxy = [(USxy[0] + DSxy[0]) / 2, (USxy[1] + DSxy[1]) / 2];

        //Meanxy = {x:(USxy.x+DSxy.x)/2,y:(USxy.y+DSxy.y)/2};
        Bearing = Math.atan2(DSxy[0] - USxy[0], DSxy[1] - USxy[1]) / Math.PI * 180;
        //Bearing = Math.atan2(DSxy.x-USxy.x, DSxy.y-USxy.y)/Math.PI*180;
        return [Meanxy, Bearing];
    }
}

function plotPt(coo, id) {
    //console.log(coo);
    var arrayCoo = map.project(coo);
    if (arrayCoo.x < 1289 && arrayCoo.y < 408) {
        var ptDiv = document.createElement('div');
        ptDiv.className = 'arrowFlow';
        ptDiv.id = id;
        ptDiv.style.top = (parseInt(arrayCoo.y) + menuHeight - 10).toString() + 'px';
        ptDiv.style.left = (parseInt(arrayCoo.x) - 10).toString() + 'px';
        ptDiv.innerHTML = "<svg width=\"20\" height=\"20\" id=\"svg2\">" +
            "<circle cx=\"10\" cy=\"10\" r=\"5\"/>" +
            "</svg>";
        document.body.appendChild(ptDiv);
    }
}
/***
	PLOT THE ARROW
							***/
function plotFlow(flowParam, DSid, USid) {
    //var t3 = performance.now();
    var arrayCoo = map.project(flowParam[0]); //
    //var t4 = performance.now();
    //console.log('Mapbox gl project: '+(t4-t3));
    if (arrayCoo.x < 1289 && arrayCoo.y < 408) {
        var arrowDiv = document.createElement('div');
        var deg = flowParam[1] - 90;
        arrowDiv.className = 'arrowFlow';
        arrowDiv.id = DSid + USid;
        arrowDiv.style.top = (parseInt(arrayCoo.y) + 39 - 10).toString() + 'px';
        arrowDiv.style.left = (parseInt(arrayCoo.x) - 10).toString() + 'px';
        arrowDiv.innerHTML = "<svg width=\"20\" height=\"20\" id=\"svg2\">" +
            "<path d=\"m 13.658879,5.0000001 -0.547611,0.4471824 0,3.4709551 -13.111268,0 0,2.2612094 13.111268,0 0,3.373471 L 13.658879,15 20,10.447695 20,9.5533297 z\" id=\"path7\" style=\"fill:#006df0\" transform = \"rotate(" + deg.toString() + " 10 10)\"/>" +
            "</svg>";
        document.body.appendChild(arrowDiv);
    }
}
///////////////////////////////////////// FILL LEGEND //////////////////////////////////////////////////
//updateLegend();

function updateLegend() {
    var divMat = document.getElementById('mat-legend');
    divMat.innerHTML = "";
    var divDiam = document.getElementById('diam-legend');
    divDiam.innerHTML = "";
    for (var i = 0; i < Diameters.length - 1; i++) {
        (function(i) { // for onclik
            var newNode = document.createElement('div');
            newNode.innerHTML = "<input type=\"checkbox\" id=\"diamCheckBox" + (Diameters[i]).toString() + "\"checked=\"checked\"><svg class=\"legend-svg\" height=\"15\" width=\"30\">" +
                "<line x1=\"5\" y1=\"12\" x2=\"25\" y2=\"12\" stroke=\"rgb(255,0,0)\" stroke-width=\"" + Math.pow(Math.log10((Diameters[i] + Diameters[i + 1]) / 3), 2).toString() + "\" stroke-linecap=\"round\"/>" +
                "Sorry, your browser does not support inline SVG." +
                "</svg><div class=\"legend-label\">   " + (Diameters[i] + 1).toString() + " - " + Diameters[i + 1].toString() + "</div>";
            newNode.className = "legend-item-diam";
            newNode.className += " legend-item";
            newNode.addEventListener('click', function(e) {
                //console.log(e);
                if (e.target.type == 'checkbox') {
                    e.target.checked = !e.target.checked;
                }
                toggleDiamVisbility(Diameters[i].toString());
            });
            divDiam.appendChild(newNode);
        })(i)
    }

    for (var i = 0; i < materialGroups.length; i++) {
        var newNode = document.createElement('div');
        newNode.innerHTML = "<svg class=\"legend-svg\" height=\"15\" width=\"30\">" +
            "<line x1=\"5\" y1=\"12\" x2=\"25\" y2=\"12\" stroke=\"" + getGroupColor(materialGroups[i]) + "\" stroke-width=\"6\" stroke-linecap=\"round\"/>" +
            "Sorry, your browser does not support inline SVG." +
            "</svg><div class=\"legend-label\">   " + materialGroups[i].replace('-', ' ') + "</div>";
        newNode.className = "legend-item-mat";
        newNode.className += " legend-item";
        divMat.appendChild(newNode);
    }

}

/***
	TOGGLE VISIBILTY OF DIAMETER
							***/

function toggleDiamVisbility(Diam) {
    function tDv(callback) {
        //for (var k=0; k < years.length-1; k++) {
        for (j = 0; j < materialGroups.length; j++) {
            toggleLayerVisbility(vlayer + "Pipe-" + Diam + materialGroups[j]); //+years[k].toString()
        }
        //}

        callback.call();
    }

    function tCv() {
        var currentCheckBox = document.getElementById("diamCheckBox" + Diam);
        if (currentCheckBox.checked == true) {
            currentCheckBox.checked = false;
        } else {
            currentCheckBox.checked = true;
        };
    }
    tDv(tCv);
};
/***
	TOGGLE VISIBILTY OF A LAYER
							***/
function toggleLayerVisbility(id) {
    	console.log("tog");
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
var yearChange = {
    miny: [null, startyr[0]],
    maxy: [null, startyr[1]]
};
/***
	TOGGLE VISIBILTY OF YEARS
							***/
function changeYear(newY, flag) {
    if (flag == 'min') {
        yearChange.miny.push(newY);
        yearChange.miny = yearChange.miny.slice(1);
        var yearsToChange = getInBetween(years.slice(1, years.length - 1), yearChange.miny);
        //console.log(yearsToChange);
        yearsToChange = yearsToChange.slice(0, yearsToChange.length - 1);
    }
    if (flag == 'max') {
        yearChange.maxy.push(newY);
        //console.log(yearChange.maxy);
        yearChange.maxy = yearChange.maxy.slice(1);
        //console.log(yearChange.maxy);
        var yearsToChange = getInBetween(years.slice(1, years.length), yearChange.maxy);
        //console.log(yearChange.maxy);
        //console.log(yearsToChange);
        yearsToChange = yearsToChange.slice(0, yearsToChange.length - 1);
    }
    //console.log(yearsToChange);
    for (var k = 0; k < yearsToChange.length; k++) {
        //for(var i=0; i < wasteDiameters.length-1; i++) {
        //for (j=0;j<materialGroups.length;j++){
        toggleLayerVisbility(vlayer + "Pipe-ow" + yearsToChange[k].toString());
        //}
        //}
    }


};
/***
	GET THE YEAR TO BE TOGGLED
							***/
function getInBetween(array, bound) {
    var bounds = bound.slice().sort(function(a, b) {
        return a - b;
    });
    //console.log(array);
    //console.log(bounds);
    for (var i = 0; i < array.length; i++) {
        if (array[i] >= bounds[0]) {
            array = array.slice(i);
            break;
        }
        if (i == array.length - 1) {
            array = [];
            break;
        };
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] >= bounds[1]) {
            array = array.slice(0, i + 1);
            break;
        }
    }
    return array;
}
///////////////////////////////////////// GENERAL FUNCTION /////////////////////////////////////////////////////



/***
	REMOVE ALL ELEMT OF A CLASS PLAIN JS
					***/
function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
