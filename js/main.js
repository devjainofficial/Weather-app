// Global variables
const app = {};
app.API_BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

app.intervalId = null // This variable will be used to clear setInterval each time the user change the time zone

// DOM elements
app.elements = {
  city: document.getElementById('city'),
  country: document.getElementById('country'),
  searchCity: document.getElementById('search'),
  cityTemp: document.getElementById('temp'),
  weatherIcon: document.getElementById('weather-icon'),
  weatherDescription: document.getElementById('description'),
  weatherPressure: document.getElementById('pressure'),
  weatherVisibility: document.getElementById('visibility'),
  weatherHumidity: document.getElementById('humidity'),
  sunriseTime: document.getElementById('sunrise-time'),
  sunsetTime: document.getElementById('sunset-time'),
  uviRays: document.getElementById('uvi-rays'),
  uviConcernLevel: document.querySelector('.uvi-level'),
  uviConcernLevel2: document.querySelector('.uvi-level2'),
  hoursIcon: document.querySelectorAll('.hourly-icon'),
  hoursTemp: document.querySelectorAll('.hours-temp'),
  daysIcon: document.querySelectorAll('.days-icon'),
  nextDay: document.querySelectorAll('.prediction-day'),
  predictionDesc: document.querySelectorAll('.prediction-desc'),
  daysTemp: document.querySelectorAll('.days-temp'),
  currentTime: document.querySelector('.time'),
  currentDate: document.querySelector('.date'),
  aqi: document.querySelector('.aqi'),
  hamburger: document.querySelector('.hamburger'),
  slidebar: document.querySelector('.slidebar'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  darkModeText: document.getElementById('darkModeText'),
  modalOkButton: document.getElementById('modalOkButton'),
};

app.monthName = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

app.weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

app.displayErrorMessage = function(message, isVisible) {
    const errorContainer = document.getElementById('error-message-container');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = isVisible ? 'block' : 'none';
    }
};

// Main weather functionality
async function getWeatherReport(searchCity) {
  try {
    app.displayErrorMessage('', false);
    const response = await fetch(`${app.API_BASE_URL}?key=${API_KEY}&q=${searchCity}&days=7&aqi=yes&alerts=no`);
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    app.displayErrorMessage('Could not fetch weather data. Please check the city name or your internet connection and try again.', true);
  }
}

// function to ask and get current location
app.updateCurrentLocation = function() {
  // callback for location api after successfully fetching current position
  function successPosition(position) {
    app.displayErrorMessage('', false);
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const cityParams = `${lat},${long}`
    getWeatherReport(cityParams)
  }

  // callback for location api after error on fetching current position
  function errorPosition() {
    app.displayErrorMessage('Unable to detect your location. Please ensure location services are enabled in your browser and try again, or search for a city manually.', true);
  }

  // main location permission
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successPosition, errorPosition)
  }
}

function updateWeatherUI(data) {
  updateCurrentWeather(data);
  updateHourlyForecast(data);
  updateDailyForecast(data);
  updateTime(data.location.tz_id);
}

