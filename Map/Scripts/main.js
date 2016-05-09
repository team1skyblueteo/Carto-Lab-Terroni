/*
	Carto Lab main source (.js) file
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: M. Lehmann
	Author: G. Tagliaferro
	Versions:
	2016-04-21
*/

// Toolbar 
jQuery.noConflict();
    jQuery(function () {
        jQuery('#toolbar').w2toolbar({
            name: 'toolbar',
            routeData: { id: 5, vid: '40-43' },
            tooltip: 'top',
            items: [
                //{ type: 'check', id: 'item1.1', text: 'Check', img: 'icon-page', tooltip: function () { return (new Date()).getTime(); },
                    //checked: true, route: '/project' },
                //{ type: 'drop',  id: 'item12', img: 'icon-page', icon: 'fa-star', tooltip: 'Drop button',  html: 'so', route: '/project/:id/go', count: 4 },
                //{ type: 'break', id: 'break0' },
                { type: 'menu',  id: 'item2', caption: 'Menu', img: 'icon-folder', icon: 'fa-reorder', hint: 'Menu button',
                    items: [
                        { text: 'Item 1', img: 'icon-page', route: '/project/:id/item1', tooltip: 'some' },
                        { text: 'Item 2', img: 'icon-page', route: '/project/:id/item2', disabled: true },
                        { text: 'Item 3', value: 'Item Three', img: 'icon-page', route: '/project/:id/item2' }
                    ]
                },
                // { type: 'menu',   id: 'item.2a@', img: 'icon-folder', icon: 'fa-heart', hint: 'This is some long hint',
                //      items: [
                //         { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                //         { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12 },
                //         { id: 'item3', text: 'Item 3', icon: 'fa-star-empty' },
                //         { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘A' },
                //         { id: 'item5', text: 'Without Image, Just Text', hotkey: '⌘B' }
                //     ], overlay: { top1: 10 }
                // },
                { type: 'spacer' },
                // Menu button
                { type: 'menu-check', id: 'menucheck', text: 'Topics',
                     items: [
                        { id: 'item1', text: '...', count: 3, icon: 'fa-heart' },
                        { text: '--' },
                        { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                        { id: 'item3', text: 'Item 3', icon: 'fa-star-empty', hotkey: '⌘S' },
                        { text: '--' },
                        { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘W', checked: true }
                    ],
                },
                // { type: 'menu-radio', id: 'menu.radio', text: 'Menu: Radio',
                //      items: [
                //         { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                //         { text: '--' },
                //         { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                //         { id: 'item3', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                //         { text: '--' },
                //         { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' },
                //         { id: 'item1a', text: 'First Item', count: 3, icon: 'fa-heart' },
                //         { text: '--' },
                //         { id: 'item2a', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                //         { id: 'item3a', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                //         { text: '--' },
                //         { id: 'item4a', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' }
                //     ],
                // },
                // { type: 'break', id: 'break1' },
                // { type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', icon: 'fa-user', img1: 'icon-add', checked: true,
                //     hint: 'This is some long hint', route: '/project/:id/view/:vid', style: "width: 100px; text-align: center",
                // },
                // { type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', icon: 'fa-group', img1: 'icon-add', disabled: false, count: 55,
                //     hint: 'This is some long hint', route: '/project/:id/drop down/:vid/:id', style: "width: 100px; text-align: center",
                // },
                // { type: 'break' },
                // { type: 'drop', id: 'item7', caption: 'drop button', img: 'icon-folder',
                //     hint: 'This is some <br/>very very<br/> very very<br/> very veryt long hint',
                //     html : '<div style="padding: 10px; font-size: 11px">some html</div>',
                //     route: 'another/project'
                // },
                // { type: 'button',  id: 'itemT',  caption: 'Just Text', count: '1', hint: 'This is some very very very very very veryt long hint' },
                // { type: 'color', id: 'item8', caption1: 'Color', icon1: 'fa-star', hint: 'Color', transparent: true, color: '888888' },
                // { type: 'text-color', id: 'item9', caption1: 'Text Color', icon1: 'fa-star', hint: 'Text Color', transparent: true, color: 'FF9838' },
                // { type: 'spacer' },
                // { type: 'button',  id: 'item5',  caption: 'Item 5', img: 'icon-page', disabled: true, hint: 'This is some very very very very very veryt long hint' },
                // { type: 'button',  id: 'item6',  caption: 'Item 6', img: 'icon-page', hint: 'This is some very very very very very veryt long hint' },
                // { type: 'menu-radio', id: 'menu.radio2', text: 'Menu: Radio',
                //      items: [
                //         { id: 'item1', text: 'First Item', count: 3, icon: 'fa-heart' },
                //         { text: '--' },
                //         { id: 'item2', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                //         { id: 'item3', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                //         { text: '--' },
                //         { id: 'item4', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' },
                //         { id: 'item1a', text: 'First Item', count: 3, icon: 'fa-heart' },
                //         { text: '--' },
                //         { id: 'item2a', text: 'Item 2', icon: 'fa-user', count: 12, checked: true },
                //         { id: 'item3a', text: 'Item 3', icon: 'fa-star-empty', checked: true },
                //         { text: '--' },
                //         { id: 'item4a', text: 'Item 4', icon: 'fa-link', hotkey: '⌘L' }
                //     ],
                // },

            ],
            onClick: function (event) { console.log(event); }
        });
    });

function changeTab() {
    w2ui['tabs'].get('tab2').caption = '<div style="width: 300px">new and long</div>';
    w2ui['tabs'].refresh();
}

// Sidebar
jQuery(function () {
    jQuery('#sidebar').w2sidebar({
        name        : 'sidebar',
        img         : null,
        topHTML     : '<div style="padding: 10px 5px;">Search: <input/> </div>',
        // bottomHTML  : '<div style="padding: 10px 5px; border-top: 1px solid black;">Bottom</div>',
        // style       : 'border: 1px solid black',
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
        //onKeydown: function (event) { console.log('keyboard', event); event.preventDefault(); },
        nodes: [
            { id: 'level-1', text: 'Level 1', expanded: true, group: true,
                nodes: [
                    { id: 'level-1-1', text: function () { return  'Level 1.1' }, img1: 'icon-add', icon: 'fa-star', count: 1,
                        route: '/project',
                        onClick: function (event) { console.log('item', event); }
                    },
                    { id: 'level-1-2', text: 'Level 1.2', img1: 'icon-save', icon: 'fa-camera', count: 'some',
                        route: '/project/:id'
                    },
                    { id: 'level-1-3', text: '<div>Level 2 <input id="check2" tabindex="-1" type="checkbox" style="float:right" onclick="console.log(\'check clicked\')"/></div>', img: 'icon-delete', disabled1: true,
                        route: '/project/:id/view'
                    }
                ]
            },
            { id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: true, group: true,
              nodes: [ { id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder',
                         nodes: [
                           { id: 'level-2-1-1', text: function () { return 'Level 2.1.11' }, img: 'icon-page', count: '4', route: '/some/:id/:vid'},
                           { id: 'level-2-1-2', text: 'Level 2.1.2', img: 'icon-page', count: '10', route: '/some/:id/:vid/ok' },
                           { id: 'level-2-1-3', text: 'Level 2.1.3', img: 'icon-page', count: '22', route: '/some/:id/:vid,:id' },
                           { id: 'level-2-1-4', text: 'Level 2.1.4', img: 'icon-page' },
                           { id: 'level-2-1-5', text: 'Level 2.1.5', img: 'icon-page' },
                           { id: 'level-2-1-6', text: 'Level 2.1.6', img: 'icon-page' },
                           { id: 'level-2-1-7', text: 'Level 2.1.7', img: 'icon-page' },
                           { id: 'level-2-1-8', text: 'Level 2.1.7', img: 'icon-page' },
                           { id: 'level-2-1-9', text: 'Level 2.1.7', img: 'icon-page' },
                           { id: 'level-2-1-10', text: 'Level 2.1.10', img: 'icon-page' },
                           { id: 'level-2-1-11', text: 'Level 2.1.11', img: 'icon-page' },
                           { id: 'level-2-1-12', text: 'Level 2.1.12', img: 'icon-page' },
                           { id: 'level-2-1-13', text: 'Level 2.1.13', img: 'icon-page' },
                           { id: 'level-2-1-14', text: 'Level 2.1.14', img: 'icon-page' },
                           { id: 'level-2-1-15', text: 'Level 2.1.15', img: 'icon-page' }
                     ]},
                       { id: 'level-3-1', text: 'Level 3.1', img: 'icon-folder', expanded: true,
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
            { id: 'level-5', text: 'Level 5', img: 'icon-folder', expanded: true, group: true,
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
    })
	.setView([-41.2833, 174.7666], 13);


//	Load OpenStreeMap data from Mapbox.
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2l1bGlvdCIsImEiOiJjaWg5ZGs1d2MwMDR0dnNtMzlydHhxaGs3In0.TfMvSNQas5gBS882h-Oh4g';
L.mapbox.styleLayer('mapbox://styles/giuliot/cina7yy7000mad5m3dmzkaf1f').addTo(map);

// Change zoom position
new L.Control.Zoom({ position: 'topright' }).addTo(map);
