const arrayOfAlphabetLetters = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(index + 65)
);
let lettersContainer = document.querySelector(".letters");
arrayOfAlphabetLetters.forEach((letter) => {
  let letterSpan = document.createElement("span");
  letterSpan.className = "letter-box";
  letterSpan.appendChild(document.createTextNode(letter));
  lettersContainer.appendChild(letterSpan);
});
const wordsObj = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "momento",
    "coco",
    "up",
  ],
  people: [
    "Albert Einstien",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let choosenCateory =
  Object.keys(wordsObj)[
    Math.floor(Math.random() * Object.keys(wordsObj).length)
  ];
let categoryContainer = document.querySelector(".game-info .category span");
categoryContainer.innerHTML = choosenCateory;

let choosenWord =
  wordsObj[choosenCateory][
    Math.floor(Math.random() * wordsObj[choosenCateory].length)
  ];

let lettersElements = document.querySelectorAll(".letter-box");
// generating guess word in document
[...choosenWord.replaceAll(" ", "")].forEach((word) => {
  let guessWordSpan = document.createElement("span");
  guessWordSpan.className = "guess-word";
  document.querySelector(".letters-guess").appendChild(guessWordSpan);
});

let guessWordsSpans = document.querySelectorAll(".guess-word");
// if there is 2 segment  word make space between 2 words
if (choosenWord.indexOf(" ") !== -1) {
  guessWordsSpans[choosenWord.indexOf(" ")].style.marginLeft = "20px";
}

// console.log(choosenWord);
let wrongTries = 0;
let wrongAttemptSpan = document.querySelector(".wrong-attempts span");
let loseComponentsElements = document.querySelectorAll(".comp");
// making copy of the choosen word to display it when player lose
let choosenWordCopy = choosenWord;
let indexOfLoseComponent = 0;
// removing spaces from the word and making it uppercase
choosenWord = choosenWord.replaceAll(" ", "").toUpperCase();
lettersElements.forEach((letterElement) => {
  letterElement.onclick = function () {
    if (choosenWord.indexOf(this.innerHTML) !== -1) {
      playSoundFx("success");
      let indexOfLetter = choosenWord.indexOf(this.innerHTML);
      guessWordsSpans[indexOfLetter].innerHTML = this.innerHTML;
      // replacing character of the choosen word with (.)
      choosenWord = choosenWord.replace(choosenWord[indexOfLetter], ".");
      // checkinng wether all guess-words in html are not empty [ has character in html ]
      checkWinCondition();
    } else {
      wrongAttemptSpan.innerHTML = ++wrongTries;
      this.classList.add("wrong");
      playSoundFx("failure");
      if (indexOfLoseComponent < loseComponentsElements.length) {
        loseComponentsElements[indexOfLoseComponent++].classList.add("visible");
      }
      // checking if all component elements has class visible or not
      checkLoseCondition();
    }
  };
});

document.addEventListener("keydown", keyDownHandler);
document
  .querySelector(".retry")
  .addEventListener("click", (e) => location.reload());

function keyDownHandler(e) {
  lettersElements.forEach((letterElement) => {
    if (
      e.key.toUpperCase() === letterElement.innerHTML &&
      !letterElement.classList.contains("wrong") &&
      lettersContainer.style.pointerEvents !== "none"
    ) {
      letterElement.classList.toggle("active");
      setTimeout(() => {
        letterElement.classList.toggle("active");
      }, 150);
      letterElement.click();
    }
  });
}
function checkWinCondition() {
  if (
    Array.from(guessWordsSpans).every((guessWord) => guessWord.innerHTML !== "")
  ) {
    setTimeout(() => playSoundFx("win"), 600);
    // stop interaction + removing keydown Event Listener when the player win + show msg
    showResultMsg("green", "Well Done");
  }
}
function showResultMsg(color, msg) {
  lettersContainer.style.pointerEvents = "none";
  document.removeEventListener("keydown", keyDownHandler);
  setTimeout(() => {
    document.querySelector(".result-overlay").style.cssText = `
    color: ${color};
    display:flex;`;
    document
      .querySelector(".result-overlay")
      .prepend(document.createTextNode(msg));
  }, 800);
}
function checkLoseCondition() {
  if (
    Array.from(loseComponentsElements).every((el) =>
      el.classList.contains("visible")
    )
  ) {
    setTimeout(() => playSoundFx("lose"), 600);
    // stop interaction + removing keydown Event Listener when the player lose + show msg
    showResultMsg("red", `you lost the word was "${choosenWordCopy}"`);
  }
}

function playSoundFx(soundId) {
  document.getElementById(soundId).currentTime = 0;
  document.getElementById(soundId).play();
}
