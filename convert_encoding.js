const fs = require("fs");

const inputFile = "./input.txt";
const outputFile = "./output.txt";

fs.readFile(inputFile, "binary", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Convert windows-1250 to UTF-8
  const isoBuffer = Buffer.from(data, "binary");
  const utf8String = new TextDecoder("windows-1250").decode(isoBuffer);

  // Write the converted string to an output file
  fs.writeFile(outputFile, utf8String, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Conversion successful. Converted string saved to output.txt");
  });
});
