/* --------------------------------- TIMERS --------------------------------- */

const SENTENCE_APPARITION_DELAY = 2600;
const CHARACTER_INTERVAL = 100;
const FINAL_SENTENCE_APPARITION_DELAY = 3000;

/* ------------------------------- PAGE LOADER ------------------------------ */
/* window.onload = startSentence(document.querySelector('.subtitle-text')); */

/* ------------------------------ DOM VARIABLES ----------------------------- */

const subtitleWrapper = document.querySelector('.subtitle');
const subtitleElement = document.querySelectorAll('.subtitle-text');
const gameWrapper = document.querySelector('.game-faded-out');
const finalSentence = document.querySelector('.final-subtitle-text');
const buttons = document.querySelectorAll('.btn-circles');
const playerCircle = document.querySelector('.btn-player');
const computerCircle = document.querySelector('.btn-alien');

/* ---------------------------------- INTRO --------------------------------- */

// Create a spans of characters for each intro sentences
subtitleElement.forEach((sentence) => {
  sentence.innerHTML = sentence.textContent
    .split('')
    .map((char) => {
      return `<span class="faded-chars">${char}</span>`;
    })
    .join('');
});

// Initialize intro and next intro sentences
function startSentence(sentence) {
  if (!sentence) {
    //Check if there is a next sentence to initialize
    return;
  } else {
    setTimeout(() => {
      fadeInFadeOut(sentence); // Initialize sentence
    }, SENTENCE_APPARITION_DELAY); // Timer to fade-in the sentence
  }
}

// Function to fade-out a sentence
function fadeOut(sentence) {
  setTimeout(() => {
    sentence.childNodes.forEach((char) => {
      char.classList.remove('fade-in');
    });
  }, 2000); // Timer to fade-out the sentence
}

// Fade-in and fade-out each intro sentence
function fadeInFadeOut(currentSentence) {
  let counter = 0;
  let fadeInTimer = setInterval(() => {
    currentSentence.childNodes[counter].classList.add('fade-in');
    counter++;
    if (counter == currentSentence.childNodes.length) {
      clearInterval(fadeInTimer);
      fadeOut(currentSentence); // Fade-out the current sentence
      let nextSentence = currentSentence.nextElementSibling; // Target the next sentence
      startSentence(nextSentence); // Start fade-in the next intro sentence
    }
  }, CHARACTER_INTERVAL); // Timer to fade-in each character of the sentence
}

/* ------------------------ FINAL SENTENCE & GAME UI APPARITION ----------------------- */

// Listen the end of transition of the final character of intro
const finalCharOfLastIntroSentence =
  subtitleWrapper.lastElementChild.lastElementChild;
finalCharOfLastIntroSentence.addEventListener(
  'transitionend',
  displayFinalSentence
);

// Display final sentence and display the Game UI
function displayFinalSentence() {
  setTimeout(() => {
    finalSentence.classList.add('final-fade-in'); // Fade-in final sentence
    gameWrapper.classList.add('game-fade-in'); // Fade-in the game UI
  }, FINAL_SENTENCE_APPARITION_DELAY);
}

/* -------------------------------- UI EVENTS ------------------------------- */
//LISTENERS
// Listen for the click events on the main buttons
buttons.forEach((e) => {
  e.addEventListener('click', () => {
    // Strat game
    setTimeout(() => {
      playRound(e);
    }, 1500);
    // Shine the clicked button
    shinesButton(e);
  });
});

// Lister for the end of shine animation of main buttons
buttons.forEach((e) => {
  e.addEventListener('animationend', () => {
    displayPlayerElectedCircles(e);
    blockTheMainButtons();
    disappearElectedCircles();
    enableMainButtons();
  });
});

// FUNCTIONS
// Shines the main buttons when clicked
function shinesButton(e) {
  e.classList.remove('shine');
  setInterval(() => {
    e.classList.add('shine');
  }, 200);
}

// Display player chosen circle
function displayPlayerElectedCircles(e) {
  playerCircle.classList.add('display-player-btn');

  // Fill button with corresponding image
  document.querySelector(
    '.btn-player'
  ).lastElementChild.innerHTML = `${e.lastElementChild.innerHTML}`;

  // Shines computers the elected new circle
  shinesButton(playerCircle);
}

// Display computer chosen circle
function displayComputerElectedCircle(computerResult) {
  // Fill button with corresponding image
  buttons.forEach((e) => {
    if (computerResult == e.id) {
      computerCircle.lastElementChild.innerHTML = `${e.lastElementChild.innerHTML}`;
      computerCircle.classList.add('display-player-btn');
      shinesButton(computerCircle);
    }
  });
}
// Dissapear Elected Circles
function disappearElectedCircles() {
  setTimeout(() => {
    // Disappear player circle
    playerCircle.classList.remove('display-player-btn');

    // Disappear alien circle
    computerCircle.classList.remove('display-player-btn');
  }, 2500);
}

// Block the click event for each main button
function blockTheMainButtons() {
  buttons.forEach((button) => {
    button.classList.add('disable');
  });
}

// Enable click events for each main button
function enableMainButtons() {
  setTimeout(() => {
    // Enable main buttons
    buttons.forEach((button) => {
      button.classList.remove('disable');
    });
  }, 2500);
}

/* ------------------------------- GAME LOGIC ------------------------------- */

// Array with options
const optionsToElect = ['Rock', 'Paper', 'Scissor'];

// Variables of players count
let playerScore = 0;
let alienScore = 0;

// Function of computer random selection
function computerSelection() {
  // Variable = random election of array length
  let randomElection = Math.floor(Math.random() * optionsToElect.length);
  // Return the random election of the array
  return randomElection;
}

// One round game
function playRound(e) {
  // Player election
  let playerChoise = optionsToElect[e.id];

  // Computer election
  let computerChoiseNumber = computerSelection();
  let computerChoise = optionsToElect[computerChoiseNumber];

  // Display computer chosen circle
  displayComputerElectedCircle(computerChoiseNumber);

  setTimeout(() => {
    if (playerChoise == computerChoise) {
      document.querySelector('.final-subtitle-text').textContent = `It's a tie`;
      return;
    } else if (
      (playerChoise == optionsToElect[0] &&
        computerChoise == optionsToElect[2]) ||
      (playerChoise == optionsToElect[1] &&
        computerChoise == optionsToElect[0]) ||
      (playerChoise == optionsToElect[2] && computerChoise == optionsToElect[1])
    ) {
      document.querySelector('.final-subtitle-text').textContent =
        'You win the round!';
      playerScore += 1;
      document.querySelector('.human-number').textContent = playerScore;
      return playerScore;
    } else {
      document.querySelector('.final-subtitle-text').textContent =
        'You lose the round!';
      alienScore += 1;
      document.querySelector('.alien-number').textContent = alienScore;
      return alienScore;
    }
  }, 1000);
}
