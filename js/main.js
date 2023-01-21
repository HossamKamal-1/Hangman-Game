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
// if there is 2 segment  word make space between 2 words
if (choosenWord.indexOf(" ") !== -1) {
  document.querySelectorAll(".guess-word")[
    choosenWord.indexOf(" ") - 1
  ].style.marginRight = "20px";
}

// console.log(choosenWord);

let index = 0;
// removing spaces from the word and making it uppercase
choosenWord = choosenWord.replaceAll(" ", "").toUpperCase();
lettersElements.forEach((letterElement) => {
  letterElement.onclick = checker;
  document.addEventListener("keypress", (e) => {
    if (
      e.key.toUpperCase() === letterElement.innerHTML &&
      lettersContainer.style.pointerEvents !== "none"
    ) {
      letterElement.classList.toggle("active");
      setTimeout(() => {
        letterElement.classList.toggle("active");
      }, 150);
      letterElement.click();
    }
  });
});

function checker() {
  if (choosenWord.indexOf(this.innerHTML) !== -1) {
    document.querySelectorAll(".guess-word")[
      choosenWord.indexOf(this.innerHTML)
    ].innerHTML = this.innerHTML;
    choosenWord = choosenWord.replace(
      choosenWord.charAt(choosenWord.indexOf(this.innerHTML)),
      "."
    );
    // checkinng wether all guess-words in html are not empty [ has character in html ]
    if (
      Array.from(document.querySelectorAll(".guess-word")).every(
        (guessWord) => guessWord.innerHTML !== ""
      )
    ) {
      // win
      lettersContainer.style.pointerEvents = "none";
      setTimeout(() => {
        document.querySelector(".result-overlay").style.cssText = `
        color: green;
        display:flex;`;
        document
          .querySelector(".result-overlay")
          .prepend(document.createTextNode("احسنت"));
      }, 1000);
    }
  } else {
    if (index < document.querySelectorAll(".comp").length) {
      document.querySelectorAll(".comp")[index++].classList.add("visible");
    }
    // checking if all component elements has class visible or not
    if (
      Array.from(document.querySelectorAll(".comp")).every((el) =>
        el.classList.contains("visible")
      )
    ) {
      lettersContainer.style.pointerEvents = "none";
      document.querySelector(".result-overlay").style.cssText = `
      color: red;
      display:flex`;
      document
        .querySelector(".result-overlay")
        .prepend(document.createTextNode("you lost"));
    }
  }
}

document.querySelector(".retry").addEventListener("click", (e) => {
  location.reload();
});
