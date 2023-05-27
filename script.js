const api = '71780eded85c0ac817306ce131af193f';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const tempF = document.querySelector('.f');



window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = convertToCelsius(temp);

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(1)} °C`;
          
          const sunriseTime = sunriseGMT.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});

          sunriseDOM.textContent = `${sunriseTime}`;
          sunriseDOM.textContent = sunriseDOM.textContent.split(',')[1];
          const sunsetTime = sunsetGMT.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
          sunsetDOM.textContent = `${sunsetTime}`;
          const y = sunsetDOM.textContent.split(',');
          sunsetDOM.textContent = y[1];
          document.getElementById('date').innerHTML = y[0];
          tempF.textContent = `${fahrenheit.toFixed(1)} °F`;
        });
    });
  }
})

function convertToCelsius(tempCelsius) {
  return (tempCelsius * 9) / 5 + 32;
}
function convertToFahrenheit(tempFahrenheit) {
  return (tempFahrenheit - 32) * (5 / 9);
}

function toCelsiusFahrenheit(){
  var t = document.getElementById('ctf').innerHTML;
  if(t.endsWith('C'))
    t = convertToCelsius(t);
  else {
    document.getElementById('ctf').innerHTML = convertToFahrenheit(tempC);
  }
}
