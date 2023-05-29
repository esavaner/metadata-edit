const { parse, addHours, format } = require("date-fns");
const fs = require("fs");
const piexif = require("piexifjs");

const FOLDER = "./assets";

for (let fileName of fs.readdirSync(FOLDER)) {
  const file = FOLDER + "/" + fileName;
  if (
    fs.lstatSync(file).isFile() &&
    (file.endsWith("jpg") ||
      file.endsWith("png") ||
      file.endsWith("JPG") ||
      file.endsWith("PNG"))
  ) {
    console.log(fileName);
    const fileData = fs.readFileSync(file).toString("binary");
    const exif = piexif.load(fileData);
    const newExif = JSON.parse(JSON.stringify(exif));

    const oldDateString = newExif.Exif["36867"];
    const oldDate = parse(oldDateString, "yyyy:MM:dd HH:mm:ss", new Date());
    const newDate = addHours(oldDate, 1);
    const newDateString = format(newDate, "yyyy:MM:dd HH:mm:ss");
    newExif.Exif["36867"] = newDateString;
    newExif.Exif["36868"] = newDateString;

    let fileBuffer = Buffer.from(
      piexif.insert(piexif.dump(newExif), fileData),
      "binary"
    );
    fs.writeFileSync(file, fileBuffer);
  }
}
