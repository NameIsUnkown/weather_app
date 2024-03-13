const searchBtn = document.querySelector(".searchButton");
const weatherIcon = document.querySelector(".weather-icon");

const weatherIcons = {
    "Clear": "Assets/Clear.png",
    "Clouds": "Assets/Clouds.png",
    "Drizzle": "Assets/Drizzle.png",
    "Mist": "Assets/Mist.png",
    "Rain": "Assets/Rain.png",
    "Snow": "Assets/Snow.png",
    "Wind": "Assets/Wind.png",
};

let cityName = "";

const apiKey = "37cde44c229815c0d78d37ae14a72954";

let apiUrl = "";

searchBtn.addEventListener('click', async () => {
    cityName = document.querySelector(".cityText").value.trim(); // Use value instead of textContent for input fields
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }
    await checkWeather(cityName);
});

async function checkWeather(cityName) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();
		
        const weatherCondition = data.weather[0].main;
        const weatherIconPath = weatherIcons[weatherCondition];

        if (weatherIconPath) {
            weatherIcon.src = weatherIconPath;
        } else {
            console.error('Weather icon not found for:', weatherCondition);
        }



		console.log(data);
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}
