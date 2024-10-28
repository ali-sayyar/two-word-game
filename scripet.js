let levelSpan = document.querySelector(".level");
let lengthSpan = document.querySelector(".length");
let timerSpan = document.querySelector(".time");
let lengthInfoSpan = document.querySelector(".info-length");
let scoreSpan = document.querySelector(".score");
let startBtn = document.querySelector(".area button");
let wordsArea = document.querySelector(".words-show");
let wordSpan = document.querySelector(".word-span");
let inp = document.querySelector(".word-input");
let levelInp = Array.from(document.querySelectorAll(".level-bar input"));

let wordArr = [
  "Length",
  "Width",
  "Heighte",
  "Border",
  "Python",
  "Html",
  "Black",
  "White",
  "Blue",
  "Yellow",
];

let objLevel = {
  easy: 9,
  normal: 7,
  hard: 5,
};

let levelName = "normal";
let sec;

let fristTime = 9;
let score = 0;
let word;
let timer;
let promptName;
let endGame;

inp.onpaste = function () {
  return false;
};

startBtn.onclick = function () {
  promptName = prompt("Add Your Name");
  this.remove();
  inp.focus();

  for (i = 0; i < levelInp.length; i++) {
    if (levelInp[i].checked) {
      levelName = levelInp[i].value;
      console.log("cheched");
    }
  }
  sec = objLevel[levelName];
  document.querySelector(".level-bar").onclick = function () {
    return false;
  };
  levelSpan.innerHTML = levelName;
  lengthSpan.innerHTML = wordArr.length;
  lengthInfoSpan.innerHTML = wordArr.length;
  scoreSpan.innerHTML = score;

  // time Down Function
  timeDown(sec + 5);
  // show word
  createWord();
  // Enter Function
  inp.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      clearInterval(timer);
      timeDown(sec);
      checkWord();
      inp.value = "";
    }
  });
};

function timeDown(t) {
  let time = t;
  timer = setInterval(() => {
    time--;
    timerSpan.innerHTML = time;
    if (time <= 0) {
      clearInterval(timer);
      lose();
    }
  }, 1000);
}

function createWord() {
  let random = Math.floor(Math.random() * wordArr.length);
  word = wordArr.splice(random, 1).join();
  wordSpan.innerHTML = word;
  // show all words in area
  createAllWords();
}

function createAllWords() {
  wordsArea.innerHTML = "";
  for (i = 0; i < wordArr.length; i++) {
    let span = document.createElement("span");
    let text = document.createTextNode(wordArr[i]);
    span.append(text);
    span.className = "arr-word";
    wordsArea.appendChild(span);
  }
}

function checkWord() {
  if (wordArr.length == 0) {
    clearInterval(timer);
    endGame = "Finsh Game";
    localVal();
    alert("Finsh, You'ar Win");
    window.location.reload();
  }
  if (inp.value.toLocaleLowerCase() == word.toLocaleLowerCase()) {
    score++;
    scoreSpan.innerHTML = score;
    createWord();
  } else {
    lose();
  }
}

function lose() {
  endGame = "Game Over";
  localVal();
  alert("Game Over, Your right Answer Is : " + score);
  window.location.reload();
}

// function localVal () {
//     let obj = {
//         'name':promptName || 'undefuind',
//         'game':endGame,
//         'level':levelName,
//         'score':score,
//         'date': new Date
//     }
//     let af
//     if (localStorage.getItem('user') != null){
//         af = [...JSON.parse(localStorage.getItem('user')),obj]
//     }else{
//         af = [obj]
//     }
//     localStorage.setItem('user',JSON.stringify(af))
// }

// let userArea = document.querySelector('.user')
// function createLocalVal(){
//     let alluser = JSON.parse(localStorage.getItem('user'))
//     console.log(alluser)
//     for (let i=0;i<alluser.length;i++){
//         let div = document.createElement('div')
//         let text = `User Name: ${alluser[i]['name']}, Level:${alluser[i]['level']}, Right Answer:${alluser[i]['score']}, And ${alluser[i]['game']}`
//         let text2 = document.createTextNode(text)
//         let date = `<span>${alluser[i]['date']}</span>`
//         div.innerHTML = date
//         div.appendChild(text2)
//         userArea.appendChild(div)
//     }
// }
// if(localStorage.getItem('user')){
//     createLocalVal()
// }

// الطريقة الثانيه وربما الافضل
let arr2 = [];
if (localStorage.getItem("word-game-user")) {
  arr2 = JSON.parse(localStorage.getItem("word-game-user"));
}
function localVal() {
  let obj = {
    name: promptName || "undefuind",
    game: endGame,
    level: levelName,
    score: score,
    date: new Date(),
  };
  arr2.push(obj);
  localStorage.setItem("word-game-user", JSON.stringify(arr2));
}

let userArea = document.querySelector(".user");
function createLocalVal() {
  for (let i = 0; i < arr2.length; i++) {
    let div = document.createElement("div");
    let text = `User Name: ${arr2[i]["name"]}, Level:${arr2[i]["level"]}, Right Answer:${arr2[i]["score"]}, And ${arr2[i]["game"]}`;
    let text2 = document.createTextNode(text);
    let date = `<span>${arr2[i]["date"]}</span>`;
    div.innerHTML = date;
    div.appendChild(text2);
    userArea.appendChild(div);
  }
}
if (arr2.length > 0) {
  createLocalVal();
}
