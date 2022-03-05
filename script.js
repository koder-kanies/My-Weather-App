let weatherInfo = {
    apiKey: "0cea4727ee272bfdba05aa0017bc8eaf",

    fetchWeatherInfo: function (city) {
        let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey;

        fetch(apiUrl)
            .then((response) => (response.json()))
            .then((data) => this.displayWeatherInfo(data));
    },

    faren: function (temp) {
        let res = parseFloat(temp) * 9 / 5 + 32;
        return res.toFixed(2);
    },

    displayWeatherInfo: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { temp, humidity } = data.main;
        const { description, icon } = data.weather[0];
        const { speed } = data.wind;


        document.querySelector(".city").innerText = `${name},`;
        document.querySelector(".country").innerText = country;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".temp-cel").innerText = `${temp}°C`;
        document.querySelector(".temp-fah").innerText = `${this.faren(temp)}°F`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind Speed: ${speed} kmph`;

        document.querySelector(".weather").classList.remove("loading");
    },

    searchWeatherInfo: function () {
        let cityName = document.querySelector(".search-bar").value;
        this.fetchWeatherInfo(cityName);
    },

    fetchWeatherInfoByLocation: function (lon,lat) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0cea4727ee272bfdba05aa0017bc8eaf`)
                .then((response) => {
                    return response.json()})
                .then((data) => {
                    this.displayWeatherInfo(data);
                    });
        },
};

document.querySelector(".search-button").addEventListener("click", () => {
    weatherInfo.searchWeatherInfo();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weatherInfo.searchWeatherInfo();
    }
});

document.querySelector(".geo-button").addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    weatherInfo.fetchWeatherInfoByLocation(lon,lat);
    });
});


weatherInfo.fetchWeatherInfo("New Delhi");