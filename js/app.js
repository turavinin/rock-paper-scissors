const subtitleElement = document.querySelector('.subtitle-text');
const subtitleText = subtitleElement.textContent;
const charArray = subtitleText.split('');
subtitleElement.textContent = '';

const spanArray = charArray.map((char) => {
  return (subtitleElement.innerHTML += `<span class="faded-chars">${char}</span>`);
});

let number = 0;
let timer = setInterval(oneByOne, 50);

function oneByOne() {
  const spansNumbered = document.querySelectorAll('span')[number];
  spansNumbered.classList.add('fade');
  number++;
  if (number === spanArray.length) {
    finish();
    return;
  }
}

function finish() {
  clearInterval(timer);
  timer = null;
}
