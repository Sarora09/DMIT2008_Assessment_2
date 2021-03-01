/* 
  File service will read from or write into the users.json file.
*/
const fs = require("fs");
const path = require("path");

exports.getFileContents = (filePath) => {
  let fileContents = JSON.parse(
    fs.readFileSync(path.join(__dirname, filePath))
  );
  return fileContents;
};

exports.writeFileContents = (filePath, data) => {
  let fileContents = this.getFileContents(filePath);
  fileContents.push(data);
  fileContents = JSON.stringify(fileContents);
  fs.writeFileSync(path.join(__dirname, filePath), fileContents);
};
