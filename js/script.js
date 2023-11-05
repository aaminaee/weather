let input = document.getElementById("search");
let btn = document.getElementById("btn");
let cityNameOut = document.getElementById("city");
let description = document.getElementById("des");
let windSpeed = document.getElementById("wind");
let tempOut = document.getElementById("temp");
let img1 = document.getElementById("sun");
let img2 = document.getElementById("rain");
let img3 = document.getElementById("cloud");
let img4 = document.getElementById("snow");
let div = document.getElementById("res");
let mouse = document.getElementById("test");
let body = document.getElementById("body");

const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
async function getWeather() {
  var weatherResult = await (
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
      ${input.value}&appid=${apiKey}`)
  ).json();
  setInfo(weatherResult);
  console.log(weatherResult);
}
function converToCel(value) {
  return (value - 273).toFixed(2);
}
function setInfo(data) {
  var cityName = data["name"];
  var desc = data["weather"][0]["description"];
  var temp = data["main"]["temp"];
  var wind = data["wind"]["speed"];
  cityNameOut.innerHTML = `City: ${cityName}`;
  description.innerHTML = `description: ${desc}`;
  tempOut.innerHTML = `temprature: ${converToCel(temp)}`;
  windSpeed.innerHTML = `wind speed: ${wind} km/h`;
  div.style.display = "block";
  if (data["weather"][0]["main"] === "Clear") {
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
  } else if (data["weather"][0]["main"] === "Rain") {
    img2.style.display = "block";
    img1.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
  } else if (data["weather"][0]["main"] === "Cloud" || "Haze") {
    img3.style.display = "block";
    img1.style.display = "none";
    img2.style.display = "none";
    img4.style.display = "none";
  } else if (data["weather"][0]["main"] === "Snow") {
    img4.style.display = "block";
    img1.style.display = "none";
    img2.style.display = "none";
    img3.style.display = "none";
  } else {
    console.log("error");
  }
}
btn.addEventListener("click", getWeather);
body.addEventListener("mousemove", (e) => {
  mouse.style.top = `${e.clientY}px`;
  mouse.style.left = `${e.clientX}px`;
});
btn.addEventListener("mouseenter", () => {
  mouse.style.display = "none";
});
btn.addEventListener("mouseleave", () => {
  mouse.style.display = "block";
});
input.addEventListener("mouseenter", () => {
  mouse.style.display = "none";
});
input.addEventListener("mouseleave", () => {
  mouse.style.display = "block";
});
