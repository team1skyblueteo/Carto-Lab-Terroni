/*
	Carto Lab main source (.js) file
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: M. Lehmann
	Author: G. Tagliaferro
	Versions:
	2016-04-21
*/
////////////////////////////////////////// Map //////////////////////////////////////////
// Set variables for maxBounds and for map
/***
	MAP BOX JS BOUND FOR GEOCODER
				***/
var southWest = L.latLng(-41.3500, 174.6000),
    northEast = L.latLng(-41.2100, 174.9000),
    jswellingtonBounds = L.latLngBounds(southWest, northEast);


L.mapbox.accessToken = 'pk.eyJ1IjoiZ2l1bGlvdCIsImEiOiJjaWg5ZGs1d2MwMDR0dnNtMzlydHhxaGs3In0.TfMvSNQas5gBS882h-Oh4g';
/**	
	MAPBOX GL VERSION
	**/

var southWest = new mapboxgl.LngLat(174.6000, -41.3500),
    northEast = new mapboxgl.LngLat(174.9000, -41.2100),
    wellingtonBounds = new mapboxgl.LngLatBounds(southWest, northEast);
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2l1bGlvdCIsImEiOiJjaWg5ZGs1d2MwMDR0dnNtMzlydHhxaGs3In0.TfMvSNQas5gBS882h-Oh4g';
var map = new mapboxgl.Map({
    container: 'map',
    //style: 'mapbox://styles/mapbox/streets-v8',
    style: 'mapbox://styles/giuliot/cipjidy9h005ccnng1p9qidf1',

    center: [174.7666, -41.2833],
    maxBounds: wellingtonBounds,
    maxZoom: 18,
    minZoom: 12,
    zoom: 13,
    scrollWheelZoom: true, // We can also zoom with mousewheel
    keyboard: true, // We can also navigate with keyboard
    keyboardZoomOffset: 1, // Number of zoom levels to change when pressing + or - key.
});

map.addControl(new mapboxgl.Navigation());

var min = 20;
var mainmin = 80;

////////////////////////////////////////// Sidebar //////////////////////////////////////////

jQuery(function() {
    jQuery('#sidebar').w2sidebar({
        name: 'sidebar',
        img: null,
        resizable: false,
        height: 'auto',
        // topHTML     : '<div id="Searchlayer" style="padding: 10px 5px;">Search layer: <input/> </div>',
        routeData: {
            id: 59,
            vid: '23.323.4'
        },
        onMenuClick: function(event) {
            //console.log(event);
        },
        onClick: function(event) {
            if (event.target == 'level-1-1') {
                togglePipe('waste')
            }
            if (event.target == 'level-2-1') {
                togglePipe('storm')
            }
        },
        nodes: [{
            id: 'level-1',
            text: 'Waste Water Network',
            expanded: true,
            group: true,
            nodes: [{
                id: 'level-1-1',
                text: 'Waste Water Network',
                img: 'icon-drainage',
                route: '/project/Icons'
            }],
        }, {
            id: 'level-2',
            text: 'Storm Water Network',
            img: 'icon-folder',
            expanded: true,
            group: true,
            nodes: [{
                id: 'level-2-1',
                text: 'Storm Water Network',
                img: 'icon-rain',
                route: '/project'
            }],
        }, ],
    });
});

// OnClick event to show or hide the sidebar

var Menu = document.getElementById("Menu");
var sidebar = document.getElementById("sidebar");

Menu.addEventListener("click", function() {
    sidebar.style.display = (sidebar.dataset.toggled ^= 1) ? "block" : "none";
}, false);


////////////////////////////////////////// Time Slider //////////////////////////////////////////


