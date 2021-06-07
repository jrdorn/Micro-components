const { createServer } = require("http");

const methods = Object.create(null);

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
    //translate error into response object when request handler promise is rejected
    .catch((error) => {
      if (error.status != null) return error;
      return { body: String(error), status: 500 };
    })
    //status defaults to 200 (OK)
    //content type defaults to plain text
    .then(({ body, status = 200, type = "text/plain" }) => {
      response.writeHead(status, { "Content-Type": type });
      //pipe method forwards content from readable to writable stream
      if (body && body.pipe) body.pipe(response);
      //if body isn't a readable stream it's passed directly to the end method
      else response.end(body);
    });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405, //code used to indicate server refuses to handle a method
    body: `Method ${request.method} not allowed.`,
  };
}

//figure out which file path corresponds to a request URL

const { parse } = require("url");
const { resolve, sep } = require("path");

const baseDirectory = process.cwd(); //current working directory

function urlPath(url) {
  let { pathname } = parse(url);
  let path = resolve(decodeURIComponent(pathname).slice(1)); //verifies result is below the working directory
  if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
    //forbidden when path doesn't start with the base
    throw { status: 403, body: "Forbidden" };
  }
  return path;
}

//GET requests
//when a request file is nonexistent, return HTTP 404

const { createReadStream } = require("fs");
const { stat, readdir } = require("fs").promises;
const mime = require("mime");

methods.GET = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path); //async because it has to touch the disk and could take a while
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return { status: 404, body: "File not found" };
  }
  if (stats.isDirectory()) {
    //read array of files and return to client
    return { body: (await readdir(path)).join("\n") };
  } else {
    //for normal files, return readable stream as body and the content type
    return { body: createReadStream(path), type: mime.getType(path) };
  }
};

//DELETE requests

const { rmdir, unlink } = require("fs").promises;

methods.DELETE = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return { status: 204 }; //HTTP response contains no data
  }
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return { status: 204 }; //HTTP response contains no data
};

/**
 Deleting nonexistent file returns success code because the objective is already 
 fulfilled

 Requests should be idempotent: making the same request multiple times produces
 the same result as making it once
 */

//PUT requests

const { createWriteStream } = require("fs");

function pipeStream(from, to) {
  //create promise around the outcome of calling pipe
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to); //pipe data from readable (request) to writable (file)
  });
}

methods.PUT = async function (request) {
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return { status: 204 }; //HTTP response contains no data
};
