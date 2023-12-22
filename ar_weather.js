let coordinates = {};

$(document).ready(function(){
  getCoords();
  getWeather();
});

function getCoords(){
  let searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has('source') && searchParams.has('destination')){
    let source = searchParams.get('source');
    let destination = searchParams.get('destination');

    coordinates.source_lat = source.split(";")[0];
    coordinates.source_lon = source.split(";")[1];
    coordinates.destination_lat = destination.split(";")[0];
    coordinates.destination_lon = destination.split(";")[1];
  }
  else {
    alert("Coordinates NOT Selected!");
    window.history.back();
  };
}

function getWeather(){
  $.ajax({
    url:`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=9835c7b82a66a144dfcfa35eb767bce2`,
    type:"get",
    success: function(response){
      let name = response.name;
      let weather = response.weather[0].main;

      $("#scene_container").append(
        `
          <a-entity gps-entity-place="latitude: ${response.coord.lat}; longitude: ${response.coord.lon};">
            <a-entity>
              <a-text height="50" value="Weather forcast is ${weather} at ${name}"></a-text>
            </a-entity>
          </a-entity>
        `
      );
    }
  });
}