function saveData(filePath, outputFolderName, overwrite) {
  const filePath = path.join(filePath, outputFolderName);
  const filePath = path.join(__dirname, "write", "id-imie-nazwisko.txt");
  if (overwrite) {
    console.log("Folder nadpisany.");
  } else {
    console.log("Folder zapisany.");
  }
}

saveData("read", "script.js");

const fs = require("fs");

const path = require("path");
