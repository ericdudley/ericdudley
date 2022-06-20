const repeat = (str: string, count: number) => {
  let newStr = '';
  for (let i = 0; i < count; i += 1) {
    newStr += str;
  }
  return newStr;
};

const initHeaderAnimation = () => {
  const h1s = document.querySelectorAll('h1');
  for (let i = 0; i < h1s.length; i += 1) {
    const text = h1s[i].dataset?.text || '';
    setInterval(() => {
      let idx = Math.floor(Math.random() * text.length);
      for (
        let i = 0;
        i < text.length
        && !'abcdefghijklmnopqrstuvwxyz'.includes(text[idx].toLowerCase());
        i += 1
      ) {
        idx = Math.floor(Math.random() * text.length);
      }
      const shouldRepeatAll = Math.random() < 0.05;
      const newText = shouldRepeatAll
        ? repeat(text[idx], text.length)
        : `${text.slice(0, idx)}&nbsp;${text.slice(idx + 1, text.length)}`;
      h1s[i].innerHTML = newText;
    }, 500);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const noTransitionOnLoadElements = document.querySelectorAll(
    '.no-transition-on-load',
  );
  noTransitionOnLoadElements.forEach((element) => element.classList.remove('no-transition-on-load'));

  initHeaderAnimation();
});
