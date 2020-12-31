// DOM VARIABLES

date = moment().format("LL"); // Global date variable

$("#date").text(date);
$("#today").text("Temperature log for " + date);

// JS VARIABLES
logArray = [];

// FUNCTION DEFINITIONS

$(document).ready(function () {
  randomImage();
  if(localStorage.getItem("Equipment")!=null){
    recall(); //Function call to display locally stored data
  }
});

//This function retrieves items from localStorage
function recall() {

  var lastLog = JSON.parse(localStorage.getItem("Log")); //  Items from local storage are displayed here
  for (i = 0; i < lastLog.length; i++) {

    $("#dataTable")
      .find("tbody")
      .append(
        $("<tr>").append(
          $("<td>").append([1 + i]),
          $("<td>").append(lastLog[i].Time),
          $("<td>").append(lastLog[i].Equipment),
          $("<td>").append(lastLog[i].Temperature),
          $("<td>").append(lastLog[i].Employee)
        )
      );
  }
}
// EVENT LISTENERS

$("#form").on("submit", function (e) {
  // Users enter their name and temperature here and it is saved to local storage along with the time logged

  e.preventDefault();

  var temperatureCheck = {
    Equipment: $("#selector").val(),
    Time: moment().format("LTS"),
    Temperature: $("#temperature").val(),
    Employee: $("#userName").val(),
  };
  if (temperatureCheck.Temperature === "") {
    console.log("error", "Temperature field cannot be blank");
  } else if (temperatureCheck.Employee === "") {
    console.log("error", "Name cannot be blank");
  } else {
    logArray.push(temperatureCheck);
    localStorage.setItem("Log", JSON.stringify(logArray));
    recall();
  }


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
