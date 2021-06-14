function toggle(...args) {
  let i = args.length - 1;

  return function rT() {
    i++;
    if (i === args.length) {
      i = 0;
    }
    return console.log(args[i]);
  };
}

let hello = toggle("hello");
let onOff = toggle("on", "off");
let speed = toggle("slow", "medium", "fast");

hello(); // "hello"
hello(); // "hello"

onOff(); // "on"
onOff(); // "off"
onOff(); // "on"

speed(); // "slow"
speed(); // "medium"
speed(); // "fast"
speed(); // "slow"
