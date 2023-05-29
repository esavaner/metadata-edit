const fs = require("fs");
const piexif = require("piexifjs");

const FOLDER = "./assets";

for (let fileName of fs.readdirSync(FOLDER)) {
  const file = FOLDER + "/" + fileName;
  if (fs.lstatSync(file).isFile()) {
    console.log(fileName);
    const fileData = fs.readFileSync(file).toString("binary");
    const exif = piexif.load(fileData);
    console.log(exif.Exif);
  }
}
