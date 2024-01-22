const APIKEY = 'aeacfd354b39d8dcfbab6ac0140b196b';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url){
    return fetch(url).then(result => result.jason());
}


async function getClima(lat, lon){
    const url = URLBASE + `lat=${ lat }&lon=${ lon }&appid=${ APIKEY }`;
    const data = await request(url);
    console.log("Temperatura: ", data.main.temp);
    console.log("Ciudad: ", data.name);
    updateDom(data.main.temp, data.name);
}

navigator
    .geolocation
    .getCurrentPosition(positions => {
        const lat = positions.coords.latitude;
        const lon = positions.coords.longitude;
        getClima(lat, lon);
    })