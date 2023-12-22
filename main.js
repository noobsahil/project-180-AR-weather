let latitude, longitude, destination;

$(document).ready(function () {
  alert("Please allow the device to know your location!");
  initGeolocation();
});

$(function () {
  $("#weather-button").click(function () {
    window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`;
  });
});

function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
  else {
    alert("Sorry, your browser does not support geolocation services.");
  };
};

function success(position) {
  //let coords = [-79.26482,43.49168]

  longitude = position.coords.longitude;
  latitude = position.coords.latitude;
  
  mapboxgl.accessToken = "pk.eyJ1Ijoidm4xMjQ1NzgiLCJhIjoiY2w1N2c5b3dqMXFhZDNkczA2NWFmYml3bCJ9.6Y7nU1uEymNHCooPvJUSKA";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    //center: [coords[0],coords[1]],
    center: [longitude, latitude],
    zoom: 8,
  });

  map.addControl(new mapboxgl.GeolocateControl());
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }).on("result", function(e){
    destination = e.result.center
  }));

  var img1 = document.querySelector("#cn-tower");
  var img2 = document.querySelector("#canadas-wonderland");
  var img3 = document.querySelector("#casa-loma");
  var img4 = document.querySelector("#toronto-zoo");
  var img5 = document.querySelector("#niagara-falls");

  var marker1 = new mapboxgl.Marker({element:img1}).setLngLat([-79.38716,43.64264]).addTo(map);
  var marker2 = new mapboxgl.Marker({element:img2}).setLngLat([-79.5424,43.84208]).addTo(map);
  var marker3 = new mapboxgl.Marker({element:img3}).setLngLat([-79.40943,43.67803]).addTo(map);
  var marker4 = new mapboxgl.Marker({element:img4}).setLngLat([-79.18216,43.82043]).addTo(map);
  var marker5 = new mapboxgl.Marker({element:img5}).setLngLat([-79.06390,43.10664]).addTo(map);

  map.on("style.load", ()=>{
    map.setFog({});
  });
};




