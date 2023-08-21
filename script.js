let weatherData = {};

const infoView = document.querySelector('#info');
const inputField = document.querySelector('#city');
const button = document.querySelector('#submit');

const getWeather = async (city) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=fd33c5279a794bcea13230935231808&q=${city}&aqi=no`)
    const data = await response.json();
    return filter(data);
}

const filter = (data) => {
    const filteredData = {};
    filteredData["city"] = data["location"]["name"];
    filteredData["country"] = data["location"]["country"];
    filteredData["temp_c"] = data["current"]["temp_c"];
    filteredData["temp_f"] = data["current"]["temp_f"];
    filteredData["feelslike_c"] = data["current"]["feelslike_c"];
    filteredData["feelslike_f"] = data["current"]["feelslike_f"];
    filteredData["condition_text"] = data["current"]["condition"]["text"];
    filteredData["condition_icon"] = data["current"]["condition"]["icon"];
    return filteredData;
}

button.addEventListener('click', () => {
    getWeather(inputField.value)
    .then((data) => {
        weatherData = data;
        const icon = document.createElement('img');
        icon.src = weatherData["condition_icon"];
        infoView.querySelector('#temperature').textContent = `${weatherData["temp_c"]} °c`;
        infoView.querySelector('#temperature').append(icon);
        infoView.querySelector('#city-country').textContent = `${weatherData["city"]}, ${weatherData["country"]}`;
        infoView.querySelector('#feelslike').textContent = `Feels like ${weatherData["feelslike_c"]} °c`;
        infoView.querySelector('#condition').textContent = `${weatherData["condition_text"]}`;

    })
    .catch((error) => {
        alert('There has been an error\nTry again');
        console.log(error);
    })
})