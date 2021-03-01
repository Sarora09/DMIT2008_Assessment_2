/* 
  Registration service will authenticate an email and return a true or false response.
  True returns will input the user data on the users.json file.
  False returns will give an error to the user that the email already exists on the users.jsonfile.
*/

const fileService = require("./fileService");
const users = require("../data/users.json");
let flagFileAccess = false;
exports.registration = (credential) => {
  let emailFlag = false;
  const { fullname, email, password, uuidCode } = { ...credential };
  let recievedEmail = email;
  let usernameFound = users.find(function (element) {
    if (element.email === recievedEmail) {
      emailFlag = true;
    }
  });
  if (emailFlag==false) {
    flagFileAccess = true;
    fileService.writeFileContents("../data/users.json", credential);
  } else {
    flagFileAccess = false;
  }
  return flagFileAccess;
};





  
  
