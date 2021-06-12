let row1 = document.getElementById("row1");
let row2 = document.getElementById("row2");
let row3 = document.getElementById("row3");

//random index that is less than or equal to max
function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

let reel = {
  symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
  spin() {
    if (this.position === null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position === null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

let slotMachine = {
  reels: [
    (leftReel = Object.create(reel, {
      position: {
        value: null,
        writable: true,
      },
    })),
    (midReel = Object.create(reel, {
      position: {
        value: null,
        writable: true,
      },
    })),
    (rightReel = Object.create(reel, {
      position: {
        value: null,
        writable: true,
      },
    })),
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    let reel1 = `${reel.symbols[(leftReel.position - 1 + 7) % 7]} ${
      reel.symbols[(midReel.position - 1 + 7) % 7]
    } ${reel.symbols[(rightReel.position - 1 + 7) % 7]}`;
    row1.innerHTML = reel1;
    let reel2 = `${reel.symbols[(leftReel.position + 7) % 7]} ${
      reel.symbols[(midReel.position + 7) % 7]
    } ${reel.symbols[(rightReel.position + 7) % 7]}`;
    row2.innerHTML = reel2;

    let reel3 = `${reel.symbols[(leftReel.position + 1 + 7) % 7]} ${
      reel.symbols[(midReel.position + 1 + 7) % 7]
    } ${reel.symbols[(rightReel.position + 1 + 7) % 7]}`;
    row3.innerHTML = reel3;
  },
};

function spinIt() {
  slotMachine.spin();
  slotMachine.display();
}
spinIt();
