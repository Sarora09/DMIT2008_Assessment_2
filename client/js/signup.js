window.addEventListener("load", function (e) {
  const fullName = document.querySelector("#fullname"); // retrieving the value of user's full name
  const emailAddress = document.querySelector("#email"); // retrieving the value of email
  const passwordDetails = document.querySelector("#password"); // retrieving the value of password
  const registerButton = document.querySelector("#register"); // referencing to the register area for add event listener
  let userNameWarning = document.querySelector(".fullnameWarning"); // referencing for the warning for user full name input
  let emailWarning = document.querySelector(".emailWarning"); // referencing for the warning for email input
  let passwordWarning = document.querySelector(".passwordWarning"); // referencing for the warning for password input

  let userNameValid = false; // flag variable created for user name input validation
  let emailValid = false; // flag variable created for email input validation
  let emailEmptyFlag = false; // flag variable created for no input from user for email
  let emailFormatFlag = false; // flag variable created for wrong format input from user for email
  let validPassword = false; // flag variable created for no input from user for password
  
  // event listener for "registerButton"
  registerButton.addEventListener("submit", function (e) {
    e.preventDefault();

    userNameValid = validateUserName(fullName.value); // validation for user name
    emailValid = validateEmail(emailAddress.value); // validation for email
    validPassword = validatePassword(passwordDetails.value); // validation for password
    
    // if the user entered the valid input for the user name, email, and password then only the submt event can happen
    if (userNameValid==true && emailValid==true && validPassword==true) {
      let url = "http://localhost:5000/register";
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(JSON.stringify({
          fullname: fullName.value,
          email: emailAddress.value,
          password: passwordDetails.value,
        }));
      xhr.onreadystatechange = function (ev) {
        if (xhr.status === 400) {
          emailWarning.textContent = "User Email already exists";
        } else if (xhr.status === 422){
          emailWarning.textContent = "Incorrect format. Please check the email format";
        }
        else {
          emailWarning.textContent = "";
          location.href = "/login";
        }
      };
    }
    // conditions for warnings on screen if the user entered the invalid input for user name only 
    else if (userNameValid == false && emailValid == true && validPassword == true) 
    {
      userNameWarning.textContent = "User name cannot be empty";
      emailWarning.textContent = "";
      passwordWarning.textContent = "";
    }
    // conditions for warnings on screen if the user entered the invalid input for email only 
    else if (userNameValid == true && emailValid == false && validPassword == true) 
    {
      // if the user entered no input for email only
      if (emailEmptyFlag == true) 
      {
        emailWarning.textContent = "Email address cannot be empty";
      }
      // if the user entered incorrect format for email only 
      else if (emailFormatFlag == true) 
      {
        emailWarning.textContent = "Email format is not correct";
      } 
      else {
        emailWarning.textContent = "";
      }
      userNameWarning.textContent = "";
      passwordWarning.textContent = "";
    }
    // conditions for warnings on screen if the user entered no input for password only 
    else if (userNameValid == true && emailValid == true && validPassword == false) 
    {
      passwordWarning.textContent = "Password cannot be empty";
      userNameWarning.textContent = "";
      emailWarning.textContent = "";
    }
    // conditions for warnings on screen if the user entered the invalid input for the user name, email and password 
    else if (userNameValid == false && emailValid == false && validPassword == false) 
    {
      userNameWarning.textContent = "User name cannot be empty";
      // if the user entered no input for email only
      if (emailEmptyFlag == true) 
      {
        emailWarning.textContent = "Email address cannot be empty";
      }
      // if the user entered incorrect format for email only 
      else if (emailFormatFlag == true) 
      {
        emailWarning.textContent = "Email format is not correct";
      } 
      passwordWarning.textContent = "Password cannot be empty";
    }
    // conditions for warnings on screen if the user entered the invalid input for the user name and email 
    else if (userNameValid == false && emailValid == false && validPassword == true) 
    {
      userNameWarning.textContent = "User name cannot be empty";
      // if the user entered no input for email only
      if (emailEmptyFlag == true) {
        emailWarning.textContent = "Email address cannot be empty";
      }
      // if the user entered incorrect format for email only 
      else if (emailFormatFlag == true) 
      {
        emailWarning.textContent = "Email format is not correct";
      } 
      passwordWarning.textContent = "";
    }
    // conditions for warnings on screen if the user entered the invalid input for the email and password 
    else if (userNameValid == true && emailValid == false && validPassword == false) 
    {
      userNameWarning.textContent = "";
      // if the user entered no input for email only
      if (emailEmptyFlag == true) 
      {
        emailWarning.textContent = "Email address cannot be empty";
      }
      // if the user entered incorrect format for email only 
      else if (emailFormatFlag == true) 
      {
        emailWarning.textContent = "Email format is not correct";
      } 
      passwordWarning.textContent = "Password cannot be empty";
    }
  });
  
  // Validation check for user name input
  function validateUserName(userName) {
    if (userName.trim() == "") {
      return false;
    } else {
      return true;
    }
  }

  // Validation check for email input
  function validateEmail(email) {
    // validation for no email input
    if (email.trim() == "") {
      emailEmptyFlag = true;
      emailFormatFlag = false;
      return false;
    } 
    // validation for incorrect email format
    else if (
      !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    ) {
      emailEmptyFlag = false;
      emailFormatFlag = true;
      return false;
    } else {
      emailEmptyFlag = false;
      emailFormatFlag = false;
      return true;
    }
  }

  // Validation check for password input
  function validatePassword(password) {
    if (password.trim() == "") {
      return false;
    } else {
      return true;
    }
  }
});