//Time slider global variable
var timeSlider = document.getElementById('time-slider');
var startyr = [1840, 2015];
jQuery(function() {
    resfreshtimeline(years.slice(1), startyr);
    timeSlider.noUiSlider.on('update', function(values, handle) {
        if (handle) { //max
            //console.log(parseInt(values[handle]),'max');
            changeYear(parseInt(values[handle]), 'max');

        } else { //min
            //console.log(parseInt(values[handle]),'max');
            changeYear(parseInt(values[handle]), 'min');

        }
    });
});
/*
years: array of year
start: first year to load
*/
function resfreshtimeline(years, startyr) {
    //years = years.sort();
    var range = years[years.length - 1] - years[0];
    jQuery(".slider-container").css("width", (range * 30).toString() + 'px');
    var mapwidth = parseFloat(jQuery(".mappanel").css("width"));
    //mapwidth = mapwidth.substring(0, mapwidth.length - 2).toNum;
    jQuery(".slider-container").css("left", ((mapwidth - range * 30) / 2).toString() + 'px');
    var timeRangetxt = '';
    density1yr = 5 / range * 100;
    for (i = 0; i < years.length; i++) {
        if (i === 0) {
            timeRangetxt = timeRangetxt + '{ \"min\":' + years[i].toString() + ','
                //yearsPerc[i]='min';
        } else if (i == years.length - 1) {
            timeRangetxt = timeRangetxt + '\"max\":' + years[i].toString() + '}'
                //yearsPerc[i]='max';
        } else {
            timeRangetxt = timeRangetxt + '\"' + ((years[i] - years[0]) * 100 / range).toString() + '%\":' + years[i].toString() + ','
                //yearsPerc[i]=((years[i]-years[0])/range).toString()+"";
        }
    }
    var timeRange = JSON.parse(timeRangetxt);
    if (timeSlider.hasOwnProperty('noUiSlider')) {
        timeSlider.noUiSlider.destroy();
    }
    noUiSlider.create(timeSlider, {
        range: timeRange,
        connect: true,
        start: startyr,
        snap: true,
        pips: { // Show a scale with the slider
            mode: 'steps',
            density: density1yr
        }
    });
}

////////////////////////////////////////// Toolbar //////////////////////////////////////////


/* The function takes the text in the search field make a query to the mapbox geocoder,
display only four result and when clicked on the result zoom either to its bbox (if present) or to its center */

var geocoderControl = L.mapbox.geocoderControl('mapbox.places');

// IMPORTANT TO BE TRANSLATED TO MAPBOX GL IF POSSIBLE

function geocodeThis() {
    var text = document.getElementById('search').value;
    //console.log(text);
    if (text.length >= 1) {
        geocoderControl.geocoder.query({
            query: text,
            country: 'nz',
            // find data around Wellington preferably
            proximity: L.LatLng(-41.283333, 174.766667)
        }, function(err, res) {
            jQuery("#search-results").empty();
            //console.log(err);
            //console.log(res.results.features);
            results = res.results.features;
            if (results.length > 0) {
                var maxitems = 4;
                var showCount = 0;
                for (i = 0; i < results.length; i++) {
                    if (showCount > 4) {
                        break
                    }
                    if (results[i].hasOwnProperty('bbox')) {
                        var southWest = L.latLng(results[i].bbox[1], results[i].bbox[0]),
                            northEast = L.latLng(results[i].bbox[3], results[i].bbox[2]),
                            jsresBounds = L.latLngBounds(southWest, northEast);
                        var southWest = new mapboxgl.LngLat(results[i].bbox[0], results[i].bbox[1]),
                            northEast = new mapboxgl.LngLat(results[i].bbox[2], results[i].bbox[3]),
                            resBounds = new mapboxgl.LngLatBounds(southWest, northEast);
                    } else {
                        resBounds = false
                    }
                    var resCenter = new mapboxgl.LngLat(results[i].center[0], results[i].center[1]);
                    var jsresCenter = L.latLng(results[i].center[1], results[i].center[0]);
                    if ((jswellingtonBounds.contains(jsresCenter)) || (jsresBounds && jswellingtonBounds.intersects(jsresBounds))) {
                        var labels = results[i].place_name.split(',');
                        if (labels.length > 2) {
                            labels.splice(-2, 2);
                        } else if (labels.length > 1) {
                            labels.splice(-1, 1);
                        } else {}
                        var label = labels.join(',');

                        var newinstance = "<div class=\"address-result\" id=\"add-res" + i + "\">" + label + "</div>";
                        //console.log(newinstance);
                        jQuery("#search-results").append(newinstance);
                        showCount++;
                        jQuery("#add-res" + i).data({
                            "bbox": resBounds,
                            "center": resCenter
                        })
                        jQuery("#add-res" + i).click(function() {
                            jQuery(".address-result").css("background-color", "#efefef");
                            jQuery(this).css("background-color", "#cccccc");
                            //console.log("hey");
                            //console.log($(this).data("bbox"));
                            if (jQuery(this).data("bbox")) {
                                var bbox = jQuery(this).data("bbox");
                                map.fitBounds(bbox);
                            } else {
                                var center = jQuery(this).data("center");

                                //map.setView(center, 16);
                                map.setCenter(resCenter);
                            }
                        });
                    }
                    //console.log( $("#add-res"+i));
                }
                if (showCount > maxitems) {
                    var newinstance = "<div class=\"address-result\" id=\"add-res-etc\">...</div>";
                    jQuery("#search-results").append(newinstance);
                }
                var searchOffSet = jQuery("#search").offset();
                var searchHeight = jQuery("#search").height();
                var searchResWidth = parseInt(jQuery("#search-results").css("max-width")) - jQuery("#search").width();
                //var searchResWidth =jQuery("#search").width();
                //console.log
                //console.log(searchResWidth);
                jQuery("#search-results").css("top", searchOffSet.top + searchHeight + 11);
                jQuery("#search-results").css("left", searchOffSet.left - searchResWidth / 2);
                jQuery("#search-results").css("visibility", "visible");
            } else {
                jQuery("#search-results").css("visibility", "hidden");
            }

        });
    } else {
        jQuery("#search-results").css("visibility", "hidden");
    }
}

