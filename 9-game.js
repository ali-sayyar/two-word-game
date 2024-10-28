// {
//   let lvlSpan = document.querySelector(".lvl");
//   let scndSpan = document.querySelector(".seconds");
//   let time = document.querySelector(".time span");
//   let score = document.querySelector(".score .total");
//   let scorePlus = document.querySelector(".score .got");
//   let start = document.querySelector(".start");
//   let input = document.querySelector(".input");
//   let wordCantrey = document.querySelector(".upcoming-words");
//   let theWord = document.querySelector(".the-word");
//   let finish = document.querySelector(".finish");

//   const words = [
//     "Hello",
//     "Code",
//     // "Town",
//     // "Testing",
//     // "Youtube",
//     // "Twitter",
//     // "Github",
//     // "Python",
//     // "Scala",
//     // "Styling",
//     // "Cascade",
//     // "Coding",
//     // "Funny",
//     // "Working",
//     // "Task",
//     // "Runner",
//     // "Roles",
//     // "Test",
//     // "Rust",
//     // "Playing",
//   ];

//   const lvls = {
//     Easy: 8,
//     Normal: 5,
//     Hard: 3,
//   };

//   let defaultLvlName = "Normal";
//   let defaultLvl = lvls[defaultLvlName];

//   lvlSpan.innerHTML = defaultLvlName;
//   scndSpan.innerHTML = defaultLvl;
//   time.innerHTML = defaultLvl;
//   score.innerHTML = words.length;

//   input.onpaste = function () {
//     return false;
//   };

//   start.onclick = function () {
//     this.remove();
//     input.focus();

//     play();
//   };
//   function play() {
//     let word = words[Math.floor(Math.random() * words.length)];
//     theWord.innerHTML = word;
//     words.splice(words.indexOf(word), 1);
//     wordCantrey.innerHTML = "";
//     words.forEach((el) => {
//       let div = document.createElement("div");
//       div.classList = "";
//       div.append(el);
//       wordCantrey.appendChild(div);
//     });
//     input.value = "";
//     replay();
//   }
//   function replay() {
//     time.innerHTML = defaultLvl;
//     let timer = setInterval(() => {
//       time.innerHTML--;
//       if (time.innerHTML === "0") {
//         clearInterval(timer);
//         if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
//           if (words.length > 0) {
//             play();
//           } else {
//             let div = document.createElement("div");
//             div.classList = "good";
//             div.append("Good");
//             finish.appendChild(div);
//           }
//         } else {
//           let div = document.createElement("div");
//           div.classList = "bad";
//           div.append("Game Over");
//           finish.appendChild(div);
//         }
//       }
//     }, 1000);
//   }
// }

let lvlSpan = document.querySelector(".lvl");
let scndSpan = document.querySelector(".seconds");
let time = document.querySelector(".time span");
let score = document.querySelector(".score .total");
let scorePlus = document.querySelector(".score .got");
let start = document.querySelector(".start");
let input = document.querySelector(".input");
let wordCantrey = document.querySelector(".upcoming-words");
let theWord = document.querySelector(".the-word");
let finish = document.querySelector(".finish");
let btn = document.querySelector(".btn");
let btnlvl = document.querySelector(".lvl-btn");
let levels = document.querySelector(".levels");
let lvlinp = document.querySelector(".lvl-inp");
let ok = document.querySelector(".level button");
let level = document.querySelectorAll(".level .li");
let setinp = document.querySelector(".set-input");
let setbtn = document.querySelector(".set-btn");

let words = [
  "Hello",
  "Code",
  "Town",
  "Testing",
  "Youtube",
  "Twitter",
  "Github",
  "Python",
  "Scala",
  "Styling",
  "Cascade",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

if (localStorage.getItem("newwords")) {
  words = localStorage.getItem("newwords").split(",");
}

let lvls = {
  Easy: 8,
  Normal: 5,
  Hard: 3,
  Auto: localStorage.getItem("auto-value"),
};

let defaultLvlName = "Normal";
if (localStorage.getItem("lvl")) {
  defaultLvlName = localStorage.getItem("lvl");
}
let defaultLvl = lvls[defaultLvlName];

lvlSpan.innerHTML = defaultLvlName;
scndSpan.innerHTML = defaultLvl;
time.innerHTML = defaultLvl;
score.innerHTML = words.length;

input.onpaste = function () {
  return false;
};
start.onclick = function () {
  start.remove();
  levels.remove();
  setinp.remove();
  setbtn.remove();

  input.focus();

  play();

  input.addEventListener("keypress", function (e) {
    if (
      e.key == "Enter" &&
      input.value.toLowerCase() == theWord.innerHTML.toLowerCase()
    ) {
      time.innerHTML = defaultLvl;
      play();
      scorePlus.innerHTML++;
    }
    if (scorePlus.innerHTML == score.innerHTML) {
      theWord.remove();
      let div = document.createElement("div");
      div.classList = "good";
      div.append("Good");
      finish.appendChild(div);
      input.remove();
      clearInterval(timer);
    }
  });

  let timer = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML <= 0) {
      clearInterval(timer);
      input.remove();
      let div = document.createElement("div");
      div.classList = "bad";
      div.append("Game Over");
      finish.appendChild(div);
      btn.style.display = "block";
    }
  }, 1000);
};

function play() {
  let word = words[Math.floor(Math.random() * words.length)];
  theWord.innerHTML = word;
  words.splice(words.indexOf(word), 1);
  wordCantrey.innerHTML = "";
  words.forEach((el) => {
    let div = document.createElement("div");
    div.classList = "";
    div.append(el);
    wordCantrey.appendChild(div);
  });
  input.value = "";
}

btn.onclick = function () {
  location.reload();
};

btnlvl.onclick = function () {
  document.querySelector(".levels .level").classList.toggle("display");
};

level.forEach((el) => {
  el.onclick = function () {
    if (lvlinp.value > 0) {
      lvls["Auto"] = lvlinp.value;
      localStorage.setItem("auto-value", lvlinp.value);
    }
    defaultLvlName = el.dataset.lvl;
    localStorage.setItem("lvl", defaultLvlName);
    defaultLvl = lvls[defaultLvlName];
    lvlSpan.innerHTML = defaultLvlName;
    scndSpan.innerHTML = defaultLvl;
    time.innerHTML = defaultLvl;
    btnlvl.click();
  };
});

setbtn.onclick = function () {
  let v = setinp.value;
  console.log(v);
  let newwords = v.split(",").join(" ");
  console.log(newwords);
  newwords = newwords.split(" ");

  for (let i = 0; i < newwords.length; i++) {
    newwords[i] = newwords[i].split(/[^a-z]/gi).join("");
  }
  newwords = newwords.filter((el) => {
    return el.length > 2;
  });
  if (newwords.length > 0) {
    words = newwords;
    localStorage.setItem("newwords", newwords);
  }
  score.innerHTML = words.length;
  console.log(localStorage.getItem("newwords"));
};
