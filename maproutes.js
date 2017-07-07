
var shapeArray = [];
var routeLayer = L.geoJson();
var allShapes;

$(document).ready(function() {

    $.getJSON("NJ/routes_longname.json", function(data) {
        $.each(data, function(key, val){
            $("#routeDropdown").append("<option value='" + val.route_short_name + "'>" + val.route_short_name + " " + val.route_long_name + "</option>");
        })
    })

});

$("#routeDropdown").change(function() {

    var selectedBus = $("#routeDropdown").val();

    if (selectedBus == "None") {
        routeLayer.clearLayers();
    }
    else {
        $.getJSON("NJ/geojson/njbus/" + selectedBus + ".geojson", function(data){
            routeLayer.clearLayers();
            routeLayer = L.geoJson(data, {style: routeStyle}).addTo(map);
            map.fitBounds (routeLayer.getBounds());
        });
    }

});


// initialize the map
var map = L.map('map', {zoomControl: false}).setView([40.7357, -74.1724], 12);

L.control.zoom({position: 'bottomright'}).addTo(map);

// load a tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNvcmRlcm8xMiIsImEiOiJjaXRiZ3p4MTYwNmhyMm5scTZ1OWIwbTdwIn0.hYITgzNj9h8i6poldBqKIg',
{
      attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank"> Mapbox </a> &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap </a> contributors. <a href="https://www.mapbox.com/feedback/#/-74.5/40/10" target="_blank"> Improve this map </a>',
      maxZoom: 18,
}).addTo(map);

var routeStyle = {
      'color': '#4b0082',
      'weight': 3,
      'fillOpacity': 1.0
};  




