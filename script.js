var format24Hours = true;
var isDarkMode = false;
const themeButton = document.getElementById("theme-button");

function toggleFormat() {
  format24Hours = !format24Hours;
  updateClock();
}

function updateClock() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();

  if (!format24Hours) {
    var ap = hr < 12 ? "<span>AM</span>" : "<span>PM</span>";
    hr = hr == 0 ? 12 : hr;
    hr = hr > 12 ? hr - 12 : hr;
  } else {
    var ap = "";
  }

  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);

  var clockText = hr + ":" + min + ":" + sec + " " + ap;
  document.getElementById("clock").innerHTML = clockText;

  var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
  document.getElementById("date").innerHTML = date;

  setTimeout(updateClock, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function setThemeButtonBackground() {
  themeButton.classList.toggle("sun", isDarkMode);
  themeButton.classList.toggle("moon", !isDarkMode);
}

function toggleDarkMode() {
  isDarkMode = true;
  document.body.classList.add("dark-mode");
  setThemeButtonBackground();
}

function toggleLightMode() {
  isDarkMode = false;
  document.body.classList.remove("dark-mode");
  setThemeButtonBackground();
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    toggleDarkMode();
  } else {
    toggleLightMode();
  }
}

const toggle = document.getElementById("toggle-btn");
const checkbox = toggle.querySelector('input[type="checkbox"]');
const toggleText = toggle.querySelector(".toggle-text");

function handleToggle() {
  toggleText.classList.toggle("active");
  toggleFormat();
}

checkbox.addEventListener("change", handleToggle);
themeButton.addEventListener("click", toggleTheme);

// Set initial theme button background
setThemeButtonBackground();

// Update the clock immediately on page load
updateClock();