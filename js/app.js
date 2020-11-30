// Create variable to store the text element <p>
const subtitleElement = document.querySelector('.subtitle-text');

// Modify the innerHTML of <p>
subtitleElement.innerHTML = subtitleElement.textContent
  .split('')
  .map((char) => {
    return `<span class="faded-chars">${char}</span>`;
  })
  .join('');

// Create a variable to store the spans
let charsToFade = document.querySelectorAll('.faded-chars');

function fadeOut() {
  setTimeout(() => {
    document.querySelectorAll('.faded-chars').forEach((char) => {
      char.classList.remove('fade-in');
    });
  }, 3000);
}

function startFade() {
  let counter = 0;
  let fadeInTimer = setInterval(() => {
    let i = document.querySelectorAll('.faded-chars')[counter];
    i.classList.add('fade-in');
    console.log;
    counter++;
    if (counter == charsToFade.length) {
      clearInterval(fadeInTimer);
      fadeOut();
    }
  }, 100);
}

startFade();
