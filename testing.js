// DOM VARIABLES

// JS VARIABLES
tempArray = [];
userArray = [];
equipmentArray = [];
// FUNCTION DEFINITIONS

// FUNCTION CALLS

// EVENT LISTENERS 
// This listens to the change on the selector and logs the change to local storage
$("select").on("change", function () {
  var equipment = this.value;
  equipmentArray.push(equipment);
  localStorage.setItem("Equipment", JSON.stringify(equipmentArray));
});
// Users enter their name and temperature here and it's saved to local storage
$("#form").on("submit", function (e) {
  e.preventDefault();
  var userName = $("#userName").val();
  userArray.push(userName);
  localStorage.setItem("Employees", JSON.stringify(userArray));

  var tempInput = $("#temperature").val();
  tempArray.push(tempInput);
  localStorage.setItem("Temperatures", JSON.stringify(tempArray));

  console.log("You submitted the form");
});
// The submit log button will eventually link to the 
$("#viewLog").on("click", function () {
  console.log("..loading logs");
});
