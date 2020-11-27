// Create variable that stores the delay time of the timeOut
const SENTENCE_DELAY = 1000;
// Create variables that store the elements of the DOM
const subtitleElement = document.querySelector('.subtitle-text');
const subtitleText = subtitleElement.textContent;
const charArray = subtitleText.split('');
// Disappear the original <p> text from the page
subtitleElement.textContent = '';

// Create variable that stores the array of spans
const spanArray = charArray.map((char) => {
  return (subtitleElement.innerHTML += `<span class="faded-chars">${char}</span>`);
});

// Create the timeout for the appearance of spans
let outTimer = setTimeout(() => {
  // Create variable that stores the counter of the spans
  let counter = 0;
  // Set time intervals
  let intervalTimer = setInterval(() => {
    let spansNumbered = document.querySelectorAll('.faded-chars');
    // Create the new class
    spansNumbered[counter].classList.add('fade');
    counter++;
    if (counter === spanArray.length) {
      // Finish the interval
      clearInterval(intervalTimer);
      intervalTimer = null;
      return;
    }
  }, 100);
}, SENTENCE_DELAY);
