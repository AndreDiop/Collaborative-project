// DOM VARIABLES

date = moment().format("LL"); // Global date variable

$("#date").text(
  "Hello! Today's date is " + date + ". Please complete the log below;"
);
$("#today").text("Temperature log for " + date);

// JS VARIABLES
logArray = [];
var lastLog = JSON.parse(localStorage.getItem("Log")); //  Items from local storage are displayed here


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
    $(".unsplash-bg").css("background-image", "url(" + newBackground + ")");
  })
};

// Function for EmailJS API Call
function sendEmail() {
  var savedLogs = localStorage.getItem("Log");
  var data = {
      service_id: 'default_service',
      template_id: 'template_rhcuybo',
      user_id: 'user_C4TQau4eepfDVHoV7waFq',
      template_params: {
          "message": savedLogs,
      }
  };
  $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
  }).done(function() {
      alert('Your mail is sent!');
  }).fail(function(error) {
      alert('Oops... ' + JSON.stringify(error));
  })
  };

$(document).ready(function () {
  randomImage();

  if (localStorage.getItem("Log") !== null) {
    recall();
  }
});

//This function retrieves items from localStorage
function recall() {
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
  // Un-Comment out the below to make EmailJS live.
  // sendEmail();
});

// form validation
$(function () {
  var form = $("form[name='log-form']").length;
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
