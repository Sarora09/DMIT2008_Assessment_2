### Installation
The project folder is deployed on Cloud Application Platform Heroku with the help of GitHub.

There are multiple dependencies required to run this project as follows:

## Cookie session 
It is to create a session for the user when the user is accessing the page. 
For installation on windows, please write the command in terminal: npm install cookie-session

## Cors
It is installed for cross origin resource sharing. It allows the users to access this server from anywhere.
For installation on windows, please write the command in terminal: npm install cors

## Dotenv
It is for storing configuration in the environment separate from the code. 
For installation on windows, please write the command in terminal: npm install dotenv

## Ejs
It is for generating the html for the user. 
For installation on windows, please write the command in terminal: npm install ejs

## Express
It is a node.js module. 
For installation on windows, please write the command in terminal: npm install express

## Express Validator 
it is an express.js middleware for validator. 
For installation on windows, please write the command in terminal: npm install express-validator

## UUID
It generates a unique ID. 
For installation on windows, please write the command in terminal: npm install uuid

There is one developer dependency:
## Nodemon 
It is a tool that helps in the developing the applications on node.js. For any changes in the file, it restarts the node application automatically. 
For installation on windows, please write the command in terminal: npm install –save-dev nodemon

### CLIENT SIDE FILES

## login.js file
On the client side, when the user inputs the email and password and press the login button, the add event listener on the login button checks the user input for validations. Two validations are considered for these user inputs:

Email validation – 2 criterions are considered for validation, i.e., user either don’t put anything in the email text box or puts the wrong email format in the text box, i.e. input without the “@” in it.

Password validation – Only one criterion is considered here, where the user doesn’t put any value in the password text box.

Upon the successful validation, the form submission event happens and middleware with POST method and endpoint “/login”, checks the user inputs from the users.json file. If the inputs match, then the user is redirected to a dashboard page. In case, the user inputs don’t exist in the users.json file, appropriate warnings are displayed on the user login screen.
Additional comments for code understanding are mentioned in the file.

## signup.js file
On the client side, when the user inputs the username, email, and password, and press the create account button, the add event listener on the signup screen checks for the user input for validations.

Username validation - Only one criterion is considered here, where the user doesn’t put any value in the username text box.

Email validation - 2 criterions are considered for validation, i.e., user either don’t put anything in the email text box or puts the wrong email format in the text box, i.e. input without the “@” in it.

Password validation - Only one criterion is considered here, where the user doesn’t put any value in the password text box.

Upon the successful validations of the username, email, and password, XMLHTTPRequest is used to interact with server. The XMLHTTPRequest method confirms with the server if the email exists in the user file on the server. If, the user entered email exists in the users.json file on server, then a message is displayed on the screen that the email exists. So, the user can put a new email in it for signing up. The process will keep going until the user puts a new email in the email text box. Once the user entered the new email, the user is directed to the Login page.
Additional comments for code understanding are mentioned in the file.

## users.js file
The signup, and login page have the users link in the navigation bar. Upon clicking the users link, the user is redirected to the users.html page where data received from the API (i.e., users.json file) is displayed on the screen. The url is requested to server using the get method. The data received from API is added to template. The template is then appended to the html using the append method.

### SERVER SIDE FILE

## index.js file

The index.js file consist of middleware which sends the data to the client when requested by the client.

# app.get('/dashboard', (req, res))
Above middleware checks if the request received has the endpoint “/dashboard” and has GET method. The middleware checks the session of the user and if the user session is valid, then it renders the dashboard page on the user’s screen. Otherwise, it redirects the user to the login page. Dashboard can only be accessed by successful login screen. This way, it protects the route to dashboard.

# app.get(‘/login’, (req,res))
Above middleware checks if the request received has the endpoint “/login” and has GET method. This middleware renders the login page when requested by user on the client side.

# app.post(‘/login’, (req,res))
Above middleware checks if the request received has the endpoint “/login” and has POST method. This middleware checks if the user inputs, i.e., email and password, exist in the users file on server. If they match, then it renders the dashboard page. However, if it doesn’t match, then then user is displayed appropriate warnings on the screen. Dashboard can only be accessed by successful login screen. This way, it protects the route to dashboard.

# app.post(‘/register’, (req,res))
Above middleware checks if the request received has the endpoint “/register” and has POST method. Server-side express validations checks the user email format. Upon successful validations of email on client side, the user email is checked against the emails in the users.json file. If the user entered email exists in the users.json file, a status code of 400 is sent to the user which displays the warning of user email already exists. If the user email doesn’t exist in the users.json file, then the user details are added in the file along with the uuid code generated for the user.

# app.get(‘/api/v1/users’, (req,res)
Above middleware checks if the request received has the endpoint (‘/api/v1/users’) and has GET method. The middleware will extract the details from the users.json and send the details to the user on the client side.

# app.use((req,res))
This middleware is kept in the last. When user sends a request link and if it doesn’t match with any middleware then it travels down to this middleware “app.use((req,res))” and the server sends the 404 page to the user.

# app.listen(Port, ())
It listens to the incoming requests from the client on the port specified in it.