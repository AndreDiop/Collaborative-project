// DOM VARIABLES

date = new Date(); // Global date variable
date.toString().slice(0, 24);
$("#date").text(date);

//time = date.toLocaleTimeString(); // Global time variable

// JS VARIABLES
tempArray = [];
userArray = [];
equipmentArray = [];
emailArray = [];
timeArray = [];
// FUNCTION DEFINITIONS

$(document).ready(function () {
  randomImage();
  if(localStorage.getItem("Equipment")!=null){
    recall(); //Function call to display locally stored data
  }
});

//This function retrieves items from localStorage
function recall() {
  var timeLog = JSON.parse(localStorage.getItem("Time Logged"));
  var equipmentLog = JSON.parse(localStorage.getItem("Equipment"));
  var tempLog = JSON.parse(localStorage.getItem("Temperatures"));
  var nameLog = JSON.parse(localStorage.getItem("Employees"));
  //  Items from local storage are displayed here
  if(localStorage.getItem("Equipment")!=null){
  $(".timeDisplay").text(timeLog[0]);
  $(".equipmentDisplay").text(equipmentLog[0]);
  $(".tempDisplay").text(tempLog[0]);
  $(".nameDisplay").text(nameLog[0]);
  }
  for (i = 0; i < timeLog.length; i++) {
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
$("select").on("change", function () {
  console.log("EQUIP!!")
  var equipment = this.value;
  equipmentArray.push(equipment);
  localStorage.setItem("Equipment", JSON.stringify(equipmentArray));
});

// Users enter their name and temperature here and it is saved to local storage along with the time logged
$("#form").on("submit", function (e) {
  e.preventDefault();

  var tempInput = $("#temperature").val();
  if (isNaN(tempInput)) {
    return;
  } else {
    tempInput = $("#temperature").val();
    tempArray.push(tempInput);
    localStorage.setItem("Temperatures", JSON.stringify(tempArray));
  }
  var userName = $("#userName").val();
  userArray.push(userName);
  localStorage.setItem("Employees", JSON.stringify(userArray));

  // var tempInput = $("#temperature").val();
  // tempArray.push(tempInput);
  // localStorage.setItem("Temperatures", JSON.stringify(tempArray));

  timeArray.push(new Date().toLocaleTimeString());
  function formatTime(i) {
    //This adds a zero to display time correctly
    return i < 10 ? "0" + i : i;
  }
  // time = formatTime(date.getHours()) + ":" + formatTime(date.getMinutes());
  // console.log(time);
  // timeArray.push(time);
  localStorage.setItem("Time Logged", JSON.stringify(timeArray));

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
      xhr.setRequestHeader ("Authorization", "563492ad6f9170000100000143a58219eff2429d82e432a798f5c2b3");
  },
  }).then(function(response) {
    console.log(response);
  });
}

