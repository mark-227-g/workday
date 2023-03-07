/************************************** 
global variables
**************************************/
var workdayStart=9;
var workdayEnd=17;

var saveBtnEl = document.querySelector('#saveBtn');

/************************************** 
This defines the events on the planner
The events are kept in an array of objects
**************************************/
class workdayEvent {
  constructor(hour, text) {
    this.hour = hour;
    this.text = text;
  }
};

myWorkday=[];

/************************************** 
functions
**************************************/

/************************************** 
The main function is called after the 
page has been loaded
**************************************/
function main()
{
  setHeadingDate();
  createDayCalendar();
  //loadmyWorkday();

}

/************************************** 
Get the current time and compare the 
current hour to the parameter.
return the corresponding class name
the hour format is in military time
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
  else if(hour == 12)
  {
    return (hour+" pm");
  }
  else
  {
    return (hour+" am");
  }
}

/************************************** 
set the date in the workday heading
used the moment library instead of dayjs
the "Do" format does not work in dayjs
**************************************/
function setHeadingDate()
{
  var d=new Date();
  document.querySelector("#currentDay").textContent = moment(d).format('dddd, MMMM, Do');
}

/************************************** 
create hour bands for the calendar
The bands are created dynamically from 
the workday array/class
add an eventlistener to the button
**************************************/
function createDayCalendar()
{
  var calendarDayEl = document.querySelector("#calendarDay");
  var timeBlockEl;
  var btnEl;

  for (var dayHour = workdayStart;dayHour<=workdayEnd;dayHour++)
  {
    timeBlockEl = document.createElement("div");
    timeBlockEl.innerHTML='<div id="hour-' + dayHour + '" class="row time-block ' + 
    getHourClass(dayHour)+ '"><div class="col-2 col-md-1 hour text-center py-3">' + 
    ampm(dayHour) + '</div>' +
    '<textarea id="txt-'+dayHour+'" class="col-8 col-md-10 description" rows="3"> </textarea>' +
    '<button id="btn-'+dayHour+'" class="btn saveBtn col-2 col-md-1" aria-label="save" value="'
    +dayHour+'">' + '<i class="fas fa-save" aria-hidden="true"></i>' +
     '</button>' +'</div>';
     calendarDayEl.appendChild(timeBlockEl);
     btnEl=document.getElementById("btn-"+dayHour);
     btnEl.addEventListener("click",saveEvent);
  };
};

/************************************** 
Get my workday events from local storage
fill the workday data
**************************************/
function loadmyWorkday()
{
  myWorkday=JSON.parse(localStorage.getItem("myWorkday"));
  $.each( myWorkday, function( key, value ) 
  {
    document.getElementById("txt-"+value.hour).value=value.text;
  });
}

/************************************** 
Triggered by button press
1) get hour from value of button pressed
2) look for a workdayEvent object
3) if found update text
4) if not found create new workdayEvent
5) save to local storage
**************************************/
var saveEvent = function(event)
{

  var hour=event.currentTarget.value;
  var text=document.getElementById("txt-"+hour).value;
  var i=-1;
  if(myWorkday.length > 0)
  {
    i = myWorkday.findIndex(workdayEvent => workdayEvent.hour==hour);
  };

  if(i>=0)
  {
  myWorkday[i].text=text;
  }
  else
  {
    var newWorkdayEvent= new workdayEvent(hour,text);
    myWorkday.push(newWorkdayEvent);
  }

  localStorage.setItem("myWorkday", JSON.stringify(myWorkday));
};

/************************************** 
create calendar on load
**************************************/
$(document).ready(main);
