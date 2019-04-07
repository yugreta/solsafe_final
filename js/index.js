var labels_event=[];
var labels_place = [];
 
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initMap() {
  var starting_point = {lat: 33.6472, lng: -117.8411};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: starting_point,
    mapTypeId: 'terrain'
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
          }, function() {});
  }
}

var labelIndex = 0;

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: location.geometry.location,
    map: map
  });
  
  var marker_index=labelIndex++ % labels_place.length;
  marker.description = new google.maps.InfoWindow({
    content: labels_event[marker_index] + ' at ' +labels_place[marker_index],
  });
  
  google.maps.event.addListener(marker, 'click', function(){
    this.description.setPosition(this.getPosition());
    this.description.open(map); //map to display on
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function myFunction() {
  var place = prompt("Please enter the location", "i.e. Langson Library");
  labels_place.push(place);
  
  var event = prompt("Please describe the event", "i.e. Roberry on First Floor");
  labels_event.push(event);
  
  var request = {
          query: place,
          fields: ['name', 'geometry'],
  };
  
  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        addMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
  
  if (place != "") {
    document.getElementById("demo").innerHTML = "Thank you for the alert at " + place + "!";
  }else{
    document.getElementById("demo").innerHTML = "";
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Get the modal
var using = document.getElementById('using_modal');
var about = document.getElementById('about_modal');

// Get the button that opens the modal
var using_b = document.getElementById("using");
var about_b = document.getElementById("about");

// Get the <span> element that closes the modal
var span_u = document.getElementsByClassName("close_u")[0];
var span_a = document.getElementsByClassName("close_a")[0];

// When the user clicks on the button, open the modal 
using_b.onclick = function() {
  using.style.display = "block";
}
about_b.onclick = function() {
  about.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span_u.onclick = function() {
  using.style.display = "none";
}
span_a.onclick = function() {
  about.style.display = "none";
}