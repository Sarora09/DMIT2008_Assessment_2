require("dotenv").config();
//import the express module
const express = require("express");
const path = require("path");
const cors = require("cors");
const uuid = require("uuid").v4;
const cookSession = require('cookie-session');

// Importing our File Service Used With the GET "/api/v1/users" Route
const fileService = require("./services/fileService");
// Importing our Login Service Used With the POST Login Route
const loginService = require('./services/loginService')
// Importing our Registration Service Used With the POST Register Route
const registration = require("./services/registrationService");

// Importing the express validator
const { body, validationResult } = require("express-validator");

// create an instance of express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware For Cross Origin Resource Sharing
app.use(cors());

//To get access to the name value pairs send in the message Body of POST Request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Middleware
app.use(cookSession({
  name:"session",
  keys:['SDFLU9iw2308dlsfuwe2adfl', 'LDFA34gsdfgFOPW2323DA7FS2']
}))

// Setup Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Middleware Serving Static Pages from client directory. Second parameter is an configuration object of how we want
// the static file server to run
app.use(express.static(path.join(__dirname, "../client"), {extensions: ["html", 'htm']}));

// Protected route and can be assessed with successful login
// Checks if the request received has the endpoint “/dashboard” and has GET method. The middleware checks the session of the user and if the user session is valid, then it renders the dashboard page on the user’s screen. Otherwise, it redirects the user to the login page. Dashboard can only be accessed by successful login screen. This way, it protects the route to dashboard
app.get('/dashboard', (req, res)=>{
  if(req.session.isValid){
    res.render('dashboard')
  }else{
   res.redirect('/login')
  }
})

// Checks if the request received has the endpoint “/login” and has GET method. This middleware renders the login page when requested by user on the client side
app.get('/login', (req, res)=>{
  res.render('login', {passwordWarning:"", emailWarning:"", email:"", password:""})
})

// Checks if the request received has the endpoint “/login” and has POST method. This middleware checks if the user inputs, i.e., email and password, exist in the users file on server. If they match, then it renders the dashboard page. However, if it doesn’t match, then then user is displayed appropriate warnings on the screen. Dashboard can only be accessed by successful login screen. This way, it protects the route to dashboard
app.post('/login', (req, res)=>{
   const credentials = {
     email:req.body.email,
     password:req.body.password
   }
   const isValidUser =  loginService.authenticate(credentials)
      if( isValidUser.user !== null){
            if(!req.session.isValid){
                req.session.isValid = true;
            }
            res.redirect('dashboard')
      }
      if(isValidUser.user === null){
          res.render('login', {
            emailWarning:isValidUser.emailWarning, 
            passwordWarning:isValidUser.passwordWarning,
            email:req.body.email,
            password:req.body.password
           })
      }
 })

// Checks if the request received has the endpoint “/register” and has POST method. Server-side express validations checks the user email format. Upon successful validations of email on client side, the user email is checked against the emails in the users.json file. If the user entered email exists in the users.json file, a status code of 400 is sent to the user which displays the warning of user email already exists. If the user email doesn’t exist in the users.json file then the user details are added in the file along with the uuid code generated for the user 
app.post("/register", [body('email', 'Email is not valid').isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
    req.body.uuidCode = uuid();
    let flagStatus = registration.registration(req.body);
    if (flagStatus==true) {
      res.render("login", {
        passwordWarning: "",
        emailWarning: "",
        email: "",
        password: "",
      });
    } else {
      res.status(400).send({
        error: { code: 400, message: `User Email already exists` },
      });
    }
  }
);

// Checks if the request received has the endpoint (‘/api/v1/users’) and has GET method. The middleware will extract the details from the users.json and send the details to the user on the client side
app.get('/api/v1/users', (req,res)=>{
const details=fileService.getFileContents("../data/users.json");
res.send(details);
})

// When user sends a request link and if it doesn’t match with any middleware then it travels down to this middleware “app.use((req,res))” and the server sends the 404 page to the user
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

//  It listens to the incoming requests from the client on the port specified in it
app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});
