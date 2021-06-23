//references to DOM elements to manipulate
const searchTerm = document.querySelector(".search");
const searchForm = document.querySelector(".form");
const submitBtn = document.querySelector(".submit");

const section = document.querySelector("section");

//when tab loads, start
window.onload = onClientLoad;

//load and initialize API
function onClientLoad() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad);
}

//YouTube Data API
function onYouTubeApiLoad() {
  gapi.client.setApiKey("AIzaSyApv7L2cryPaNd2-zUVk0lrJ-y6PJpAGp0");
  searchForm.addEventListener("submit", search);
}

function search(e) {
  //prevent form from submitting
  e.preventDefault();

  //create search request
  let request = gapi.client.youtube.search.list({
    //type of data the response will include
    part: "snippet",
    //number of results
    maxResults: 10,
    //search term
    q: searchTerm.value,
  });

  //send request and specify function to run when response returns
  request.execute(onSearchResponse);
}

//response passed in as param
function onSearchResponse(response) {
  //empty <section>
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  //store search results in variable
  let results = response.items;

  //display videos in results
  for (let i = 0; i < results.length; i++) {
    displayVideo(results[i], i);
  }
}

function displayVideo(result, i) {
  let vid = document.createElement("div");
  vidId = "vid" + i;
  vid.id = vidId;
  section.appendChild(vid);

  let player = new YT.Player(vidId, {
    height: "360",
    width: "480",
    videoId: result.id.videoId,
    events: {
      onReady: onPlayerReady,
    },
  });

  function onPlayerReady(e) {
    let myId = e.target.a.id;
    let duration = e.target.getDuration();
    if (duration === 0) {
      console.log(`Video ${myId} cannot be played, so it was deleted`);
      section.removeChild(e.target.a);
    } else {
      let myId = e.target.a.id;
      console.log(`Video ${myId} ready to play`);
    }
  }
}
