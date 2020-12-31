// DOM VARIABLES

date = new Date(); // Global date variable
date.toString().slice(0, 24);
$("#date").text(date);

//time = date.toLocaleTimeString(); // Global time variable

// JS VARIABLES
logArray = [];

// FUNCTION DEFINITIONS

$(document).ready(function () {
  randomImage();
  recall(); //Function call to display locally stored data
});

//This function retrieves items from localStorage
function recall() {
  for (i = 0; i < logArray.length; i++) {
      //  Items from local storage are displayed here
  var lastLog = JSON.parse(localStorage.getItem("Log"));

  console.log(lastLog);
  console.log(lastLog[i].Equipment);
  console.log(lastLog[i].Time);
  console.log(lastLog[i].Temperature);
  console.log(lastLog[i].Employee);
  // var equipmentLog = JSON.parse(lastLog[1].Equipment);
  // var timeLog = JSON.parse(localStorage.getItem(lastLog.Time));
  // var tempLog = JSON.parse(localStorage.getItem(lastLog.Temperature));
  // var nameLog = JSON.parse(localStorage.getItem(lastLog.Employee));

    $("#dataTable")
      .find("tbody")
      .append(
        $("<tr>").append(
          $("<td>").append([1 + i]),
          $("<td>").append(timeLog[i]),
          $("<td>").append(equipmentLog[i]),
          $("<td>").append(tempLog[i]),
          $("<td>").append(nameLog[i])
        )
      );
  }
}
// EVENT LISTENERS
// This listens to the change on the selector and logs the change to local storage

// Users enter their name and temperature here and it is saved to local storage along with the time logged
$("#form").on("submit", function (e) {
  e.preventDefault();

  var temperatureCheck = {
    Equipment: $("#selector").val(),
    Time: new Date().toLocaleTimeString(),
    Temperature: $("#temperature").val(),
    Employee: $("#userName").val(),
  };
  logArray.push(temperatureCheck);
  localStorage.setItem("Log", JSON.stringify(logArray));
  recall();
});
// The submit log links to the results.html
$("#viewLog").on("click", function () {
  window.location.href = "./results.html";
});

//toast popup when Add Log clicked
$("#addToLog").click(function () {
  $(".toast").toast("show");
});

// Home button function
$("#homeButton").on("click", function () {
  window.location.href = "./index.html";
});

$("#emailButton").on("click", function () {
  var emailInput = $("#emailInput").val();
  emailArray.push(emailInput);
  localStorage.setItem("Emails", JSON.stringify(emailArray));
  $("#submit-email")[0].reset();
});

function randomImage() {
  var queryURL = "https://api.pexels.com/v1/search?query=restaurant";

  $.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "563492ad6f9170000100000143a58219eff2429d82e432a798f5c2b3"
      );
    },
  }).then(function (response) {
    console.log(response);
  });
}
