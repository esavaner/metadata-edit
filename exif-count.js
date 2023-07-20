const fs = require("fs");
const piexif = require("piexifjs");

const FOLDER = "./assets";

const values = {};
let count = 0;

for (let fileName of fs.readdirSync(FOLDER)) {
  const file = FOLDER + "/" + fileName;
  if (
    fs.lstatSync(file).isFile() &&
    (file.endsWith("jpg") ||
      file.endsWith("png") ||
      file.endsWith("JPG") ||
      file.endsWith("PNG"))
  ) {
    const fileData = fs.readFileSync(file).toString("binary");
    const exif = piexif.load(fileData);

    const val = Math.round(exif.Exif[37386][0] / exif.Exif[37386][1]);

    values[val] = values[val] ? values[val] + 1 : 1;
    count++;
  }
}

console.log(
  Object.entries(values)
    .sort((a, b) => a[1] - b[1])
    .map(([d, e]) => `${d};${e}`)
    .join("\n")
);
console.log(`Count: ${count}`);
