function addEvent(x,y){
    var title;
    var userTitle = prompt("Please enter your event title","event");
    if(userTitle!=null){
        title=userTitle;
        document.getElementById("testMessage").innerHTML = title;
        var table = document.getElementsByTagName("table")[0];
        var row = table.getElementsByTagName("tr")[x];
        var col = table.getElementsByTagName("td")[y];
        col.innerHTML = title;
    }
}

var table = document.getElementsByTagName("table")[0];
var rows = table.getElementsByTagName("tr");

for(var i = 0; i<rows.length; i++){
    var cols = rows[i].getElementsByTagName("td");
    for(var j = 0; j<cols.length; j++){
        col.addEventListener("click",addEvent(i,j),false);
    }
}