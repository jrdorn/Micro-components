const { createServer } = require("http");
const Router = require("./router");
const ecstatic = require("ecstatic");

const router = new Router();
const defaultHeaders = { "Content-Type": "text/plain" };

//handlers return promises that resolve to objects describing the response

class SkillShareServer {
  constructor(talks) {
    this.talks = talks;
    this.version = 0;
    this.waiting = [];

    let fileServer = ecstatic({ root: "./public" });
    this.server = createServer((request, response) => {
      let resolved = router.resolve(this, request);
      if (resolved) {
        resolved
          .catch((error) => {
            if (error.status != null) return error;
            return { body: String(error), status: 500 };
          })
          .then(({ body, status = 200, headers = defaultHeaders }) => {
            response.writeHead(status, headers);
            response.end(body);
          });
      } else {
        fileServer(request, response);
      }
    });
  }
  start(port) {
    this.server.listen(port);
  }
  stop() {
    this.server.close();
  }
}

//Talks

const talkPath = /^\/talks\/([^\/]+)$/;

router.add("GET", talkPath, async (server, title) => {
  if (title in server.talks) {
    return {
      body: JSON.stringify(server.talks[title]),
      headers: { "Content-Type": "application/json" },
    };
  } else {
    return { status: 404, body: `No talk '${title}' found` };
  }
});

router.add("DELETE", talkPath, async (server, title) => {
  if (title in server.talks) {
    delete server.talks[title];
    server.updated();
  }
  return { status: 204 };
});

function readStream(stream) {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("error", reject);
    stream.on("data", (chunk) => (data += chunk.toString()));
    stream.on("end", () => resolve(data));
  });
}

router.add("PUT", talkPath, async (server, title, request) => {
  let requestBody = await readStream(request);
  let talk;
  try {
    talk = JSON.parse(requestBody);
  } catch (_) {
    return { status: 400, body: "Invalid JSON" };
  }

  if (
    !talk ||
    typeof talk.presenter != "string" ||
    typeof talk.summary != "string"
  ) {
    return { status: 400, body: "Bad talk data" };
  }
  server.talks[title] = {
    title,
    presenter: talk.presenter,
    summary: talk.summary,
    comments: [],
  };
  server.updated();
  return { status: 204 };
});

router.add(
  "POST",
  /^\/talks\/([^\/]+)\/comments$/,
  async (server, title, request) => {
    let requestBody = await readStream(request);
    let comment;
    try {
      comment = JSON.parse(requestBody);
    } catch (_) {
      return { status: 400, body: "Invalid JSON" };
    }

    if (
      !comment ||
      typeof comment.author != "string" ||
      typeof comment.message != "string"
    ) {
      return { status: 400, body: "Bad comment data" };
    } else if (title in server.talks) {
      server.talks[title].comments.push(comment);
      server.updated();
      return { status: 204 };
    } else {
      //trying to add comment to nonexistent talk returns 404
      return { status: 404, body: `No talk '${title}' found` };
    }
  }
);

//Long polling support

SkillShareServer.prototype.talkResponse = function () {
  let talks = [];
  for (let title of Object.keys(this.talks)) {
    talks.push(this.talks[title]);
  }
  return {
    body: JSON.stringify(talks),
    headers: {
      "Content-Type": "application/json",
      ETag: `"${this.version}"`,
      "Cache-Control": "no-store",
    },
  };
};

//look at request headers to see if If-None-Match or Prefer headers are present
router.add("GET", /^\/talks$/, async (server, request) => {
  let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
  let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
  if (!tag || tag[1] != server.version) {
    //no tag given or tag doesn't match current version -> return list of talks
    return server.talkResponse();
  } else if (!wait) {
    return { status: 304 }; //not modified
  } else {
    //if request is conditional and talks didn't change, delay response or respond immediately
    return server.waitForChanges(Number(wait[1]));
  }
});

//set a timer and respond with 304 when request has waited long enough
SkillShareServer.prototype.waitForChanges = function (time) {
  return new Promise((resolve) => {
    this.waiting.push(resolve);
    setTimeout(() => {
      if (!this.waiting.includes(resolve)) return;
      this.waiting = this.waiting.filter((r) => r != resolve);
      resolve({ status: 304 });
    }, time * 1000);
  });
};

//increase version property and wake up all waiting requests
SkillShareServer.prototype.updated = function () {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach((resolve) => resolve(response));
  this.waiting = [];
};

//||Disk Persistence
const { readFileSync, writeFile } = require("fs");

const fileName = "./talks.json";

function loadTalks() {
  let json;
  try {
    json = JSON.parse(readFileSync(fileName, "utf8"));
  } catch (e) {
    json = {};
  }
  return Object.assign(Object.create(null), json);
}

SkillShareServer.prototype.updated = function () {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach((resolve) => resolve(response));
  this.waiting = [];

  writeFile(fileName, JSON.stringify(this.talks), (e) => {
    if (e) throw e;
  });
};

//serves files from "public" subdirectory alongside
//talk-managing interface under the /talks URL
new SkillShareServer(loadTalks()).start(8000);

//Comment Field Resets
class Talk {
  constructor(talk, dispatch) {
    this.comments = elt("div");
    this.dom = elt(
      "section", {className: "talk"},
      elt("h2", null, talk.title, " ", elt("button", {
        type: "button",
        onclick: () => dispatch({type: "deleteTalk",
                                 talk: talk.title})
      }, "Delete")),
      elt("div", null, "by ",
          elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      this.comments,
      elt("form", {
        onsubmit(event) {
          event.preventDefault();
          let form = event.target;
          dispatch({type: "newComment",
                    talk: talk.title,
                    message: form.elements.comment.value});
          form.reset();
        }
      }, elt("input", {type: "text", name: "comment"}), " ",
          elt("button", {type: "submit"}, "Add comment")));
    this.syncState(talk);
  }

  syncState(talk) {
    this.talk = talk;
    this.comments.textContent = '';
    for (let comment of talk.comments) {
      this.comments.appendChild(renderComment(comment));
    }
  }

  class SkillShareApp{
    constructor(state, dispatch) {
      this.dispatch = dispatch;
      this.talkDOM = elt('div', {className: 'talks'});
      this.talkMap = Object.create(null);
      this.dom = elt('div', null, renderUserField(state.user, dispatch), this.talkDOM, renderTalkForm(dispatch));
      this.syncState(state);
    }
    syncState(state) {
      if (state.talks == this.talks) return;
      this.talks = state.talks;

      for (let talk of state.talks) {
        let cmp = this.talkMap[talk.title];
        if (cmp && cmp.talk.presenter == talk.presenter && cmp.talk.summary == talk.summary){
          cmp.syncState(talk);
        } else {
          if (cmp) cmp.dom.remove();
          cmp = new Talk(talk, this.dispatch);
          this.talkMap[talk.title] = cmp;
          this.talkDOM.appendChild(cmp.dom);
        }
      }
      for (let title of Object.keys(this.talkMap)) {
        if (!state.talks.some(talk => talk.title == title)) {
          this.talkMap[title].dom.remove();
          delete this.talkMap[title];
        }
      }
    }
  }