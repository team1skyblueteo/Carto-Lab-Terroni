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
var southWest = L.latLng(-41.3500, 174.6000),
    northEast = L.latLng(-41.2100, 174.9000),
    wellingtonBounds = L.latLngBounds(southWest, northEast),
    map = L.map('map', {zoomControl: false,
    // Set that bounding box as maxBounds to restrict moving the map
    maxBounds:  wellingtonBounds,
    maxZoom: 17,
    minZoom: 12,
    scrollWheelZoom: true, // We can also zoom with mousewheel
    keyboard: true, // We can also navigate with keyboard
    keyboardZoomOffset: 1, // Number of zoom levels to change when pressing + or - key.
    }).setView([-41.2833, 174.7666], 13);

var min = 20;
var mainmin = 80;

// Change zoom position
new L.Control.Zoom({ position: 'topright' }).addTo(map);

//  Load OpenStreeMap data from Mapbox.
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2l1bGlvdCIsImEiOiJjaWg5ZGs1d2MwMDR0dnNtMzlydHhxaGs3In0.TfMvSNQas5gBS882h-Oh4g';
L.mapbox.styleLayer('mapbox://styles/giuliot/cina7yy7000mad5m3dmzkaf1f').addTo(map);


////////////////////////////////////////// Sidebar //////////////////////////////////////////


jQuery(function () {
    jQuery('#sidebar').w2sidebar({
        name        : 'sidebar',
        img         : null,
        resizable   : false,
        height      : 'auto', 
        // topHTML     : '<div id="Searchlayer" style="padding: 10px 5px;">Search layer: <input/> </div>',
        routeData   : { id: 59, vid: '23.323.4' },
        menu: [
            { id: 1, text: 'Select Item', icon: 'fa-star' },
            { id: 2, text: 'View Item', icon: 'fa-camera' },
            { id: 4, text: 'Delete Item', icon: 'fa-minus' }
        ],
        onMenuClick: function (event) {
            console.log(event);
        },
        onFocus: function (event) {
            console.log('focus: ', this.name, event);
            // event.preventDefault();
        },
        onBlur: function (event) {
            console.log('blur: ', this.name, event);
            // event.preventDefault();
        },
        // onKeydown: function (event) { console.log('keyboard', event); event.preventDefault(); 
        // },
        nodes: [
            { id: 'level-1', text: 'Drainage Water Network', expanded: true, group: true, 
                nodes: [
                    { id: 'level-1-1', text: 'Drainage Water Network', img: 'Water_Drops.pdf',
                        route: '/project'
                    },
                    // { id: 'level-1-2', text: 'Level 1-2', icon: 'fa-camera',
                    //     route: '/project/:id'
                    // }
                ]
            },
            { id: 'level-2', text: 'Rain Water Network', img: 'icon-folder', expanded: true, group: true,
              nodes: [
                    { id: 'level-2-1', text: 'Level 2-1', icon: 'fa-star',
                        route: '/project'
                    },
                    { id: 'level-2-2', text: 'Level 2-2', icon: 'fa-camera',
                        route: '/project/:id'
                    },
                    { id: 'level-2-3', text: 'Level 2-3', 
                        route: '/project/:id/view'
                    }
                ]
            },
            // { id: 'level-3', text: 'Level 3', img: 'icon-folder', expanded: true, group: true,
            //   nodes: [
            //         { id: 'level-3-1', text: 'Level 3-1', icon: 'fa-star',
            //             route: '/project'
            //         },
            //         { id: 'level-3-2', text: 'Level 3-2', icon: 'fa-camera',
            //             route: '/project/:id'
            //         },
            //         { id: 'level-3-3', text: 'Level 3-3', 
            //             route: '/project/:id/view'
            //         }
            //     ]
            // }
        ],
        onClick: function (event) {
            console.log('click', event.target, event);
            // It is possible to hide the sidebar after the selection is done!!
            // sidebar.style.display = "none";
        }
    });
});

