const APIKEY = 'aeacfd354b39d8dcfbab6ac0140b196b';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url){
    return fetch(url).then(response => response.json());
}


async function getWeatherByCoords(lat, lon) {
    const url = URLBASE + `lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
    const data = await request(url);
    updateDOM(data.main.temp, data.name);
}

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    const url = URLBASE + `q=${city}&appid=${APIKEY}&units=metric`;
    const data = await request(url);

    if (data.cod === "404") {
        alert("No se encontro la ciudad. Intenta de nuevo.");
        return;
    }
    
    updateDOM(data.main.temp, data.name);
}

function updateDOM(temperature, cityName) {
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("cityName").textContent = cityName;
}

navigator
    .geolocation
    .getCurrentPosition(positions => {
        const lat = positions.coords.latitude;
        const lon = positions.coords.longitude;
        getWeatherByCoords(lat, lon);
    })