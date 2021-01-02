// DOM VARIABLES

date = moment().format("LL"); // Global date variable

$("#date").text(
  "Hello! Today's date is " + date + ". Please complete the log below;"
);
$("#today").text("Temperature log for " + date);

// JS VARIABLES
logArray = [];

// FUNCTION DEFINITIONS

// Function for Unsplash API Call
function randomImage() {
  var randomNumber = Math.floor(Math.random() * 49);
  var clientID = "QGc0QQgaK_Jmsh9D8YNpkse2tcwaakjKMx7JeY4Qv-o";
  var queryURL =
    "https://api.unsplash.com/search/photos?client_id=" +
    clientID +
    "&query=restaurant&page=1&per_page=50";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var newBackground = response.results[randomNumber].urls.full;
    console.log(response);
    $("#bg-image").css("background-image", "url(" + newBackground + ")");

    // Un-Comment the below code to test if the response is working.
    // $("#test-area").attr("src", response.results[randomNumber].urls.regular);
  });
}

$(document).ready(function () {
  randomImage();

  if (localStorage.getItem("Equipment") !== null) {
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
  var tempInput = $("#temperature").val();
  // fixes user validate error in console
  if (isNaN(tempInput)) {
    return;
  }

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

// form validation
$(function () {
  var form = $("form[name='log-form']").length;
  console.log(form);
  if (!form) return;
  $("form[name='log-form']").validate({
    rules: {
      name: {
        required: true,
      },
      temp: {
        required: true,
      },
      equipment: {
        required: true,
      },
    },
    messages: {
      name: "Please enter your name",
      equipment: "Please select equipment",
      temp: "Please enter a temperature",
    },
    submitHandler: function (form) {
      $(".toast").toast("show");
      console.log("toast");
    },
  });
});
