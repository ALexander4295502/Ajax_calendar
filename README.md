# Ajax_calendar

### Intro
This is a simple calendar that allows users to add and remove events dynamically.
We use JavaScript/jQuery to process user interactions at the web browser, without ever refreshing the browser after the initial web page load. 
This application utilizes AJAX to run server-side scripts that query the database to save and retrieve information, including user accounts and events.

### Notes
Sometimes it will encounter the CSRF problem when user login automatically after register (the second time). You may need to fresh the page once manually.
This won't happen when you switch between two existed users.

### Creative Portion
- Highlight the current date by a blue circle
- Filter events by categories
- Users can add events repeat every day and week (7 events per add), and month (12 events per add).
