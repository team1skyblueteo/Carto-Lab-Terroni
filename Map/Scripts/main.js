/*
	Carto Lab main source (.js) file
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: M. Lehmann
	Author: G. Tagliaferro
	Versions:
	2016-04-21
*/

jQuery.noConflict();
    jQuery(function () {
        jQuery('#toolbar').w2toolbar({
            name: 'toolbar',
            routeData: { id: 5, vid: '40-43' },
            tooltip: 'top',
            items: [
                { type: 'check', id: 'item1.1', text: 'Check', img: 'icon-page', tooltip: function () { return (new Date()).getTime(); },
                    checked: true, route: '/project' },
                { type: 'drop',  id: 'item12', img: 'icon-page', icon: 'fa-star', tooltip: 'Drop button',  html: 'so', route: '/project/:id/go', count: 4 },
                { type: 'break', id: 'break0' },
                { type: 'menu',  id: 'item2', caption: 'Drop Down', img: 'icon-folder', icon: 'fa-camera', hint: 'Menu button',
                    items: [
                        { text: 'Item 1', img: 'icon-page', route: '/project/:id/item1', tooltip: 'some' },
                        { text: 'Item 2', img: 'icon-page', route: '/project/:id/item2', disabled: true },
                        { text: 'Item 3', value: 'Item Three', img: 'icon-page', route: '/project/:id/item2' }
                    ]
                },
                { type: 'menu',   id: 'item.2a@', img: 'icon-folder', icon: 'fa-heart', hint: 'This is some long hint',
                     items: [
                        { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                        { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12 },
                        { id: 'item3', text: 'Item 3', icon: 'fa-star-empty' },
                        { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘A' },
                        { id: 'item5', text: 'Without Image, Just Text', hotkey: '⌘B' }
                    ], overlay: { top1: 10 }
                },
                { type: 'menu-check', id: 'menucheck', text: 'Menu: Check',
                     items: [
                        { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                        { text: '--' },
                        { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                        { id: 'item3', text: 'Item 3', icon: 'fa-star-empty', hotkey: '⌘S' },
                        { text: '--' },
                        { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘W', checked: true }
                    ],
                },
                { type: 'menu-radio', id: 'menu.radio', text: 'Menu: Radio',
                     items: [
                        { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                        { text: '--' },
                        { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                        { id: 'item3', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                        { text: '--' },
                        { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' },
                        { id: 'item1a', text: 'First Item', count: 3, icon: 'fa-heart' },
                        { text: '--' },
                        { id: 'item2a', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                        { id: 'item3a', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                        { text: '--' },
                        { id: 'item4a', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' }
                    ],
                },
                { type: 'break', id: 'break1' },
                { type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', icon: 'fa-user', img1: 'icon-add', checked: true,
                    hint: 'This is some long hint', route: '/project/:id/view/:vid', style: "width: 100px; text-align: center",
                },
                { type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', icon: 'fa-group', img1: 'icon-add', disabled: false, count: 55,
                    hint: 'This is some long hint', route: '/project/:id/drop down/:vid/:id', style: "width: 100px; text-align: center",
                },
                { type: 'break' },
                { type: 'drop', id: 'item7', caption: 'drop button', img: 'icon-folder',
                    hint: 'This is some <br/>very very<br/> very very<br/> very veryt long hint',
                    html : '<div style="padding: 10px; font-size: 11px">some html</div>',
                    route: 'another/project'
                },
                { type: 'button',  id: 'itemT',  caption: 'Just Text', count: '1', hint: 'This is some very very very very very veryt long hint' },
                { type: 'color', id: 'item8', caption1: 'Color', icon1: 'fa-star', hint: 'Color', transparent: true, color: '888888' },
                { type: 'text-color', id: 'item9', caption1: 'Text Color', icon1: 'fa-star', hint: 'Text Color', transparent: true, color: 'FF9838' },
                { type: 'spacer' },
                { type: 'button',  id: 'item5',  caption: 'Item 5', img: 'icon-page', disabled: true, hint: 'This is some very very very very very veryt long hint' },
                { type: 'button',  id: 'item6',  caption: 'Item 6', img: 'icon-page', hint: 'This is some very very very very very veryt long hint' },
                { type: 'menu-radio', id: 'menu.radio2', text: 'Menu: Radio',
                     items: [
                        { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                        { text: '--' },
                        { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                        { id: 'item3', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                        { text: '--' },
                        { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' },
                        { id: 'item1a', text: 'First Item', count: 3, icon: 'fa-heart' },
                        { text: '--' },
                        { id: 'item2a', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                        { id: 'item3a', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                        { text: '--' },
                        { id: 'item4a', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' }
                    ],
                },

            ],
            onClick: function (event) { console.log(event); }
        });
    });

function changeTab() {
    w2ui['tabs'].get('tab2').caption = '<div style="width: 300px">new and long</div>';
    w2ui['tabs'].refresh();
}




// Set variables for maxBounds and for map
var southWest = L.latLng(-41.3500, 174.6000),
    northEast = L.latLng(-41.2100, 174.9000),
    bounds = L.latLngBounds(southWest, northEast);
var map = L.map('map', { zoomControl: false ,
	// Set that bounding box as maxBounds to restrict moving the map
    maxBounds: bounds,
    maxZoom: 17,
    minZoom: 13,
    scrollWheelZoom: true, // we can also zoom with mousewheel
	keyboard: true, // we can also navigate with keyboard
	keyboardZoomOffset: 1, //Number of zoom levels to change when pressing + or - key.})
	.setView([-41.2833, 174.7666], 13);

//	Load OpenStreeMap data from Mapbox.
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2l1bGlvdCIsImEiOiJjaWg5ZGs1d2MwMDR0dnNtMzlydHhxaGs3In0.TfMvSNQas5gBS882h-Oh4g';
L.mapbox.styleLayer('mapbox://styles/giuliot/cina7yy7000mad5m3dmzkaf1f').addTo(map);

// Change zoom position
new L.Control.Zoom({ position: 'topright' }).addTo(map);
