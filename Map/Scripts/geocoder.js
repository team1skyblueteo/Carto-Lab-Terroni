/*
	Add geocoder
			*/
			var geocoderControl = L.mapbox.geocoderControl('mapbox.places');
			/*


/* the fuction take the text in the search field make a query to the mapbox geocoder,
display only four result and when clicked on the result zoom either to its bbox (if present) or to its center*/
function geocodeThis() {
    var text = document.getElementById('search').value;
    console.log(text);
    if (text.length >= 1) {
        geocoderControl.geocoder.query({
            query: text,
            country: 'us',
            proximity: L.LatLng(41.881832, -87.623177)
        }, function(err, res) {
            $("#search-results").empty();
            //console.log(err);
            console.log(res.results.features);
            results = res.results.features;
            if (results.length > 0) {
                var maxitems = 4;
                var southWest = L.latLng(42.363436, -87.6074225),
                    northEast = L.latLng(41.272109, -88.838157),
                    chicagoBounds = L.latLngBounds(southWest, northEast);
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
                    if ((chicagoBounds.contains(resCenter)) || (resBounds && chicagoBounds.intersects(resBounds)) ) {
						var labels = results[i].place_name.split(',');
						if (labels.length>2)
							{labels.splice(-2,2);}
						else if (labels.length>1)
							{labels.splice(-1,1);}
						else {}
						var label=labels.join(',');

                        var newinstance = "<div class=\"address-result\" id=\"add-res" + i + "\">" + label+ "</div>";
                        $("#search-results").append(newinstance);
                        showCount++;
                        $("#add-res" + i).data({
                            "bbox": resBounds,
                            "center": resCenter
                        })
                        $("#add-res" + i).click(function() {
                            $(".address-result").css("background-color", "white");
                            $(this).css("background-color", "#eeeeee");
                            //console.log("hey");
                            //console.log($(this).data("bbox"));
                            if ($(this).data("bbox")) {
                                var bbox = $(this).data("bbox");
                                map.fitBounds(bbox);
                            } else {
                                var center = $(this).data("center");

                                map.setView(center, 16);
                            }
                        });
                    }
                    //console.log( $("#add-res"+i));


                }
                if (showCount > maxitems) {
                    var newinstance = "<div class=\"address-result\" id=\"add-res-etc\">...</div>";
                    $("#search-results").append(newinstance);

                }

                $("#search-results").css("visibility", "visible");
            } else {
                $("#search-results").css("visibility", "hidden");
            }

        });
    } else {
        $("#search-results").css("visibility", "hidden");
    }

}
// listener to keyup and enter four lauch the geocoding

$('#search').keyup(function() {
    geocodeThis();

});
$('#search').keydown(function(e) {
    if (13 == e.keyCode) {
        geocodeThis();
    };

});

geocoderControl.on('found', function(res) {
    console.log(res);
    //output.innerHTML = JSON.stringify(res.results.features[0]);
});


