
var shapeArray = [];
var routeLayer = L.geoJson();

$(document).ready(function() {

    $.getJSON("NJ/routes_longname.json", function(data) {
        $.each(data, function(key, val){
            $("#routeDropdown").append("<option value='" + val.route_id + "'>" + val.route_short_name + " " + val.route_long_name + "</option>");
        })
    })
    
});

$("#routeDropdown").change(function() {

    var selectedBus = $("#routeDropdown").val();
    shapeArray = [];

    $.getJSON("NJ/trips.json", function(data) {
        $.each(data, function(key, val){
            if (val.route_id == selectedBus) {
                shapeArray.push(val.shape_id);
            }
        })
    })

    // console.log(shapeArray);

    // load GeoJSON from an external file
    $.getJSON("NJ/njbus_5-19-17.geojson",function(data){
        // add GeoJSON layer to the map once the file is loaded
        routeLayer.clearLayers();
        routeLayer = L.geoJson(data, {filter: routeFilter, style: routeStyle}).addTo(map);
        map.fitBounds (routeLayer.getBounds());
    });

    function routeFilter(feature) {
        for (var i = 0; i < shapeArray.length; i++) {
            if (feature.properties.group == shapeArray[i])
                return true;
        }
    } 

});



// initialize the map
var map = L.map('map', {zoomControl: false}).setView([40.7357, -74.1724], 12);

L.control.zoom({position: 'bottomright'}).addTo(map);

// load a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
{
      attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
      //minZoom: 9
    }).addTo(map);

var routeStyle = {
      'color': '#4b0082',
      'weight': 3,
      'fillOpacity': 1.0
  };  



