$(document).ready(function(){
    $('#login_btn').click(AjaxLogin);    
    $('#logout_btn').click(AjaxLogout);
    $('#register_btn').click(AjaxRegister);
    AjaxCheckLogin();
    $('#signUp_btn').click(function(){
        $('#login').hide();
        $('#signUp').show();
    });
});

function AjaxCheckLogin(event){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "checkLogin.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load",checkLoginCallBack,false);
    xmlHttp.send(null);
}

function checkLoginCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    var isLoggedIn = jsonData.isLoggedIn;
    var userName = jsonData.user;
    if(isLoggedIn){
        $('#login').hide();
        $('#signUp').hide();
        $('#welcome').show();
        $("#userTag").html("Welcome "+ userName);
        $('#calendar').show();
        //calendarInit();
    }else{
        $('#login').show();
        $('#signUp').hide();
        $('#welcome').hide();
        $('#calendar').hide();
    }
}

function AjaxLogin(event){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var dataString = "username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","CalendarLogin.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString);
    xmlHttp.addEventListener("load",loginCallBack,false);
    $('#username').val("");
    $('#password').val("");
}

function loginCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    var userName = jsonData.user;
    if(jsonData.success){
        $('#login').hide();
        $('#signUp').hide();
        $('#welcome').show();
        $('#userTag').html("Welcome"+userName);
        $('#calendar').show();
        $('#event').hide();
        $('#loginMessage').html("");
        //calendarInit();
    }else{
        $('#loginMessage').html("Please login." +jsonData.message);
    }
}

function AjaxLogout(event){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","CalendarLogout.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(null);
    xmlHttp.addEventListener("load",logoutCallBack,false);
}

function logoutCallBack(event){
    $('#login').show();
    $('#signUp').hide();
    $('#welcome').hide();
    $('#calendar').hide();
    $('#event').hide();
}

function AjaxRegister(event){
    var username = $('#register_username').val();
    var password = $('#register_password').val();
    var email = $('#register_email').val();
    var dataString = "username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password)+"&email="+encodeURIComponent(email);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","CalendarRegister.php",true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(dataString);
    xmlHttp.addEventListener("load",registerCallBack,false);
    $('#register_username').val("");
    $('#register_password').val("");
    $('#register_email').val("");
}

function registerCallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    if(jsonData.success){
        $('#login').hide();
        $('#signUp').hide();
        $('#welcome').show();
        $('#userTag').html("Welcome"+userName);
        $('#calendar').show();
        $('#event').hide();
        console.log("register"+jsonData.username)
    }else{
        $('#loginMessage').html("Please register." +jsonData.message);
    }
}
