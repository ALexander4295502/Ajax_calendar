<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="CalendarStyle.css" />
        <!--<script src="//cdn.sencha.io/ext-4.2.0-gpl/ext.js"></script>-->
        
        <script src="jquery.min.js"></script>
        <script src="jquery-ui.min.js"></script>
        <script type="text/javascript" src="CalendarLogin.js"></script>
        <script type="text/javascript" src="CalendarHelper.js"></script>
        <script type="text/javascript" src="Calendar.js"></script>
        <!--<script type="text/javascript" src="addEvent.js"></script>-->
        <title>My Calendar</title>
    </head>
    <body>
        <h2>Module5 Calendar</h2>
        <?php
            session_start();
            include_once('database.php');
        ?>
        <div id="login" class="login">
            <h3>Login</h3>
            <label>Username:</label>
                <input id="username" type="text" name="username"><br/>
            <label>Password:</label>
                <input id="password" type="password" name="password"><br/>
                <button id="login_btn">login</button>
                <button id="signUp_btn">Sign up</button>
        </div>
        
        <div id="signUp" class="login">
            <h3>Sign Up</h3>
            <label>Username:</label>
                <input id="register_username" type="text" name="username"><br/>
            <label>Password:</label>
                <input id="register_password" type="password" name="password"><br/>
            <label>Email Address</label>
                <input id="register_email" type="text" name="email"><br/>
                <button id="register_btn">register</button>
        </div>
        
        <div id="loginMessage" class="login">
            <div id="welcome" class="login">
                <div id="userTag">Welcome</div>
                <button id="login_btn">logout</button>
            </div>
        </div>
        
        <div id="event" class="login">
            <div id="existingEvents"></div>
            <label>Event:</label>
            <input id="event_name" type="text" name="eventname" ><br/>
            <input id="day" type="hidden" value="testDay">
            <select id="hour" name="hour">
                <option selected="selected" value="0:00:00">0:00</option>
                <option value="1:00:00">1:00</option>
                <option value="2:00:00">2:00</option>
            </select>
            <input type="hidden" id="token" name="token" value="<?php echo $_SESSION['token'];?>" />
            <button id="new_event_btn">Create</button>
            <button id="delete_event_btn">Delete</button>
            <button id="edit_event_btn">Edit</button>
            <button id="cancel_btn">Cancel</button>
        </div>
        
        <div id="calendar">
            This is the calendar.
            <br>
            <button id="prev_month_btn"><<<</button>
            <span id="currentMonth"></span>
            <button id="next_month_btn">>>></button>
            <p id="testMessege"></p>
            <table id="calendarTable" class="calendar">
                <tr class="week0">
                    <td class="day0"></td>
                    <td class="day1"></td>
                    <td class="day2"></td>
                    <td class="day3"></td>
                    <td class="day4"></td>
                    <td class="day5"></td>
                    <td class="day6"></td>
                </tr>
                <tr class="week1">
                    <td class="day0"></td>
                    <td class="day1"></td>
                    <td class="day2"></td>
                    <td class="day3"></td>
                    <td class="day4"></td>
                    <td class="day5"></td>
                    <td class="day6"></td>
                </tr>
                <tr class="week2">
                    <td class="day0"></td>
                    <td class="day1"></td>
                    <td class="day2"></td>
                    <td class="day3"></td>
                    <td class="day4"></td>
                    <td class="day5"></td>
                    <td class="day6"></td>
                </tr>
                <tr class="week3">
                    <td class="day0"></td>
                    <td class="day1"></td>
                    <td class="day2"></td>
                    <td class="day3"></td>
                    <td class="day4"></td>
                    <td class="day5"></td>
                    <td class="day6"></td>
                </tr>
                <tr class="week4">
                    <td class="day0"></td>
                    <td class="day1"></td>
                    <td class="day2"></td>
                    <td class="day3"></td>
                    <td class="day4"></td>
                    <td class="day5"></td>
                    <td class="day6"></td>
                </tr>
            </table>      
        </div>
            <div id="edit-event-dialog-form" title="Confirm" style="display:none;">
                Fetch and display events here
                <br>
                <button>Add new event</button>
            </div>
        <script>
            $("#login").hide();
            $("#signUp").hide();
            $("#welcome").hide();
            $("#calendar").hide();
            $("#event").hide();
        </script>
    </body>
</html>