// Listener to keyup and enter for launch the geocoding

jQuery('#search').keyup(function() {
    geocodeThis();
});
jQuery('#search').keydown(function(e) {
    if (13 == e.keyCode) {
        geocodeThis();
    };
})

geocoderControl.on('found', function(res) {
    //console.log(res);
    //output.innerHTML = JSON.stringify(res.results.features[0]);
});

// Webpage Logo Reload
var Reload = document.getElementById("Logo");
// jQuery('#Reload').click(function() {
//     location.reload(true);
// });
Reload.addEventListener("click", function() {
    location.reload(true);
}, false);

// Slider button
var Sliderbtn = document.getElementById("sliderbtn");

Sliderbtn.addEventListener("click", function() {
    if (map.getZoom() < 14) {
        if (timeSlider.style.visibility == "visible") {
            timeSlider.style.visibility = "hidden";
            document.getElementById("sliderbtn").innerHTML = "Show Time Slider";
        } else {
            timeSlider.style.visibility = "visible";
            document.getElementById("sliderbtn").innerHTML = "Hide Time Slider";
        }
    }
}, false);

// Legend button
var Legendbtn = document.getElementById("legend");
var Legend = document.getElementById("legend-c");

Legendbtn.addEventListener("click", function() {
    if (map.getZoom() >= 14) {
        if (Legend.style.visibility == "visible") {
            Legend.style.visibility = "hidden";
            document.getElementById("legend").innerHTML = "Show Legend";
        } else {
            Legend.style.visibility = "visible";
            document.getElementById("legend").innerHTML = "Hide Legend";
        }
    }
}, false);

/////////////////////////////// DISPLAY ELEVATION //////////////////////////////////
/***
	on click listener e poup
				***/
map.on('click', function(e) {
    //console.log(e);
    // Populate the popup and set its coordinates
    // based on the feature found.
    var height = queryElevation(e.lngLat);
    height = Math.round(height * 10) / 10;
    if (height != -9999) {
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("Height: " + height.toString() + " m ")
            .addTo(map);
    }
});

////////////////////////// ZOOM event for LEGEND and time slider //////////////////////////

map.on('zoom', function(e) {
    if (map.getZoom() >= 14) {
        timeSlider.style.visibility = "hidden";
        Sliderbtn.style.color = "silver";
<<<<<<< HEAD
        Legendbtn.style.color = "#666";
    }
    else if (map.getZoom()<14){
    	Legend.style.visibility = "hidden";
    	resfreshtimeline(years.slice(1), startyr);
        Legendbtn.style.color = "silver";
        Sliderbtn.style.color = "#666";
=======
    } else if (map.getZoom() < 14) {
        Legend.style.visibility = "hidden";
        resfreshtimeline(years.slice(1), startyr);
        Legendbtn.style.color = "#666";
>>>>>>> origin/master
    }
});

/////////////////////////////////////////GENERAL FUNCTIONS ///////////////////////////////////