// OnClick event to show or hide the sidebar

var Menu  = document.getElementById("Menu");
var sidebar = document.getElementById("sidebar");
var Searchlayer = document.getElementById("Searchlayer");

Menu.addEventListener("click", function(){
  sidebar.style.display = (sidebar.dataset.toggled ^= 1) ? "block" : "none";
}, false);


////////////////////////////////////////// Time Slider //////////////////////////////////////////


//with no ui slider
var timeSlider = document.getElementById('time-slider');
timeRange0 = {
    "min": 1990,
    "10.77%": 2003,
    "80%": 2006,
    "max": 2010
}

jQuery(function() {
    resfreshtimeline([1990, 1998, 2001, 2005, 2003, 2015, 2010], 2001);
	resfreshtimeline([1993, 1998, 2001, 2005, 2003, 2015, 2010], 2001);
	console.log('fgg');
});
/*
years: array of year
start: first year to load
*/
function resfreshtimeline(years, startyr) {	
    years = years.sort();
    var range = years[years.length - 1] - years[0];
	jQuery(".slider-container").css("width",(range*30).toString()+'px');
	var mapwidth = parseFloat(jQuery(".mappanel").css("width"));
	//mapwidth = mapwidth.substring(0, mapwidth.length - 2).toNum;
	jQuery(".slider-container").css("left",((mapwidth-range*30)/2).toString()+'px');
    var timeRangetxt = '';
    density1yr = 1 / range * 100;
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
    console.log(timeRange);
	if (timeSlider.hasOwnProperty('noUiSlider')) {timeSlider.noUiSlider.destroy();}
    noUiSlider.create(timeSlider, {
        range: timeRange,
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

function geocodeThis() {
    var text = document.getElementById('search').value;
    console.log(text);
    if (text.length >= 1) {
        geocoderControl.geocoder.query({
            query: text,
            country: 'nz',
            // find data around Wellington preferably
            proximity: L.LatLng(-41.283333, 174.766667)
        }, function(err, res) {
            jQuery("#search-results").empty();
            //console.log(err);
            console.log(res.results.features);
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
                            resBounds = L.latLngBounds(southWest, northEast);
                    } else {
                        resBounds = false
                    }
                    var resCenter = L.latLng(results[i].center[1], results[i].center[0]);
                    if ((wellingtonBounds.contains(resCenter)) || (resBounds && wellingtonBounds.intersects(resBounds)) ) {
                        var labels = results[i].place_name.split(',');
                        if (labels.length>2)
                            {labels.splice(-2,2);}
                        else if (labels.length>1)
                            {labels.splice(-1,1);}
                        else {}
                        var label=labels.join(',');

                        var newinstance = "<div class=\"address-result\" id=\"add-res" + i + "\">" + label+ "</div>";
                        console.log(newinstance);
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

                                map.setView(center, 16);
                            }
                        });
                    }
                    //console.log( $("#add-res"+i));
                }
                if (showCount > maxitems) {
                    var newinstance = "<div class=\"address-result\" id=\"add-res-etc\">...</div>";
                    jQuery("#search-results").append(newinstance);
                }
                var searchOffSet =jQuery("#search").offset();
                var searchHeight =jQuery("#search").height();
                var searchResWidth =parseInt(jQuery("#search-results").css("max-width"))-jQuery("#search").width();
                //var searchResWidth =jQuery("#search").width();
                console.log
                console.log(searchResWidth);
                jQuery("#search-results").css("top", searchOffSet.top+searchHeight+11);
                jQuery("#search-results").css("left", searchOffSet.left-searchResWidth/2);
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
    console.log(res);
    //output.innerHTML = JSON.stringify(res.results.features[0]);
});

// Webpage Icon Reload
var Reload  = document.getElementById("Reload");
jQuery('#Reload').click(function() {
    location.reload(true)
});



