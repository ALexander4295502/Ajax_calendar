var csrf_token= '<%= token_value %>';
$("body").bind("ajaxSend",function(elm,xhr,s){
    if(s.type == "POST"){
        xhr.setRequestHeader('X-CSRF-Token',csrf_token);
    }
});

    var currentMonth = new Month(2017,3);
    var selectedCell = null;
    
$(document).ready(function(){
    updateCalendar();
    initEventDialog();
    document.getElementById("existingEvents").innerHTML = "";
    
    $("#next_month_btn").click(function(){
        currentMonth = currentMonth.prevMonth();
        updateCalendar();
        console.log("the new month is "+currentMonth.month+" "+currentMonth.year);
    });
    
    $("#calendar td").mouseover(function(){
        $(this).addClass('hover');
        selectedCell = $(this);
    });
    
    $("#calendar td").mouseout(function(){
        $(this).removeClass('hover');
        selectedCell = $(this);
    });
    
    $("#calendar td").click(function(){
        var date = $(this).find(".date").html();
        var week = $(this).parent().attr('class').slice(-1);
        if(week === 0 && date > 20){
            openEventDialog((currentMonth.month-1%12), date);
        }else if(week === 4 && date<10){
            openEventDialog((currentMonth.month+1%12), date);
        }else{
            openEventDialog(currentMonth.month, date);
        }
    });
    
    $('#new_event_btn').click(AjaxAddEvent);
    $('#delete_event_btn').click(AjaxDeleteEvent);
    $('#edit_event_btn').click(AjaxEditEvent);
    $('#cancel_btn').click(function(){
        $('#event').hide();
        $('#day').val("");
        document.getElementById("existingEvents").innerHTML = "";
    });
    
});

function updateCalendar(){
    $('#currentMonth').html(monthToString(currentMonth.month) + ' ' + currentMonth.year);
    console.log(currentMonth);
    
    var weeks = currentMonth.getWeeks();
    for(var w in weeks){
        var days = weeks[w].getDates();
        for(var d in days){
            console.log(Date(days[d]));
            $('.week'+w).find(".day"+d).html(days[d].getDate());
            $('.week'+w).find(".day"+d).click(function(){
                var today = currentMonth.year+ "-" + currentMonth.month + "-" + $(this).html();
                var day = document.getElementById("day");
                day.setAttribute('value',today);
                console.log("updateCalendar day = "+document.getElementById("day").value);
                AjaxFetchEvent();
                $("#event").show();
            });
        }
    }
}

function initEventDialog(){
    $("#edit-event-dialog-form").dialog({
        title: "Edit Event",
        autoOpen:false,
        draggable:true,
        resizable:true,
        width:600,
        height:500,
        buttons:{
            'Delete' : {
                text: 'Delete Event',
                click : function(){
                    AjaxDeleteEvent();
                    $(this).dialog('close');
                }
            },
            'Cancel' : function(){
                $(this).dialog('close');
            },
            'Submit' : {
                text: 'Submit',
                click: function(){
                    AjaxAddEvent();
                    $("#edit-event-dialog-form").dialog('close');
                }
            }
        }
    });
}

function openEventDialog(month,date){
    var title = "Editing something";
    var dialogDiv = $("#edit-event-dialog-form");
    dialogDiv.dialog('option',"position",'center');
    dialogDiv.dialog('option','title','Add New Event On' + monthToString(month) + " " + date);
    dialogDiv.dialog("open");
    dialogDiv.parent().css("z-index","1100");
}

function addEvemtToUI(w,d,date,event){
    var name = event['name'];
    var color = event['color'];
    var eventHTML = '<div class="calendarEvent" style = "background-color'+"'>"+name+"</div>";
    $(".week"+w).find(".day"+d).append(eventHTML);
}

