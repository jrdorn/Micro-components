const { request } = require("http");
// let requestStream = request(
//   {
//     hostname: "eloquentjavascript.net",
//     path: "/20_node.html",
//     method: "GET",
//     headers: { Accept: "text/html" },
//   },
//   (response) => {
//     console.log("Server responded with status code", response.statusCode);
//   }
// );
// requestStream.end();

request(
  {
    hostname: "localhost",
    port: 8000,
    method: "POST",
  },
  (response) => {
    response.on("data", (chunk) => process.stdout.write(chunk.toString()));
  }
).end("Hello server");
