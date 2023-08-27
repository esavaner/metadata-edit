const fs = require("fs");

const SRC_FOLDER = "./input";
const MATCH_FOLDER = "./output";
const TO_REMOVE = ".RAF";
const TO_BASE_ON = ".JPG";

const to_match = {};
const to_trim = {};

for (let fileName of fs.readdirSync(SRC_FOLDER)) {
  const file = SRC_FOLDER + "/" + fileName;
  if (fileName.endsWith(TO_BASE_ON)) {
    to_match[fileName.replace(TO_BASE_ON, "")] = file;
  }
}

for (let fileName of fs.readdirSync(MATCH_FOLDER)) {
  const file = MATCH_FOLDER + "/" + fileName;
  if (fileName.endsWith(TO_REMOVE)) {
    to_trim[fileName.replace(TO_REMOVE, "")] = file;
  }
}

for (const [key, val] of Object.entries(to_trim)) {
  if (!to_match[key]) {
    fs.unlinkSync(val);
  }
}
