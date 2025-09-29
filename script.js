const inputName = document.getElementById("inputName");
const weatherBtn = document.getElementById("weatherBtn")

const imgElement = document.getElementById("weatherImg");
const loading = document.getElementById("loading");
const weatherInfo = document.getElementById("weatherInfo")

const loc = document.getElementById("location");
const temp = document.getElementById("temp");
const tempInF = document.getElementById("tempInF");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");



inputName.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        getinput();
    }
})
weatherBtn.addEventListener("click", getinput);


function getinput(){
    const placeName = inputName.value.toLowerCase();
    if(!placeName){
        window.alert("Enter the Location");
    }
    else{
        getWeatherData(placeName);
        loading.classList.add("loading");
        weatherInfo.style.display = "none";
    }
}

async function getWeatherData(city){
    try {
        const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=59b10cd28ee04b10a47134230252809&q=${city}&aqi=yes`
        );
        if (!response.ok) {
        throw new Error("Could Not Fetch Data");
        }
        const data = await response.json();
        console.log(data);
        displayData(data);
    }
    catch (error) {
        console.error(error);
        loading.classList.remove("loading");
        loc.textContent = "Location Not Found";
        temp.textContent = ``;
        tempInF.textContent = ``;
        humidity.textContent = ``;
        condition.textContent = ``;
        imgElement.style.display = "none";
    }
    finally{
        loading.classList.remove("loading");
        weatherInfo.style.display = "flex";
    }
}

function displayData(data){
    loc.textContent = data.location.name;
    temp.textContent = `${data.current.temp_c}°C`;
    tempInF.textContent = `${data.current.temp_f}°F`;
    humidity.textContent = `💧Humidity: ${data.current.humidity}%`;
    condition.textContent = `${data.current.condition.text}`;
    imgElement.src = data.current.condition.icon;
    imgElement.style.display = "block";
    weatherInfo.style.display = "flex";
}