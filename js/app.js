
//once the page is ready
$(document).ready(function(){

  //***2*** if successful
  function success(position){
    //log out the coordinates
    console.log(position.coords.latitude, position.coords.longitude);
    //append the script that calls the position with a callback function
    $("body").append('<script src="https://api.forecast.io/forecast/fe9c276ea1426373c227b6df6c8f3b6f/' + position.coords.latitude + ',' + position.coords.longitude + '?callback=showInformation"></script>');
  }

  //***3*** if unsuccessful
  function error(){
    //enough said
    console.log("shit.")
  }

  //***1*** get the position of the device
  navigator.geolocation.getCurrentPosition(success, error);

  //***1*** fade in waiting
  $("#waiting").fadeIn(2000);
  $("#one").fadeIn(3000);
  $("#two").fadeIn(6000);
  $("#three").fadeIn(9000);
  $("#waiting").addClass("animated pulse")
  $("#waiting").css("display", "flex");

});

//this is the callback function that the script launches if successful
//***4***
function showInformation(APIdata){
  //***5*** Get the required DATA from the API

  console.log(APIdata);

  var currentTemp = Math.round(APIdata.currently.apparentTemperature);
  var currentStat = APIdata.currently.summary
  var minTemp = Math.round(APIdata.daily.data[0].apparentTemperatureMin);
  var maxTemp = Math.round(APIdata.daily.data[0].apparentTemperatureMax);
  var dailyStat = APIdata.daily.data[0].summary;
  var precip = APIdata.daily.data[0].precipProbability;
  var humidity = (APIdata.daily.data[0].humidity * 100) + " %"

  console.log(minTemp, maxTemp);

  $( "#waiting" ).remove();

  $("#tempuratureNow").text(currentTemp + "°");
  $("#nowSummary").text(currentStat);

  $("#tempuratureMinMax").text("low of " + minTemp + "° / high of " + maxTemp + "°");
  $("#daySummary").text(dailyStat);

  $("#precipitation").text(precip + " %");
  $("#humidity").text("Humidity: " + humidity);

  $("#main-container").css("display", "flex");
  $("#main-container").addClass("animated fadeInDown");

}


//NOTES: make an animation for while the user waits for the information to load from the API
