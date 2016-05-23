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
    bounds = L.latLngBounds(southWest, northEast),
    map = L.map('map', {zoomControl: false,
    // Set that bounding box as maxBounds to restrict moving the map
    maxBounds: bounds,
    maxZoom: 17,
    minZoom: 13,
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
        topHTML     : '<div style="padding: 10px 5px;">Search layer: <input/> </div>',
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
            { id: 'level-1', text: 'Level 1', expanded: false, group: true, 
                nodes: [
                    { id: 'level-1-1', text: '<div><input id="check" tabindex="-1" type="checkbox" onClick="console.log(\'check clicked\')"/> Level 1-1</div>', icon: 'fa-star',
                        route: '/project'
                    },
                    { id: 'level-1-2', text: '<div><input id="check1" tabindex="-1" type="checkbox" onClick="console.log(\'check clicked\')" /> Level 1-2</div>', icon: 'fa-camera',
                        route: '/project/:id'
                    },
                    { id: 'level-1-3', text: '<div><input id="check2" tabindex="-1" type="checkbox" onClick="console.log(\'check clicked\')"/> Level 1-3</div>', 
                        route: '/project/:id/view'
                    }
                ]
            },
            { id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: false, group: true,
              nodes: [ { id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder', 
                         nodes: [
                           { id: 'level-2-1-1', text: function () { return 'Level 2.1.11' }, img: 'icon-page', route: '/some/:id/:vid'},
                           { id: 'level-2-1-2', text: 'Level 2.1.2', img: 'icon-page', route: '/some/:id/:vid/ok' },
                           { id: 'level-2-1-3', text: 'Level 2.1.3', img: 'icon-page', route: '/some/:id/:vid,:id' },
                           { id: 'level-2-1-4', text: 'Level 2.1.4', img: 'icon-page' },
                           { id: 'level-2-1-5', text: 'Level 2.1.5', img: 'icon-page' },
                           { id: 'level-2-1-6', text: 'Level 2.1.6', img: 'icon-page' },
                           { id: 'level-2-1-7', text: 'Level 2.1.7', img: 'icon-page' },
                     ]},
                       { id: 'level-3-1', text: 'Level 3.1', img: 'icon-folder', expanded: false,
                         nodes: [
                           { id: 'level-3-1-1', text: 'Level 3.1.1', icon: 'fa-beer', disabled: true },
                           { id: 'level-3-1-2', text: 'Level 3.1.2', icon: 'fa-envelope' },
                           { id: 'level-3-1-3', text: 'Level 3.1.3', icon: 'fa-ok' },
                           { id: 'level-3-1-4', text: 'Level 3.1.4', icon: 'fa-heart' },
                           { id: 'level-3-1-5', text: 'Level 3.1.5', icon: 'fa-globe', disabled: true },
                           { id: 'level-3-1-6', text: 'Level 3.1.6', icon: 'fa-reorder' },
                           { id: 'level-3-1-7', text: 'Level 3.1.7', icon: 'fa-user-md' },
                           { id: 'level-3-1-8', text: 'Level 3.1.8', icon: 'fa-download' }
                     ]},
                       { id: 'level-4-1', text: 'Level 4.1', img: 'icon-folder',
                         nodes: [
                           { id: 'level-4-1-1', text: 'Level 4.1.1', img: 'icon-page' },
                           { id: 'level-4-1-2', text: 'Level 4.1.2', img: 'icon-page' },
                           { id: 'level-4-1-3', text: 'Level 4.1.3', img: 'icon-page' }
                     ]}
                     ]
            },
            { id: 'level-5', text: 'Level 5', img: 'icon-folder', expanded: false, group: true,
              nodes: [ { id: 'level-5-1', text: 'Level 5.1', img: 'icon-page' },
                       { id: 'level-5-2', text: 'Level 5.2', img: 'icon-page' },
                       { id: 'level-5-3', text: 'Level 5.3', img: 'icon-page' }
                     ]
            }
        ],
        onClick: function (event) {
            console.log('click', event.target, event);
        }
    });
});


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
