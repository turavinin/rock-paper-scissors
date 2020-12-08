/* --------------------------------- TIMERS --------------------------------- */

const SENTENCE_APPARITION_DELAY = 2600;
const CHARACTER_INTERVAL = 100;
const FINAL_SENTENCE_APPARITION_DELAY = 3000;

/* ------------------------------- PAGE LOADER ------------------------------ */
window.onload = () => {
  startSentence(document.querySelector('.subtitle-text'));
  blockTheMainButtons();
};

/* ------------------------------ DOM VARIABLES ----------------------------- */

const subtitleWrapper = document.querySelector('.subtitle');
const subtitleElement = document.querySelectorAll('.subtitle-text');
const gameWrapper = document.querySelector('.game-faded-out');
const finalSentence = document.querySelector('.final-subtitle-text');
const buttons = document.querySelectorAll('.btn-circles');
const playerCircle = document.querySelector('.btn-player');
const computerCircle = document.querySelector('.btn-alien');
const postGameSentences = document.querySelectorAll('.post-game-sentence');
const humanWinSetence = document.querySelector('.human-win');
const alienWinSetence = document.querySelector('.alien-win');
const skipButton = document.querySelector('.skip-button');
const restartBtn = document.querySelector('.btn-restart');
const modal = document.getElementById('myModal');
const btnRules = document.querySelector('.btn-rules');
const closeRules = document.querySelector('.close');

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
finalCharOfLastIntroSentence.addEventListener('transitionend', () => {
  displayFinalSentence();
  skipButton.classList.add('disable-intro');
});

// Display final sentence and display the Game UI
function displayFinalSentence() {
  enableMainButtons(100);
  setTimeout(() => {
    finalSentence.classList.add('final-fade-in'); // Fade-in final sentence
    gameWrapper.classList.add('game-fade-in'); // Fade-in the game UI
    btnRules.classList.add('display-btn-rules');
  }, FINAL_SENTENCE_APPARITION_DELAY);
}

/* -------------------------------- LISTENERS / UI EVENTS ------------------------------- */

// Listen for the end of shine animation of main buttons
buttons.forEach((e) => {
  e.addEventListener('animationend', () => {
    displayPlayerElectedCircles(e);
    blockTheMainButtons();
    disappearElectedCircles();
    enableMainButtons(2500);
  });
});

skipButton.addEventListener('click', (e) => {
  skipIntro(); // Skip the intro
  enableMainButtons(100);
  e.target.classList.add('disable-intro'); // Disappear the skip button
  btnRules.classList.add('display-btn-rules');
});

restartBtn.addEventListener('click', () => {
  window.location.reload();
});

// Listeners for rules button
btnRules.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeRules.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

/* -------------------------------- FUNCTIONS ------------------------------- */

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
function enableMainButtons(timer) {
  setTimeout(() => {
    // Enable main buttons
    buttons.forEach((button) => {
      button.classList.remove('disable');
    });
  }, timer);
}

// Display Post-game Sentence and Restart Button
function displayPostGameSentence(winnerSentence) {
  gameWrapper.classList.remove('game-fade-in'); // Fade-out the game UI
  finalSentence.classList.remove('final-fade-in'); // Fade-out final sentence

  setTimeout(() => {
    winnerSentence.classList.add('display-sentence');
    displayRestarButton(); // Display restart button
  }, 2000);
}

// Display restart button
function displayRestarButton() {
  restartBtn.classList.add('display-restart-button');
}

// Skip intro
function skipIntro() {
  subtitleWrapper.classList.add('disable-intro');
  finalSentence.classList.add('final-fade-in'); // Fade-in final sentence
  gameWrapper.classList.add('game-fade-in'); // Fade-in the game UI
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

function game() {
  buttons.forEach((e) => {
    e.addEventListener('click', () => {
      let playerChoise = optionsToElect[e.id];
      let computerChoiseNumber = computerSelection();
      let computerChoise = optionsToElect[computerChoiseNumber];
      // Display circle elected by computer

      // Shine clicked button
      shinesButton(e);

      // Timeout for the start of the game
      setTimeout(() => {
        // Show computer elected button
        displayComputerElectedCircle(computerChoiseNumber);

        // Play the round
        playRound(playerChoise, computerChoise);

        if (playerScore == 5) {
          // Timer to slowdown the restart of the game
          playerCircle.addEventListener('transitionend', () => {
            document.querySelector('.final-subtitle-text').textContent =
              'You win the game!';
          });
          setTimeout(() => {
            document.querySelector('.human-number').textContent = playerScore;
            document.querySelector('.alien-number').textContent = alienScore;
            displayPostGameSentence(humanWinSetence);
          }, 3000);
        } else if (alienScore == 5) {
          playerCircle.addEventListener('transitionend', () => {
            document.querySelector('.final-subtitle-text').textContent =
              'You lose the game!';
          });

          // Timer to slowdown the restart of the game
          setTimeout(() => {
            document.querySelector('.human-number').textContent = playerScore;
            document.querySelector('.alien-number').textContent = alienScore;
            displayPostGameSentence(alienWinSetence);
          }, 3000);
        }
      }, 1500);
    });
  });
}

function playRound(playerChoise, computerChoise) {
  if (playerChoise == computerChoise) {
    // Timer to slowdown the change of the count
    setTimeout(() => {
      document.querySelector('.final-subtitle-text').textContent = `It's a tie`;
    }, 1000);
    return;
  } else if (
    (playerChoise == optionsToElect[0] &&
      computerChoise == optionsToElect[2]) ||
    (playerChoise == optionsToElect[1] &&
      computerChoise == optionsToElect[0]) ||
    (playerChoise == optionsToElect[2] && computerChoise == optionsToElect[1])
  ) {
    playerScore += 1;

    // Timer to slowdown the change of the count
    setTimeout(() => {
      document.querySelector('.final-subtitle-text').textContent =
        'You win the round!';
      document.querySelector('.human-number').textContent = playerScore;
    }, 1000);
    return;
  } else {
    alienScore += 1;

    // Timer to slowdown the change of the count
    setTimeout(() => {
      document.querySelector('.final-subtitle-text').textContent =
        'You lose the round!';
      document.querySelector('.alien-number').textContent = alienScore;
    }, 1000);

    return;
  }
}

game();
