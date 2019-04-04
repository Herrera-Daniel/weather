/*Simple function to validate zip code as 5 digit number*/
function zipCheck(zip) {
    var regex = /^\d{5}$/  //Define regexp string
    if (regex.test(zip) && zip != "00000") {  //Validate string
        return true
    }
    else {
        alert("Please enter a valid zipcode.")  //Alert user if zipcode is invalid
        return false
    }
}
/*Function to retreive api data*/
function getWeather() {
    clearElements()
    var zip = document.getElementById("zipcode").value  //Retrieve zipcode from user
    if (zipCheck(zip)) {
        fetch("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&appid=cb84c09f90fda0da9231d0989f6977bd&units=imperial")  //Request data from API
            .then(function (data) { return data.json(); })  //Retrieve json object
            .then(function (myJson) {
                drawLocation(myJson)  //Draw elements in order
                drawIcon(myJson)
                drawText(myJson)
            })

    }
}
/*Function to generate location heading*/
function drawLocation(myJson){
    var element = document.getElementById("weather")  //Generate elements
    var location = document.createElement("h2")
    location.appendChild(document.createTextNode("Location: " + myJson.name))  //Append elements with content
    element.appendChild(location)  //Append elements to div element
}
/*Function to generate weather text*/
function drawText(myJson) {
    var element = document.getElementById("weather")  //Generate elements
    var temperature = Math.round(Number(myJson.main.temp))  //Get temp and round it
    var temp = document.createElement("h2")
    var humidity = document.createElement("h2")
    var description = document.createElement("h2")
    var textDiv = document.createElement("div")
    textDiv.className = "weatherText"  
    element.appendChild(textDiv)   //Append elements with content
    temp.appendChild(document.createTextNode("Temp: " + temperature + " \xB0" + "F"))
    humidity.appendChild(document.createTextNode("Humidity: " + myJson.main.humidity + "%"))
    description.appendChild(document.createTextNode(myJson.weather[0].description.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')))
    textDiv.appendChild(description)  //Append elements to div element
    textDiv.appendChild(temp)
    textDiv.appendChild(humidity)
}
/*Function to generate weather icon*/
function drawIcon(myJson) {
    var element = document.getElementById("weather")  //Generate elements
    var weatherIcon = document.createElement("div")
    var weatherDesc = document.createElement("div")
    var weatherClass = document.createElement("div")
    weatherIcon.className = "weatherIcon"
    weatherDesc.className = getIcon(myJson)  //Retrieve weather desription from json object
    weatherClass.className = "inner"
    element.appendChild(weatherIcon)  //Append elements to div element
    weatherIcon.appendChild(weatherDesc)
    weatherDesc.appendChild(weatherClass)
}
/*Function to clear html elements before re-generating them*/
function clearElements() {
    if (document.getElementById("weather") == null) {
        return
    }
    else {
        document.getElementById("weather").innerHTML = ""
    }
}
/*Function to retreive correct weather icon*/
function getIcon(myJson){
    if (myJson.weather[0].description == "few clouds" || myJson.weather[0].description == "scattered clouds"){
        return "partlycloudy"
    }
    else if (myJson.weather[0].description == "broken clouds"){
        return "mostlycloudy"
    }
    else if(myJson.weather[0].description == "overcast clouds"){
        return "cloudy"
    }
    else if(myJson.weather[0].description == "clear sky"){
        return "clear"
    }
    else if(myJson.weather[0].description == "thunderstorm with light rain" || myJson.weather[0].description == "thunderstorm with rain" 
    || myJson.weather[0].description == "thunderstorm with heavy rain" || myJson.weather[0].description == "light thunderstorm"
    || myJson.weather[0].description == "thunderstorm" || myJson.weather[0].description == "heavy thunderstorm" || myJson.weather[0].description == "ragged thunderstorm" 
    || myJson.weather[0].description == "thunderstorm with light drizzle" || myJson.weather[0].description == "thunderstorm with drizzle" || myJson.weather[0].description == "thunderstorm with heavy drizzle"){
        return "tstorms"
    }
    else if(myJson.weather[0].description == "light snow" || myJson.weather[0].description == "snow" || myJson.weather[0].description == "heavy snow"){
        return "snow"
    }
    else if(myJson.weather[0].description == "sleet" || myJson.weather[0].description == "light shower sleet" || myJson.weather[0].description == "shower sleet"
    || myJson.weather[0].description == "light rain and snow" || myJson.weather[0].description == "rain and snow" || myJson.weather[0].description == "light shower snow"
    || myJson.weather[0].description == "shower snow" || myJson.weather[0].description == "heavy shower snow"){
        return "sleet"
    }
    else if(myJson.weather[0].description == "mist" || myJson.weather[0].description == "smoke" || myJson.weather[0].description == "haze"
    || myJson.weather[0].description == "sand/dust whirls" || myJson.weather[0].description == "fog" || myJson.weather[0].description == "sand"
    || myJson.weather[0].description == "dust" || myJson.weather[0].description == "volcanic ash" || myJson.weather[0].description == "squalls"
    || myJson.weather[0].description == "tornado"){
        return "fog"
    }
    else{
        return "rain"
    }
}




