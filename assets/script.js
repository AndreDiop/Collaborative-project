// DOM VARIABLES

date = new Date(); // Global date variable
date.toString().slice(0, 24);
$("#date").text(date);

// JS VARIABLES
tempArray = [];
userArray = [];
equipmentArray = [];
emailArray = [];
timeArray = [];
// FUNCTION DEFINITIONS

$(document).ready(function() {
  recall(); //Function call to display locally stored data
});

//This function retrieves items from localStorage
function recall() {
  var timeLog = JSON.parse(localStorage.getItem("Time Logged"));
  var equipmentLog = JSON.parse(localStorage.getItem("Equipment"));
  var tempLog = JSON.parse(localStorage.getItem("Temperatures"));
  var nameLog = JSON.parse(localStorage.getItem("Employees"));
  //  Items from local storage are displayed here
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
$("select").on("change", function() {
  var equipment = this.value;
  equipmentArray.push(equipment);
  localStorage.setItem("Equipment", JSON.stringify(equipmentArray));
});

// Users enter their name and temperature here and it is saved to local storage along with the time logged
$("#form").on("submit", function(e) {
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

  function formatTime(i) {
    //This adds a zero to display time correctly
    return i < 10 ? "0" + i : i;
  }
  time = formatTime(date.getHours()) + ":" + formatTime(date.getMinutes());
  timeArray.push(time);
  localStorage.setItem("Time Logged", JSON.stringify(timeArray));

  recall();
});

// The submit log links to the results.html
$("#viewLog").on("click", function() {
  window.location.href = "./results.html";
});

// Home button function
$("#homeButton").on("click", function() {
  window.location.href = "./index.html";
});

$("#emailButton").on("click", function() {
  var emailInput = $("#emailInput").val();
  emailArray.push(emailInput);
  localStorage.setItem("Emails", JSON.stringify(emailArray));
  $("#submit-email")[0].reset();
});

// form validation
$(function() {
  var form = $("form[name='log-form']").length;
  console.log(form);
  if(!(form)) return
  $("form[name='log-form']").validate({
    rules: {
      name: {
        required: true
      },
      temp: {
        required: true
      },
      equipment: {
        required: true
      }
    },
    messages: {
      name: "Please enter your name",
      equipment: "Please select equipment",
      temp: "Please enter a temperature"
    },
    submitHandler: function(form) {
      $(".toast").toast("show");
    }
  });
});
