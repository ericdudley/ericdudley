const repeat = (str: string, count: number) => (
  Array(count).reduce((newStr) => (`${newStr}${str}`), ''));

const initHeaderAnimation = () => {
  const h1s = document.querySelectorAll('h1');
  h1s.forEach((h1) => {
    const text = h1.innerText;
    let idx = 0;
    setInterval(() => {
      idx = Math.floor(Math.random() * text.length);
      const newText = Math.random() < 0.05 ? repeat(text[idx], text.length) : `${text.slice(0, idx)}&nbsp;${text.slice(idx + 1, text.length)}`;
      h1.setAttribute('innerHTML', newText);
      idx = idx === text.length - 1 ? 0 : idx + 1;
    }, 500);
  });
};

export default initHeaderAnimation;
