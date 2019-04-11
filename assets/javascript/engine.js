var config = {
  apiKey: "AIzaSyDBg4abLKJYE7Fii9YK-fmS1qYPQ5hQZ7M",
  authDomain: "work-c9f1e.firebaseapp.com",
  databaseURL: "https://work-c9f1e.firebaseio.com",
  projectId: "work-c9f1e",
  storageBucket: "work-c9f1e.appspot.com",
  messagingSenderId: "1086595211339"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#train-form").on("submit", function (event) {
  event.preventDefault();

  // gather our form data
  var trainDataInput = {
    name: $("#name-input").val().trim(),
    destination: $("#dest-input").val().trim(),
    startTime: $("#start-input").val().trim(),
    frequency: $("#freq-input").val().trim()
  }

  console.log(trainDataInput);
  database.ref().push(trainDataInput);

  $("#name-input").val(" ");
  $("#dest-input").val(" ");
  $("#start-input").val(" ");
  $("#freq-input").val(" ");
});

database.ref().on("child_added", function (childSnapshot) {
  var trainData = childSnapshot.val();

  // var startDateConverted = moment(employeeData.startDate, "YYYY-MM-DD");
  // var totalMonthsWorked = moment().diff(startDateConverted, "months");


  var frequency = trainData.frequency;

  var startTime = trainData.startTime;
  console.log(startTime)

  var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
  console.log(startTimeConverted);

  var currentTime = moment();
  // console.log("Current time: " + moment(currentTime).format("HH:mm"))

  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
  console.log(timeDiff);

  var tRemainder = timeDiff % frequency;

  var tMinutesTillNextTrain = frequency - tRemainder;

  var nextTrain = (moment().add(tMinutesTillNextTrain, "minutes")).format("hh:mm");
  // console.log(nextTrain);




  var $tr = $("<tr>");

  var $tdName = $('<td>').text(trainData.name);
  var $tdDestination = $('<td>').text(trainData.destination);
  var $tdFrequency = $('<td>').text(trainData.frequency);
  var $tdNextArrival = $("<td>").text(nextTrain);
  var $tdMinutesAway = $("<td>").text(tMinutesTillNextTrain);

  // append td tags to table row you created above
  $tr.append($tdName, $tdDestination, $tdFrequency, $tdNextArrival, $tdMinutesAway);

  // lastly, append entire table row you created to $("tbody")
  $("tbody").append($tr);

})