let { readFile } = require("fs").promises;

// readFile("../file.txt", "utf8", (error, text) => {
//   if (error) throw error;
//   console.log("The file contains: ", text);
// });

// readFile("../file.txt", (error, buffer) => {
//   if (error) throw error;
//   console.log(
//     "The file contained",
//     buffer.length,
//     "bytes.",
//     "The first byte is: ",
//     buffer[0]
//   );
// });

readFile("../file.txt", "utf8").then((text) =>
  console.log("The file contains: ", text)
);
