const gameContainer = document.getElementById("game"); //establishes the HTML container element where the game cards will be created
let card1 = null; // declares card variables
let card2 = null;
let cardsFlipped = 0; //establishes a variable for how many cards have been flipped, with a starting number of zero.
let noClicking = false; //establishes a variable to determine whether or not clicking is allowed. Starting state for noClicking is false, meaning clicking is allowed at the start of the game.

//declare a constant (unchanging variable) that establishes an array of COLORS for the cards including red, green, blue, etc.
const COLORS = [
  "red",
  "cyan",
  "teal",
  "orange",
  "purple",
  "red",
  "cyan",
  "teal",
  "orange",
  "purple"
];

// shuffle array based on Fisher Yates algorithm

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.contains("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  if (cardsFlipped === COLORS.length) alert ("YOU WON!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
