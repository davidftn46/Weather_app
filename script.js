const apiKey = "224e31d17eaf03078f604d38cc40c664";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status === 404){

        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    
    }else{

        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " mbar";

        const currentTime = Date.now()/1000;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        let isDayTime = currentTime >= sunrise && currentTime < sunset;

        if(data.weather[0].main === "Clouds"){
            if(isDayTime){
                weatherIcon.src = "Images/clouds.png"
            }else{
                weatherIcon.src = "Images/night_clouds.png"
            }

        }else if(data.weather[0].main === "Clear"){
            if(isDayTime){
                weatherIcon.src = "Images/clear.png"
            }else{
                weatherIcon.src = "Images/night_clear.png"
            }
            
        }else if(data.weather[0].main === "Rain"){
            if(isDayTime){
                weatherIcon.src = "Images/rain.png"
            }else{
                weatherIcon.src = "Images/night_rain.png"
            }

        }else if(data.weather[0].main === "Drizzle"){
            if(isDayTime){
                weatherIcon.src = "Images/drizzle.png"
            }else{
                weatherIcon.src = "Images/night_drizzle.png"
            }

        }else if(data.weather[0].main === "Mist"){
            if(isDayTime){
                weatherIcon.src = "Images/mist.png"
            }else{
                weatherIcon.src = "Images/night_mist.png"
            }

        }else if(data.weather[0].main === "Snow"){
            if(isDayTime){
                weatherIcon.src = "Images/snow.png"
            }else{
                weatherIcon.src = "Images/night_snow.png"
            }
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    console.log(data);

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})