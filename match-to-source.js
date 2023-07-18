const fs = require("fs");

const FOLDER = "./Z - Copy";
const TO_REMOVE = ".RAF";
const TO_BASE_ON = ".JPG";

const to_match = {};
const to_trim = {};

for (let fileName of fs.readdirSync(FOLDER)) {
  const file = FOLDER + "/" + fileName;
  if (fileName.endsWith(TO_BASE_ON)) {
    to_match[fileName.replace(TO_BASE_ON, "")] = file;
  } else if (fileName.endsWith(TO_REMOVE)) {
    to_trim[fileName.replace(TO_REMOVE, "")] = file;
  }
}

for (const [key, val] of Object.entries(to_trim)) {
  if (!to_match[key]) {
    fs.unlinkSync(val);
  }
}
