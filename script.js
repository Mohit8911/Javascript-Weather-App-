async function getData() {
  var searchCity = document.getElementById("searchData").value.trim();
  if (!searchCity) {
    alert("Please input City name!");
    return;
  }

  var cityName = document.getElementById("cityName");
  var temp = document.getElementById("temp");
  var humidity = document.getElementById("humidity");
  var visibility = document.getElementById("visibility");
  var weatherImg = document.getElementById("weather-image");
  var sunrise = document.getElementById("sunrise");
  var sunset = document.getElementById("sunset");
  var wStatus = document.getElementById("status");

  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?APPID=f4869762404bfa13cd1893a72ba546a3&q=${searchCity},IN&units=metric`
  )
    .then((data) => data.json())
    .catch((data) => {});

  console.log(data);
  if (data.cod == "404") {
    alert(data.message);
    document.getElementById("searchData").value = "";
    return;
  }
  document.getElementById("data-container").style.display = "block";
  cityName.innerText = data.name;
  temp.innerText = data.main.temp;
  humidity.innerText = data.main.humidity;
  visibility.innerText = data.visibility;
  let date1 = new Date(data.sys.sunrise * 1000);
  sunrise.innerText = date1.toTimeString().slice(0, 8);
  let date2 = new Date(data.sys.sunset * 1000);
  sunset.innerText = date2.toTimeString().slice(0, 8);
  let status = data.weather[0].main;
  wStatus.innerText = status;
  weatherImg.src = `./resources/${status}.svg`;

}

let searchData = document.getElementById("searchData");
searchData.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getData();
  }
});
