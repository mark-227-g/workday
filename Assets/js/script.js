// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

/************************************** 
global variables
**************************************/
var workdayStart=9;
var workdayEnd=18;

/************************************** 
functions
**************************************/

/************************************** 
Get the current time and compare the 
current hour to the parameter.
return the corresponding class name
hour format: military time
**************************************/
function getHourClass(hour)
{
  var d=new Date();
  var currentHour=d.getHours();
  var strClass="";

  if (hour == currentHour)
  { 
    strClass="present";
  }
  else if (hour < currentHour)
  {
    strClass="past";
  }
  else
  {
    strClass="future";
  }

  return(strClass);
};

/************************************** 
convert military time hour to 
standard time hour
add am or pm to time
**************************************/
function ampm(hour)
{
  if(hour>12)
  {
    return((hour-12))+ " pm";
  }
  else
  {
    return (hour+" am");
  }
}

/************************************** 
create hour bands for the calendar
**************************************/
function createDayCalendar()
{
  var calendarDayEl = document.querySelector("#calendarDay");
  var timeBlockEl;

  for (var dayHour = workdayStart;dayHour<=workdayEnd;dayHour++)
  {
    timeBlockEl = document.createElement("div");
    timeBlockEl.innerHTML='<div id="hour-' + dayHour + '" class="row time-block ' + getHourClass(dayHour)+ 
    '"><div class="col-2 col-md-1 hour text-center py-3">' + ampm(dayHour) + '</div>' +
    '<textarea class="col-8 col-md-10 description" rows="3"> </textarea>' +
    '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
     '<i class="fas fa-save" aria-hidden="true"></i>' +
     '</button>' +
     '</div>';
     calendarDayEl.appendChild(timeBlockEl);
  };
};

/************************************** 
create calendar on load
**************************************/
$(document).ready(createDayCalendar);
