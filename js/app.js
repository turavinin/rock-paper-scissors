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

// Create a variable to store the spans
let charsToFade = document.querySelectorAll('.faded-chars');

function fadeOut(sentence) {
  setTimeout(() => {
    sentence.childNodes.forEach((char) => {
      char.classList.remove('fade-in');
    });
  }, 3000);
}

function startFade(sentence) {
  let counter = 0;
  let fadeInTimer = setInterval(() => {
    sentence.childNodes[counter].classList.add('fade-in');
    counter++;
    if (counter == sentence.childNodes.length) {
      clearInterval(fadeInTimer);
      fadeOut(sentence);
      let nextSentence = sentence.nextElementSibling;
      startSentence(nextSentence);
    }
  }, 100);
}

/* function startFade(sentence) {
  let counter = 0;
  let fadeInTimer = setInterval(() => {
    let currentSentence = document.querySelectorAll('.faded-chars')[counter];
    currentSentence.classList.add('fade-in');
    console.log;
    counter++;
    if (counter == charsToFade.length) {
      clearInterval(fadeInTimer);
      fadeOut();
      let nextSentence = subtitleElement.nextElementSibling;
      startSentence(nextSentence);
    }
  }, 100);
}
 */
function startSentence(sentence) {
  if (!sentence) {
    return;
  } else {
    startFade(sentence);
  }
}

startSentence(document.querySelector('.subtitle-text'));

console.log(document.querySelector('.subtitle-text').childNodes);
console.log(document.querySelector('.faded-chars'));
