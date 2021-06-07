const { createServer } = require("http");

// let server = createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.write(`
//     <h1>Hola!</h1>
//     <p>I think you asked for <code>${request.url}</code></p>
//     `);
//   response.end();
// });
// server.listen(8000);
// console.log("Listening! (port 8000)");

createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  request.on("data", (chunk) => response.write(chunk.toString().toUpperCase()));
  request.on("end", () => response.end());
}).listen(8000);
