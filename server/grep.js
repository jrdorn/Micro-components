//statSync asynchronously returns info about given file path
//readFileSync synchronously reads file and returns content
//readdirSync synchronously reads contents of a directory
const { statSync, readdirSync, readFileSync } = require("fs");

//first cmd line arg as regular expression
let regex = new RegExp(process.argv[2]);

//further cmd line args as files to search
for (let file of process.argv.slice(3)) {
  search(file);
}

function search(file) {
  let stats = statSync(file);
  if (stats.isDirectory()) {
    //search all files and subdirectories
    for (let f of readdirSync(file)) {
      search(file + "/" + f);
    }
  } else if (regex.test(readFileSync(file, "utf8"))) {
    //output the names of any file whose content matches regex
    console.log(file, "is a match");
  }
}