function AjaxAddEvent(event){
    var eventname = $("#event_name").val();
    var h = document.getElementById("hour");
    var hour = h.options[h.selectedIndex].value;
    var day = document.getElementById("day").value;
    var category = "test";
    console.log(encodeURIComponent(day));
    var dataString = "eventname="+encodeURIComponent(eventname)+"&day="+encodeURIComponent(day)+"&hour="+encodeURIComponent(hour)+"&category="+encodeURIComponent(category);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "addEvents.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString);
    xmlHttp.addEventListener("load",addEventCallBack,false);

    $('#event_name').val("");
    $('#day').val("");
}

function addEventCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    if(jsonData.eventAdded){
        var eventname = jsonData.eventname;
        $("#testMessage").html(eventname);
        $("#event").hide();
    }else{
        $("#testMessage").html("Add Event Failed");
    }
}

function AjaxEditEvent(event){
    var eventname = $("#event_name").val();
    var h = document.getElementById("hour");
    var hour = h.options[h.selectedIndex].value;
    var day = document.getElementBtId("day").value;
    var category = "test";
    var dataString = "eventname="+encodeURIComponent(eventname)+"&day="+encodeURIComponent(day)+"&hour="+encodeURIComponent(hour)+"&category="+encodeURIComponent(category);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "editEvents.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString);
    xmlHttp.addEventListener("load",editEventCallBack,false);
    
    $('#event_name').val("");
    $('#day').val("");    
}

function editEventCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    if(jsonData.eventEdit){
        var eventname = jsonData.eventname;
        $("#event").hide();
    }else{
        console.log(jsonData.message);
    }    
}

function AjaxDeleteEvent(event){
    var eventname = $("#event_name").val();
    
    var dataString = "eventname="+encodeURIComponent(eventname);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "deleteEvents.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString);
    xmlHttp.addEventListener("load",deleteEventCallBack,false);
    
    $('#event_name').val("");
    $('#day').val("");    
}

function deleteEventCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    if(jsonData.eventDeleted){
        var eventname = jsonData.eventname;
        $('#testMessage').html("event deleted successfully!");
        $("#event").hide();
    }else{
        $('#testMessage').html("event deleted failed!");
    }    
}

function AjaxFetchEvent(event){
    var day = document.getElementById("day").value;
    var dataString = "day=" + encodeURIComponent(day);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "fetchEvents.php",true);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", fetchEventCallBack, false);
    xmlHttp.send(dataString); 
}

function fetchEventCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    var eventsParent = document.getElementById("existingEvents");
    eventsParent.innerHTML = "";
    if(jsonData.eventExisted){
        var events = jsonData.events;
        for(var i in events) {
            var title = events[i].title;
            var time = events[i].time;
            eventsParent.innerHTML += "<p>" + title + " " + time + "</p>" + "<br>"; 
        }
        console.log(events); 
    }else{
        //$("#loginMessage").html("You were not logged in.  "+jsonData.message);
	console.log(jsonData);
	
    }    
}

function monthToString(month) {
    switch(month) {
	case 0:
	  return "January";
	  break;
	case 1:
	  return "February";
	  break;
	case 2:
	  return "March";
	  break;
	case 3:
	  return "April";
	  break;
	case 4:
	  return "May";
	  break;
	case 5:
	  return "June";
	  break;
	case 6:
	  return "July";
	  break;
	case 7:
	  return "August";
	  break;
	case 8:
	  return "September";
	  break;
	case 9:
	  return "October";
	  break;
	case 10:
	  return "November";
	  break;
	case 11:
	  return "December";
	  break;
	default:
	  return "Unknown Month";
    }
}

function dayToString(day) {
    switch(month) {
	case 0:
	  return "Sunday";
	  break;
	case 1:
	  return "Monday";
	  break;
	case 2:
	  return "Tuesday";
	  break;
	case 3:
	  return "Wednesday";
	  break;
	case 4:
	  return "Thursday";
	  break;
	case 5:
	  return "Friday";
	  break;
	case 6:
	  return "Saturday";
	  break;
	default:
	  return "Unknown Day";
    }
}





