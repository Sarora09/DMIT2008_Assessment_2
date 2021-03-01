window.addEventListener("load", function (e) {
  const emailAddress = document.querySelector("#email"); // retrieving the value of email
  const passwordDetails = document.querySelector("#password"); // retrieving the value of password
  const loginButton = document.querySelector("#login"); // refering to the login area for add event listener
  let emailWarning = document.querySelector(".emailWarning"); // referencing for the warning for email input
  let passwordWarning = document.querySelector(".passwordWarning"); // referencing for the warning for password input

  let emailValid = false; // flag variable created for email input validation
  let emailEmptyFlag = false; // flag variable created for no input from user for email
  let emailFormatFlag = false; // flag variable created for wrong format input from user for email
  let validPassword = false; // flag variable created for no input from user for password

  // event listener for "loginButton"
  loginButton.addEventListener("submit", function (e) {
    e.preventDefault();
    emailValid = validateEmail(emailAddress.value); // validation for email
    validPassword = validatePassword(passwordDetails.value); // validation for password 
    
    // if the user entered the valid input for both the email and password then only the submt event can happen
    if (emailValid==true && validPassword==true) {
      emailWarning.textContent="";
      passwordWarning.textContent = "";
      loginButton.submit();
     }
     // conditions for warnings on screen if the user entered the invalid input for email only
     else if (emailValid == false && validPassword == true) 
     {
       // if the user entered no input for email only
       if (emailEmptyFlag == true) {
         emailWarning.textContent = "Email address cannot be empty";
       } 
       // if the user entered incorrect format for email only
       else if (emailFormatFlag == true) {
         emailWarning.textContent = "Email format is not correct";
       } else {
         emailWarning.textContent = "";
       }
       passwordWarning.textContent = "";
     }
     // conditions for warnings on screen if the user entered no input for password only 
     else if (emailValid == true && validPassword == false) 
     {
       passwordWarning.textContent = "Password cannot be empty";
       emailWarning.textContent = "";
     } 
     // conditions for warnings on screen if the user entered the invalid input for both the email and password 
     else if (emailValid == false && validPassword == false) 
     {
       // if the user entered no input for email only
       if (emailEmptyFlag == true) {
         emailWarning.textContent = "Email address cannot be empty";
       }
       // if the user entered incorrect format for email only 
       else if (emailFormatFlag == true) {
         emailWarning.textContent = "Email format is not correct";
       } 
       passwordWarning.textContent = "Password cannot be empty";
     } 
   });
  
   // Validation check for email input
   function validateEmail(email) {
     // validation for no email input
     if (email.trim() == "") {
       emailEmptyFlag = true;
       emailFormatFlag = false;
       return false;
     }
     // validation for incorrect email format 
     else if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) 
     {
       emailEmptyFlag = false;
       emailFormatFlag = true;
       return false;
     } 
     else 
     {
       emailEmptyFlag = false;
       emailFormatFlag = false;
       return true;
     }
   }

   // Validation check for password input
   function validatePassword(password) {
     // validation for no password input
     if (password.trim() == "") {
       return false;
     } else {
       return true;
     }
   }
 });