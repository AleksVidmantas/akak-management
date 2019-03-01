window.onload = function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	
		weather_obj = JSON.parse(this.responseText);
       	weather = weather_obj.weather[0].description;
		
		document.getElementById("corvo_temp").innerHTML	= "The temperature in Corvallis is: " +Math.round( (((weather_obj.main.temp-273.15))*(9/5)+32)*10)/10 + "F."
	}
	console.log("window.onload for index called");
	url = "http://api.openweathermap.org/data/2.5/weather?id=5720727&APPID=c477b603d513a5812c159b5a6c24ace2"
	xhttp.open("GET", url, true);
	xhttp.send();
}
