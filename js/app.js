const SENTENCE_DELAY = 1000;
const completeSubtitle = document.querySelector('#subtitle-text');

completeSubtitle.innerHTML = completeSubtitle.textContent
  .split('')
  .map((letter) => `<span class="letter-subtitle">${letter}</span>`)
  .join('');

let letterSubtitle = document.querySelectorAll('.letter-subtitle');

letterSubtitle.forEach((letter) => {
  letter.addEventListener('transitionend', startNextLetter);
});

function startNextLetter(e) {
  let nextLetter = e.target.nextElementSibling;
  if (nextLetter) {
    nextLetter.classList.add('faded-activated');
  } else {
  }
}

function startSentence(sentenceElement) {
  if (!sentenceElement) {
    return;
  }
  setTimeout(() => {
    sentenceElement
      .querySelector('.letter-subtitle')
      .classList.add('faded-activated');
  }, SENTENCE_DELAY);
}

startSentence(document.querySelector('#subtitle-text'));
