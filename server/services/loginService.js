/* 
  Login service will authenticate an email and password.It returns a true or false response.
  False returns will keep users on the login page with errors.
  True returns will redirect user to the dashboard.html
*/
const fileService = require('./fileService')
exports.authenticate = (credential)=>{
   const {email, password} = {...credential}
   const users = fileService.getFileContents('../data/users.json');
 const authUser =  users.reduce((authObj, user)=>{
    if(user.email === email){
      authObj.validEmail = true;
    }
    if(user.password === password){
      authObj.validPassword = true;
    }
    if(authObj.validEmail===true && authObj.validPassword===true){
        authObj.user = user;
    }        
    return authObj
   }, {validEmail:false, validPassword:false, user:null})
   
   const auth0 = authUser.user ? {user:authUser.user}: formatErrors(authUser);
   return auth0
}
 
const formatErrors = function(user){
  let passwordWarning = "";
  let emailWarning = "";
  if(user.validPassword === false){passwordWarning= `password doesn't match`}
  if(user.validEmail === false){ emailWarning= `email doesn't match`}
  return {user:null, emailWarning, passwordWarning}
}
