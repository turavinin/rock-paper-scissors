// TIMERS --------------------------------------------------------------------
const SENTENCE_APPARITION_DELAY = 2600;
const CHARACTER_INTERVAL = 100;
const FINAL_SENTENCE_APPARITION_DELAY = 3000;

// PAGE LOADER ---------------------------------------------------------------
/* window.onload = startSentence(document.querySelector('.subtitle-text')); */

// FADE IN AND FADE OUT WELCOME TEXT-------------------------------------
// Create variable to store the text element <p>
const subtitleElement = document.querySelectorAll('.subtitle-text');
const gameWrapper = document.querySelector('.game-faded-out');

// Modify the innerHTML of <p>
subtitleElement.forEach((sentence) => {
  sentence.innerHTML = sentence.textContent
    .split('')
    .map((char) => {
      return `<span class="faded-chars">${char}</span>`;
    })
    .join('');
});

function startSentence(sentence) {
  if (!sentence) {
    //Check if te called sentence doesnt exist
    return;
  } else {
    setTimeout(() => {
      startFadeIn(sentence);
    }, SENTENCE_APPARITION_DELAY); // timer to fade in the sentence
  }
}

function fadeOut(sentence) {
  setTimeout(() => {
    sentence.childNodes.forEach((char) => {
      char.classList.remove('fade-in');
    });
  }, 2000); // timer to fade out the sentence
}

function startFadeIn(currentSentence) {
  let counter = 0;
  let fadeInTimer = setInterval(() => {
    currentSentence.childNodes[counter].classList.add('fade-in');
    counter++;
    if (counter == currentSentence.childNodes.length) {
      clearInterval(fadeInTimer);
      fadeOut(currentSentence); // fade-out the current sentence
      let nextSentence = currentSentence.nextElementSibling; // target the next sentence
      startSentence(nextSentence); // start fade-in the next sentence
    }
  }, CHARACTER_INTERVAL); // timer to fade in each character of the sentence
}

// FINAL SUBTITLE APARRITION ----------------------------------------------------
let finalChar = document.querySelector('.subtitle').lastElementChild
  .lastElementChild;

finalChar.addEventListener('transitionend', displayFinalSubtitle);

function displayFinalSubtitle() {
  let finalSubtitle = document.querySelector('.final-subtitle-text');
  setTimeout(() => {
    finalSubtitle.classList.add('final-fade-in');
    gameWrapper.classList.add('game-fade-in');
  }, FINAL_SENTENCE_APPARITION_DELAY);
}

// GAME -------------------------------------------------------------------------

// ALIEN (COMPUTER) LOGIC ------------
// Global array with options
const optionsToElect = ['Rock', 'Paper', 'Scissor'];

// Variables of players count
let playerScore = 0;
let alienScore = 0;

// Function of alien random selection
function computerSelection() {
  // Variable = random election of array length
  let randomElection = Math.floor(Math.random() * optionsToElect.length);
  // Return the random election of the array
  return randomElection;
}

// HUMAN LOGIC -----------------------
// On click event return the id of the clicked button
const buttons = document.querySelectorAll('.btn-circles');

buttons.forEach((e) => {
  e.addEventListener('click', () => {
    setTimeout(() => {
      playRound(e);
    }, 1500);
    shinesTheChoosen(e);
  });
});

function playRound(e) {
  let playerChoise = optionsToElect[e.id];

  let computerChoiseNumber = computerSelection();
  let computerChoise = optionsToElect[computerChoiseNumber];

  displayComputerCircle(computerChoiseNumber);

  console.log(playerChoise);
  console.log(computerChoise);

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
    } else {
      document.querySelector('.final-subtitle-text').textContent =
        'You lose the round!';
      alienScore += 1;
      document.querySelector('.alien-number').textContent = alienScore;
    }
  }, 1000);
}

// SHINE FUNCTION OF CLICKED BUTTONS --------
function shinesTheChoosen(e) {
  e.classList.remove('shine');
  setInterval(() => {
    e.classList.add('shine');
  }, 200);
}

// DISPLAY PLAYER ELECTED CIRCLE --------
buttons.forEach((e) => {
  e.addEventListener('animationend', () => {
    displayPlayerCircle(e);
  });
});

function displayPlayerCircle(e) {
  const playerCircle = document.querySelector('.btn-player');
  playerCircle.classList.add('display-player-btn');

  // Fill button with corresponding image
  document.querySelector(
    '.btn-player'
  ).lastElementChild.innerHTML = `${e.lastElementChild.innerHTML}`;

  // Shine the elected circle
  shinesTheChoosen(playerCircle);
}

// DISPLAY COMPUTER ELECTED CIRCLE --------
function displayComputerCircle(computerResult) {
  const computerCircle = document.querySelector('.btn-alien');
  /* const randomElection = Math.floor(Math.random() * optionsToElect.length); */

  buttons.forEach((e) => {
    if (computerResult == e.id) {
      computerCircle.lastElementChild.innerHTML = `${e.lastElementChild.innerHTML}`;

      computerCircle.classList.add('display-player-btn');
      shinesTheChoosen(computerCircle);
    }
  });
}

// Listen for dom changes to fade-out the elected buttons
const observeFinalSubtitle = document.querySelector('.final-subtitle-text');

const observer = new MutationObserver((change) => {
  const evt = new CustomEvent('dom-changed', { detail: change });
  document.body.dispatchEvent(evt);
});

observer.observe(observeFinalSubtitle, {
  attributes: true,
  childList: true,
  subtree: true,
});

document.body.addEventListener('dom-changed', () => {
  setTimeout(() => {
    // remove player circle
    const playerCircle = document.querySelector('.btn-player');
    playerCircle.classList.remove('display-player-btn');

    const computerCircle = document.querySelector('.btn-alien');
    computerCircle.classList.remove('display-player-btn');
  }, 500);
});

// DISABLE AND ENABLE BUTTONS
buttons.forEach((e) => {
  e.addEventListener('animationend', () => {
    buttons.forEach((button) => {
      button.classList.add('disable');
    });
  });
});

document.body.addEventListener('dom-changed', () => {
  // enable buttons
  buttons.forEach((button) => {
    button.classList.remove('disable');
  });
});
