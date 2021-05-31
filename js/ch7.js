//Project: A Robot
//mail-delivery robot picking up and dropping off parcels

//Meadowfield Village
//11 places with 14 roads
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

//tell us what can be reached from each place
//given array of edges, create a map object that
//  for each node, stores an array of connected nodes
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);

//the fact that something sounds like an object doesn't mean that it SHOULD be an object in your program

//we just need the robot's current location and the collection of undelivered parcels with current location and destination address
//don't CHANGE state when the robot moves but compute a NEW state for the situation after the move

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    //check whether there's a road from the current place to the destination
    if (!roadGraph[this.place].includes(destination)) {
      //if not, return old state
      return this;
    } else {
      let parcels = this.parcels
        //create new state with destination as robot's new place
        .map((p) => {
          //mpove parcels with map
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        //deliver with filter
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState("Post Office", [
  { place: "Post Office", address: "Alice's House" },
]);
let next = first.move("Alice's House");

// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);

//Persistent data

let obF = Object.freeze({ value: 5 });
obF.value = 10;
// console.log(obF.value);
obF.value = 21;
// console.log(obF.value);

//A robot is a function that takes a VillageState object and returns the name of a nearby place

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

//randomly walk and pick up parcels, and eventually deliver them all
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

//create new state with parcels
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    //pick new places when it finds one that's equal to the address
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

// runRobot(VillageState.random(), randomRobot);

//Mail truck's route
//find route that passes all places in the village, then run that route twice
const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

//takes maximum of 26 turns (twice the 13 step route)

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

//Pathfinding

function findRoute(graph, from, to) {
  //work list: array of places to explore next
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      //return finished route if one of the places is the goal
      if (place == to) return route.concat(place);
      // if we haven't look at this place before, add it to the work list
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

//
function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

//EXERCISES
//Measuring a Robot

function countSteps(state, robot, memory) {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length == 0) return steps; //once all packages are delivered, return how many steps it took the robot
    let action = robot(state, memory); //state being dataset
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0;
  let total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot 1 needed ${total1 / 100} steps per task`);
  console.log(`Robot 2 needed ${total2 / 100}`);
}
// compareRobots(routeRobot, [], goalOrientedRobot, []);

//Robot efficiency
function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    //describe a route for every parcel
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };
      }
    });
    //determines the precedence a route gets when choosing
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }
  return { direction: route[0], memory: route.slice(1) };
}
// compareRobots(lazyRobot, [], goalOrientedRobot, []);

//Persistent group

class PGroup {
  constructor(members) {
    this.members = members;
  }
  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.members.concat([value]));
  }
  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter((m) => m !== value));
  }
  has(value) {
    return this.members.includes(value);
  }
}
PGroup.empty = new PGroup([]);
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
// console.log(b.has("b"));
// console.log(a.has("b"));
// console.log(b.has("a"));
