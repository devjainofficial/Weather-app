// Global variables
const API_KEY = 'da2103b2c4ce4f95af051626232503'; // Consider moving this to a secure environment variable
const API_BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

// DOM elements
const elements = {
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
  darkModeText: document.getElementById('darkModeText')
};

const monthName = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Main weather functionality
async function getWeatherReport(searchCity) {
  try {
    const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&q=${searchCity}&days=7&aqi=yes&alerts=no`);
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // TODO: Implement user-friendly error handling
  }
}

// function to ask and get current location
function updateCurrentLocation() {
  // callback for location api after successfully fetching current position
  function successPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const cityParams = `${lat},${long}`
    getWeatherReport(cityParams)
  }

  // callback for location api after error on fetching current position
  function errorPosition() {
    alert("Unable to detect location")
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
  elements.city.textContent = data.location.name;
  elements.country.innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i>${data.location.country}`;
  elements.cityTemp.textContent = data.current.temp_c;
  elements.weatherDescription.textContent = data.current.condition.text;
  elements.weatherIcon.src = data.current.condition.icon;
  elements.weatherPressure.textContent = `${data.current.pressure_mb}mb`;
  elements.weatherVisibility.textContent = `${data.current.vis_km} km`;
  elements.weatherHumidity.textContent = `${data.current.humidity}%`;
  elements.sunriseTime.textContent = data.forecast.forecastday[0].astro.sunrise;
  elements.sunsetTime.textContent = data.forecast.forecastday[0].astro.sunset;
  elements.uviRays.textContent = `${data.current.uv} UVI`;
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
  elements.uviConcernLevel.textContent = level;
  elements.uviConcernLevel.style.backgroundColor = color;
  elements.uviConcernLevel2.textContent = level;
}

function updateHourlyForecast(data) {
  elements.hoursTemp.forEach((t, i) => {
    t.textContent = data.forecast.forecastday[0].hour[i].temp_c;
  });

  elements.hoursIcon.forEach((t, i) => {
    t.src = data.forecast.forecastday[0].hour[i].condition.icon;
  });
}

function updateDailyForecast(data) {
  elements.daysIcon.forEach((icon, index) => {
    icon.src = data.forecast.forecastday[index].day.condition.icon;
  });

  elements.daysTemp.forEach((temp, index) => {
    const day = data.forecast.forecastday[index].day;
    temp.innerHTML = `${Math.round(day.maxtemp_c)}°c<span> / </span>${Math.round(day.mintemp_c)}°c`;
  });

  elements.predictionDesc.forEach((d, index) => {
    d.textContent = data.forecast.forecastday[index].day.condition.text;
  });

  elements.nextDay.forEach((day, index) => {
    const date = new Date(data.forecast.forecastday[index].date);
    day.textContent = `${weekDays[date.getDay()]} ${date.getDate()}`;
  });
}

function updateTime(timezone) {
  const updateClock = () => {
    const now = new Date();
    const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    // Check if timezone is valid
    if (timezone) {
      const localTime = now.toLocaleTimeString('en-US', options);
      elements.currentTime.textContent = localTime;
    } else {
      elements.currentTime.textContent = "Invalid timezone"; // Handle invalid timezone
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  // Setting the date based on timezone
  const today = new Date(); // Get the current date in UTC
  if (timezone) {
    today.toLocaleString('en-US', { timeZone: timezone });
  }
  elements.currentDate.textContent = `${today.getDate()} ${monthName[today.getMonth()]} ${today.getFullYear()}, ${weekDays[today.getDay()]}`;
}


// Event listeners
elements.hamburger.addEventListener('click', () => {
  elements.hamburger.classList.toggle('active');
  elements.slidebar.classList.toggle('active');
});

document.querySelector('.search-area button').addEventListener('click', () => {
  getWeatherReport(elements.searchCity.value);
});

elements.searchCity.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeatherReport(elements.searchCity.value);
  }
});

// Dark mode functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelector('.slidebar').classList.toggle('dark-mode');
}

elements.darkModeToggle.addEventListener('change', function () {
  toggleDarkMode();
  const isDarkMode = document.body.classList.contains('dark-mode');
  elements.darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : null);
});

// Initialize dark mode from local storage
if (localStorage.getItem('dark-mode') === 'enabled') {
  toggleDarkMode();
  elements.darkModeToggle.checked = true;
  elements.darkModeText.textContent = 'Light Mode';
}

// Initialize weather app with default city
getWeatherReport('New Delhi');