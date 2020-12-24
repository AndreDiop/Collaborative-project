// DOM VARIABLES

//global date variable
date = new Date();
date.toString().slice(0, 24);
$("#date").text(date);

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

// QuickChart TEST
data = {
  type: "doughnut",
  datasets: [
    {
      data: [10, 20, 30],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ["Red", "Yellow", "Blue"],
};
var startURL = "https://quickchart.io/chart?c={;"
// var chartType = "type:'doughnut'";
// var chartLabels = ["Complete", "Incomplete", "Warning"];
// var chartData = [12, 2, 2];

console.log(JSON.stringify(data));

var quickChartURL =
  "https://quickchart.io/chart?c={type:'doughnut',data:{labels:['January','February','March','April','May'],datasets:[{data:[50,60,70,180,190]}]},options:{plugins:{doughnutlabel:{labels:[{text:'550',font:{size:20}},{text:'total'}]}}}}";
console.log(quickChartURL);
