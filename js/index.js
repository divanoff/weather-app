$(document).ready(getData);

var lat, lon, weatherData, weather, fTemp, cTemp, town, tMinF, tMaxF, tMinC, tMaxC;
var photos = {
  "clear sky": "./img/clear.jpg",//"https://s5.postimg.org/sb02hdxuv/clear.jpg",
  "few clouds": "./img/few-clouds.jpg",//"https://s5.postimg.org/dt2v9e6jr/fewClouds.jpg",
  "scattered clouds": "./img/scattered-clouds.jpg",//"https://s5.postimg.org/r16ug2tgn/scatteredClouds.jpg",
  "broken clouds": "./img/broken-clouds.jpg",//"https://s5.postimg.org/f5kkba3zb/brokenClouds.jpg",
  "overcast clouds": "./img/broken-clouds.jpg",//"https://s5.postimg.org/f5kkba3zb/brokenClouds.jpg",
  "shower rain": "./img/showers.jpg",//"https://s5.postimg.org/cj9n8325j/showers.jpg",
  "rain": "./img/rain.jpg",//"https://s5.postimg.org/dizy3shbb/rain.jpg",
  "moderate rain": "./img/rain.jpg",//"https://s5.postimg.org/dizy3shbb/rain.jpg",
  "light rain": "./img/rain.jpg",//"https://s5.postimg.org/dizy3shbb/rain.jpg",
  "thunderstorm": "./img/thunderstorm.jpg",//"https://s5.postimg.org/3qsokeh0n/thnderstorm.jpg",
  "snow": "./img/snow.jpg",//"https://s5.postimg.org/eccjwenc7/snow.jpg",
  "mist": "./img/mist.jpg",//"https://s5.postimg.org/fz1rhmzdz/mist.jpg"
};
var icons = {
  "clear sky": "http://openweathermap.org/img/w/01d.png",
  "few clouds": "http://openweathermap.org/img/w/02d.png",
  "scattered clouds": "http://openweathermap.org/img/w/03d.png",
  "broken clouds": "http://openweathermap.org/img/w/04d.png",
  "overcast clouds": "http://openweathermap.org/img/w/04d.png",
  "shower rain": "http://openweathermap.org/img/w/09d.png",
  "rain": "http://openweathermap.org/img/w/10d.png",
  "moderate rain": "http://openweathermap.org/img/w/10d.png",
  "light rain": "http://openweathermap.org/img/w/10d.png",
  "thunderstorm": "http://openweathermap.org/img/w/11d.png",
  "snow": "http://openweathermap.org/img/w/13d.png",
  "mist": "http://openweathermap.org/img/w/50d.png"
};

function getData() {

  var ipInfo = "https://ipinfo.io?token=f9542c1b60ea8c";

  $.getJSON(ipInfo, function(data) {
    var geoString = data.loc;
    var coords = geoString.split(",");
    lat = coords[0];
    lon = coords[1];
    town = data.city + ", " + data.region;

    var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=863ce437ae2b095fc40b2e473a85b6a6";

    $.getJSON(api, function(data) {
      weatherData = data;
      fTemp = data.main.temp;
      cTemp = toCelsius(fTemp);
      tMinF = data.main.temp_min;
      tMaxF = data.main.temp_max;
      tMinC = toCelsius(tMinF);
      tMaxC = toCelsius(tMaxF);
      weather = weatherData.weather[0].description;
      $("#town").html("<h1>" + town + "</h1>");
      $("#temp").html(fTemp.toFixed(1) + "&deg;" + "<span onclick='switchTemp(this)' id='tempSwitcher'>F</span>");
      $("#min-max").html("Low <span id='low'>" + tMinF.toFixed(1) + "&deg;</span>F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High <span id='high'>" + tMaxF.toFixed(1) + "&deg;</span>F");
      $("#weather").html(toTitleCase(weather) + " <img src='" + icons[weather] + "' class='img-responsive'>");
      $("body").css("background", "url(" + photos[weather] + ")").css("background-size", "cover");
    });

  });

}

function switchTemp(str) {
  var curr = $("#tempSwitcher").html();
  if (curr.localeCompare("C")) {
    $("#temp").html(cTemp.toFixed(1) + "&deg;" + "<span onclick='switchTemp(this)' id='tempSwitcher'>C</span>");
    $("#min-max").html("Low <span id='low'>" + tMinC.toFixed(1) + "&deg;</span>C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High <span id='high'>" + tMaxC.toFixed(1) + "&deg;</span>C");
  } else {
    $("#temp").html(fTemp.toFixed(1) + "&deg;" + "<span onclick='switchTemp(this)' id='tempSwitcher'>F</span>");
    $("#min-max").html("Low <span id='low'>" + tMinF.toFixed(1) + "&deg;</span>F&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;High <span id='high'>" + tMaxF.toFixed(1) + "&deg;</span>F");
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function toCelsius(temp) {
  return (temp - 32) * 5 / 9;
}