/* window.onload = startSentence(document.querySelector('.subtitle-text')); */

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
    }, 2600); // timer to fade in the sentence
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
  }, 100); // timer to fade in each character of the sentence
}

const charsToFade = document.querySelectorAll('.faded-chars');

charsToFade.addEventListener.("transitionend", ())
