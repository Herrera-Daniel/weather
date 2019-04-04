/*Simple function to validate zip code as 5 digit number*/
function zipCheck(zip) {
    var regex = /^\d{5}$/  //Define regexp string
    if (regex.test(zip) && zip != "00000") {  //Validate string
        return true
    }
    else {
        clearElements()
        drawInvalidZip()
        return false   //Return False if invalid zipcode
    }
}
function getLocationKey() {
    var zip = document.getElementById("zipcode").value  //Retrieve zipcode from user
    var location;
    var locationkey;
    var usZip = false;
    if (zipCheck(zip)) {
        fetch("http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=1zGOaKyKxS4Os4itr9J8w0rZddeOK3XM&q=" + zip + "&language=en-us&details=true")  //Request data from API
            .then(function (data) { return data.json(); })  //Retrieve json object
            .then(function (myJson) {
                myJson.forEach(element => {
                    if (element.Country.ID == "US") {
                        location = element.LocalizedName
                        locationkey = element.Key
                        getWeather(locationkey)
                        drawLocation(location)
                        usZip = true
                    }
                });
                if (usZip == false) {
                    clearElements()
                    drawZipNotFound()
                }
            })
    }
    console.log(usZip)

}
/*Function to retreive api data*/
function getWeather(locationkey) {
    clearElements()
    fetch("http://dataservice.accuweather.com/currentconditions/v1/" + locationkey + "?apikey=1zGOaKyKxS4Os4itr9J8w0rZddeOK3XM&language=en-us&details=true")  //Request data from API
        .then(function (data) { return data.json(); })  //Retrieve json object
        .then(function (myJson) {
            drawIcon(myJson[0].WeatherText)    //Draw elements in order
            drawText(myJson)
        })
}
/*Function to generate location heading*/
function drawLocation(locationName) {
    var element = document.getElementById("weather")  //Generate elements
    var location = document.createElement("h2")
    location.appendChild(document.createTextNode("Location: " + locationName))  //Append elements with content
    element.appendChild(location)  //Append elements to div element
}
/*Function to generate weather text*/
function drawText(myJson) {
    var element = document.getElementById("weather")  //Generate elements
    var temperature = Math.round(Number(myJson[0].Temperature.Imperial.Value))  //Get temp and round it
    var temp = document.createElement("h2")
    var humidity = document.createElement("h2")
    var description = document.createElement("h2")
    var textDiv = document.createElement("div")
    textDiv.className = "weatherText"
    element.appendChild(textDiv)   //Append elements with content
    temp.appendChild(document.createTextNode("Temp: " + temperature + " \xB0" + "F"))
    humidity.appendChild(document.createTextNode("Humidity: " + myJson[0].RelativeHumidity + "%"))
    description.appendChild(document.createTextNode(myJson[0].WeatherText.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')))
    textDiv.appendChild(description)  //Append elements to div element
    textDiv.appendChild(temp)
    textDiv.appendChild(humidity)
}
/*Function to generate weather icon*/
function drawIcon(weatherText) {
    var element = document.getElementById("weather")  //Generate elements
    var weatherIcon = document.createElement("div")
    var weatherDesc = document.createElement("div")
    var weatherClass = document.createElement("div")
    weatherIcon.className = "weatherIcon"
    weatherDesc.className = weatherText  //Retrieve weather desription from json object
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
function drawInvalidZip() {
    var element = document.getElementById("weather")  //Generate elements
    var message = document.createElement("h2")
    message.appendChild(document.createTextNode("Please enter a 5 digit zipcode."))
    element.appendChild(message)

}
function drawZipNotFound() {
    var element = document.getElementById("weather")  //Generate elements
    var message = document.createElement("h2")
    message.appendChild(document.createTextNode("Location not found. Please try again."))
    element.appendChild(message)
}
/*Function to retreive correct weather icon*/
function getIcon(myJson) {
    if (myJson[0].WeatherText.toLowerCase in ["partly sunny", "intermittent clouds"]) {
        return "partlycloudy"
    }
    else if (myJson[0].WeatherText.toLowerCase == "mostly cloudy") {
        return "mostlycloudy"
    }
    else if (myJson[0].WeatherText.toLowerCase in ["cloudy", "dreary"]) {
        return "cloudy"
    }
    else if (myJson[0].WeatherText.toLowerCase in ["sunny", "mostly Sunny", "clear", "mostly clear"]) {
        return "clear"
    }
    else if (myJson[0].WeatherText.toLowerCase in ["T-Storms", "mostly cloudy w/ t-storms", "partly sunny w/ t-storms"]) {
        return "tstorms"
    }
    else if (myJson[0].WeatherText in ["snow", "mostly cloudy w/snow"]) {
        return "snow"
    }
    else if (myJson[0].WeatherText in ["sleet", "freezing rain", "ice", "rain and snow"]) {
        return "sleet"
    }
    else if (myJson[0].WeatherText in ["flurries", "mostly cloudy w/ flurries", "partly sunny w/ flurries"]) {
        return "flurries"
    }
    else if (myJson[0].WeatherText in ["fog", "hazy sunshine"]) {
        return "fog"
    }
    else if (myJson[0].WeatherText in ["showers", "mostly cloudy w/ showers", "partly sunny w/ showers", "rain"]) {
        return "rain"
    }
}




