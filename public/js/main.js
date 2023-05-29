// date part

const day = document.getElementById("day");
const todayData = document.getElementById("today-data");
const d = new Date();

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day.innerText = weekdays[d.getDay()];

const month = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

todayData.innerText = `${d.getDate()} ${month[d.getMonth()]}`;

// weather part

const submitButton = document.getElementById("submitButton");
const cityName = document.getElementById("cityName");
const cityNamePrint = document.getElementById("city-name");
const tempVal = document.getElementById("temp-val");
const tempStatus = document.getElementById("temp-status");
const middleLayer = document.querySelector(".middle-layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityValue = cityName.value;
  if (cityValue == "") {
    cityNamePrint.innerText = "Please write the name before you search";
    middleLayer.classList.add("data-hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=a20c29b3c0a13041447e469ed635827c`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const arrData = [data];

      tempVal.innerText = arrData[0].main.temp;
      cityNamePrint.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

      const tempMood = arrData[0].weather[0].main;

      if (tempMood == "Clear") {
        tempStatus.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
      } else if (tempMood == "Clouds") {
        tempStatus.innerHTML = `<i class="fas fa-sun" style="color: #f1f2f6;"></i>`;
      } else if (tempMood == "Rain") {
        tempStatus.innerHTML = `<i class="fas fa-sun" style="color: #a4b0be;"></i>`;
      } else {
        tempStatus.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
      }

      middleLayer.classList.remove("data-hide");
    } catch {
      cityNamePrint.innerText = "Enter the correct city name";
      middleLayer.classList.add("data-hide");
    }
  }
};

submitButton.addEventListener("click", getInfo);
