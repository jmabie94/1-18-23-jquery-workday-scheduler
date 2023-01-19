
/* gets Current Day to use in Header */
var currentDay = dayjs().format('dddd, MMMM D, YYYY');
var currentDayEl = $('#currentDay');
currentDayEl.text(currentDay);
console.log(currentDay);

/* gets Current Hour to use in Header */
var currentHour = dayjs().format('h:mm A');
var currentHourEl = $('#currentHour');
currentHourEl.text('The time right now is: ' + currentHour);
console.log(currentHour);

/* setting variables for use in functions below */
var Hour = 0;
var dayDate = 0;
var weekDay = 0;
var Month = 0;

/* setting variables to equal day.js values */
weekDay = dayjs().format('d') /* day of the week 0-6, Sunday as 0 */
Month = dayjs().format('M') /* month of the year 1-12 */
dayDate = dayjs().format('D') /* day of the month 1-31 */
Hour = dayjs().format('H') /* hour of the day 0-23, 12AM as 0 */
console.log(Hour) /* just to double check that Hour rounds to data-time values */

/* function to assign color-coded class to each hour block based on current time */
$('.hour').each(function () {
  /* since the data-time value is a string and Hour var is a number, can't use === */
  if ($(this).data("time") == Hour) {
    /* only want these classes added to the text area, had to adjust children to find */
    /* $(this).parent().children().addClass('present'); */
    $(this).parent().find('textarea').addClass('present');
  } else if ($(this).data("time") < Hour) {
    $(this).parent().find('textarea').addClass('past');
  } else if ($(this).data("time") > Hour) {
    $(this).parent().find('textarea').addClass('future');
  }
});

/* function to empty out Local Storage & all hour blocks at midnight every day */
var clearScreen = function () {
  if (Hour == 0) {
    $(".hour").each(function () {
      var currentTime = $(this).data("time");
      console.log(currentTime);
      localStorage.setItem(currentTime, "");
      /* var clearInput = localStorage.getItem(currentTime); */
      $(this).parent().find('textarea').val("");
    });
  }
};

setInterval(clearScreen, 60*60*1000);
clearScreen();
/* after adding previous code and removing setTime call, items in Local Storage stopped 
appearing/printing in time blocks, so re-added setTime, hopefully doesn't undo clearScreen */
setTime();

/* prints Local Storage items to the correct hour blocks as needed */
function setTime() {
  $(".hour").each(function () {
    var selectedTime = $(this).data("time");
    var newInput = localStorage.getItem(selectedTime);
    $(this).parent().find('textarea').val(newInput);
  });
};

/* on button click, anything added to text area is saved to Local Storage */
$(".saveBtn").click(function () {
  var createInput = $(this).parent().find('textarea').val();
  var inputTime = $(this).parent().find('.hour').data("time");
  localStorage.setItem(inputTime, createInput);
  $('.locallyStored').css("display", "flex");
  setTime();
});