function updateCurrentWeather(data) {
  app.elements.city.textContent = data.location.name;
  app.elements.country.innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i>${data.location.country}`;
  app.elements.cityTemp.textContent = data.current.temp_c;
  app.elements.weatherDescription.textContent = data.current.condition.text;
  app.elements.weatherIcon.src = data.current.condition.icon;
  app.elements.weatherPressure.textContent = `${data.current.pressure_mb}mb`;
  app.elements.weatherVisibility.textContent = `${data.current.vis_km} km`;
  app.elements.weatherHumidity.textContent = `${data.current.humidity}%`;
  app.elements.sunriseTime.textContent = data.forecast.forecastday[0].astro.sunrise;
  app.elements.sunsetTime.textContent = data.forecast.forecastday[0].astro.sunset;
  app.elements.uviRays.textContent = `${data.current.uv} UVI`;
  updateUVIndex(data.current.uv);
}

function updateUVIndex(uvIndex) {
  const uvLevels = [
    { max: 2, level: 'Good', color: '#6ae17c' },
    { max: 5, level: 'Moderate', color: '#CCE16A' },
    { max: 7, level: 'High', color: '#d4b814' },
    { max: 10, level: 'Very high', color: '#d43114' },
    { max: Infinity, level: 'Extreme high', color: '#dc15cf' }
  ];

  const { level, color } = uvLevels.find(item => uvIndex <= item.max);
  app.elements.uviConcernLevel.textContent = level;
  app.elements.uviConcernLevel.style.backgroundColor = color;
  app.elements.uviConcernLevel2.textContent = level;
}

function updateHourlyForecast(data) {
  app.elements.hoursTemp.forEach((t, i) => {
    t.textContent = data.forecast.forecastday[0].hour[i].temp_c;
  });

  app.elements.hoursIcon.forEach((t, i) => {
    t.src = data.forecast.forecastday[0].hour[i].condition.icon;
  });
}

function updateDailyForecast(data) {
  app.elements.daysIcon.forEach((icon, index) => {
    icon.src = data.forecast.forecastday[index].day.condition.icon;
  });

  app.elements.daysTemp.forEach((temp, index) => {
    const day = data.forecast.forecastday[index].day;
    temp.innerHTML = `${Math.round(day.maxtemp_c)}°c<span> / </span>${Math.round(day.mintemp_c)}°c`;
  });

  app.elements.predictionDesc.forEach((d, index) => {
    d.textContent = data.forecast.forecastday[index].day.condition.text;
  });

  app.elements.nextDay.forEach((day, index) => {
    const date = new Date(data.forecast.forecastday[index].date);
    day.textContent = `${app.weekDays[date.getDay()]} ${date.getDate()}`;
  });
}

function updateTime(timezone) {
  clearInterval(app.intervalId); // To prevent displaying multi times at the same time.
  const updateClock = () => {
    const now = new Date();
    const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    // Check if timezone is valid
    if (timezone) {
      const localTime = now.toLocaleTimeString('en-US', options);
      app.elements.currentTime.textContent = localTime;
    } else {
      app.elements.currentTime.textContent = "Invalid timezone"; // Handle invalid timezone
    }
  };

  updateClock();
  app.intervalId = setInterval(updateClock, 1000);

  // Setting the date based on timezone
  const today = new Date(); // Get the current date in UTC
  if (timezone) {
    today.toLocaleString('en-US', { timeZone: timezone });
  }
  app.elements.currentDate.textContent = `${today.getDate()} ${app.monthName[today.getMonth()]} ${today.getFullYear()}, ${app.weekDays[today.getDay()]}`;
}


// Event listeners
app.elements.hamburger.addEventListener('click', () => {
  app.elements.hamburger.classList.toggle('active');
  app.elements.slidebar.classList.toggle('active');
});

document.querySelector('.search-area button').addEventListener('click', () => {
  getWeatherReport(app.elements.searchCity.value);
});

app.elements.searchCity.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeatherReport(app.elements.searchCity.value);
  }
});

// Dark mode functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelector('.slidebar').classList.toggle('dark-mode');
}

app.elements.darkModeToggle.addEventListener('change', function () {
  toggleDarkMode();
  const isDarkMode = document.body.classList.contains('dark-mode');
  app.elements.darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : null);
});

// Initialize dark mode from local storage
if (localStorage.getItem('dark-mode') === 'enabled') {
  toggleDarkMode();
  app.elements.darkModeToggle.checked = true;
  app.elements.darkModeText.textContent = 'Light Mode';
}

// Initialize weather app with default city
getWeatherReport('New Delhi');

if (app.elements.modalOkButton) { // Check if the element exists
    app.elements.modalOkButton.addEventListener('click', () => {
        app.updateCurrentLocation();
        // Assuming closeModal is a global function from modal.js
        if (typeof closeModal === 'function') {
            closeModal(true);
        } else {
            console.error('closeModal function not found. Ensure modal.js is loaded and closeModal is global.');
        }
    });
}