import { api_key, api_url } from "./api.js"
const apikey = api_key
const apiurl = api_url
const input_search = document.querySelector(".search input")
const defaultCity = input_search.value ? input_search.value : "lucknow"
const btn = document.querySelector(".search button")
const wIcon = document.querySelector(".w-icon")
const loader=document.querySelector(".container")


async function weather(cityinfo) {
    const call = await fetch(apiurl + cityinfo + `&appid=${apikey}`)
    const data = await call.json()
    if (call.status !== 404) {
        document.querySelector(".error-msg p").style.display = "none"
        showWeather(data)
    }
    else error()
}

weather(defaultCity)


function showWeather(data){
    loader.style.display="none"
    
    document.querySelector(".feelslike").innerHTML = Math.floor(data.main.feels_like) + "°"
    document.querySelector(".weather h1").innerHTML = Math.round(data.main.temp) + "°"
    document.querySelector(".weather h2").innerHTML = data.name + " , " + data.sys.country
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".windspeed").innerHTML = Math.round(((data.wind.speed) * 18) / 5) + " km/h"
    document.querySelector(".visibility").innerHTML = data.visibility / 1000 + " km"
    
    const timezone = 'Asia/Kolkata';
    // sunrise
    let sunrise = data.sys.sunrise
    let sunriseDate = new Date(sunrise * 1000)
    const sunriseTime = sunriseDate.toLocaleString('en-IN', { timeZone: timezone, hour: 'numeric', minute: 'numeric', hour12: true });
    document.querySelector(".sunrise").innerHTML = sunriseTime

    // sunset
    let sunset = data.sys.sunset
    let sunsetDate = new Date(sunset * 1000)
    const sunsetTime = sunsetDate.toLocaleString('en-IN', { timeZone: timezone, hour: 'numeric', minute: 'numeric', hour12: true });
    document.querySelector(".sunset").innerHTML = sunsetTime

    switch (data.weather[0].main) {
        case "Haze": wIcon.src = "images/clear.png"
            break
        case "Clear": wIcon.src = "images/clouds.png"
            break
        case "Clouds": wIcon.src = "images/clouds.png"
            break
        case "Drizzle": wIcon.src = "images/drizzle.webp"
            break
        case "Mist": wIcon.src = "images/mist.png"
            break
        case "Rain": wIcon.src = "images/rain.png"
            break
        case "Snow": wIcon.src = "images/snow.webp"
            break
    }
}

function error() {
    document.querySelector(".error-msg p").style.display = "block"
    document.querySelector(".feelslike").innerHTML = "--"
    document.querySelector(".weather h2").innerHTML = "--"
    document.querySelector(".weather h1").innerHTML = "--"
    document.querySelector(".humidity").innerHTML = "--"
    document.querySelector(".windspeed").innerHTML = "--"
    document.querySelector(".visibility").innerHTML = "--"
    document.querySelector(".sunrise").innerHTML = "--"
    document.querySelector(".sunset").innerHTML = "--"
}


btn.addEventListener("click", function () {
    loader.style.display="block"
    weather(input_search.value)
})







