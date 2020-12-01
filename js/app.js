// TIMERS
const SENTENCE_APPARITION_DELAY = 2600;
const CHARACTER_INTERVAL = 100;
const FINAL_SENTENCE_APPARITION_DELAY = 3000;

// PAGE LOADER
window.onload = startSentence(document.querySelector('.subtitle-text'));

// FADE IN AND FADE OUT WELCOME TEXT
// Create variable to store the text element <p>
const subtitleElement = document.querySelectorAll('.subtitle-text');

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
  }, 2500); // timer to fade out the sentence
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

// FINAL SUBTITLE APARRITION
let finalChar = document.querySelector('.subtitle').lastElementChild
  .lastElementChild;

finalChar.addEventListener('transitionend', displayFinalSubtitle);

function displayFinalSubtitle() {
  let finalSubtitle = document.querySelector('.final-subtitle-text');
  setTimeout(() => {
    finalSubtitle.classList.add('final-fade-in');
  }, FINAL_SENTENCE_APPARITION_DELAY);
}
