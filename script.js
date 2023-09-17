import {api_key,api_url} from "./api.js"
const apikey = api_key
const apiurl = api_url
const input_search = document.querySelector(".search input")
const btn = document.querySelector(".search button")
const wIcon = document.querySelector(".w-icon")

async function weather(cityinfo) {
    const call = await fetch(apiurl + cityinfo + `&appid=${apikey}`)
    if (call.status == 404) {
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


    else {
        if (call.status != 404) {
            document.querySelector(".error-msg p").style.display = "none"
        }
        const data = await call.json()
        // console.log(data)

        document.querySelector(".feelslike").innerHTML = Math.floor(data.main.feels_like) + "°"
        document.querySelector(".weather h1").innerHTML = Math.round(data.main.temp) + "°"
        document.querySelector(".weather h2").innerHTML = data.name+" , "+data.sys.country
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".windspeed").innerHTML = Math.round(((data.wind.speed) * 18) / 5) + " km/h"
        document.querySelector(".visibility").innerHTML = data.visibility / 1000 + " km"
        document.querySelector(".sunrise").innerHTML = Math.floor(((data.sys.sunrise) / 1000) / 3660) % 24 + ":" + Math.floor(((data.sys.sunrise) / 1000) / 60) % 60 + " am"
        document.querySelector(".sunset").innerHTML = Math.floor(((data.sys.sunset) / 1000) / 3660) % 24 + ":" + Math.floor(((data.sys.sunset) / 1000) / 60) % 60 + " pm"
        if (data.weather[0].main == "Haze") {
            wIcon.src = "images/haze.png"
        }
        else if (data.weather[0].main == "Clear") {
            wIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Clouds") {
            wIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            wIcon.src = "images/drizzle.webp"
        }
        else if (data.weather[0].main == "Mist") {
            wIcon.src = "images/mist.png"
        }
        else if (data.weather[0].main == "Rain") {
            wIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Snow") {
            wIcon.src = "images/snow.webp"
        }
    }

}

btn.addEventListener("click", function () {
    weather(input_search.value)
})
