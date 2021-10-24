const repeat = (str: string, count: number) => {
  let newStr = "";
  for (let i = 0; i < count; i += 1) {
    newStr += str;
  }
  return newStr;
};

const initHeaderAnimation = () => {
  const h1s = document.querySelectorAll("h1");
  h1s.forEach((h1) => {
    const text = h1.dataset.text;
    let idx = 0;
    setInterval(() => {
      idx = Math.floor(Math.random() * text.length);
      const shouldRepeatAll = Math.random() < 0.05;
      const newText = shouldRepeatAll
        ? repeat(text[idx], text.length)
        : `${text.slice(0, idx)}&nbsp;${text.slice(idx + 1, text.length)}`;
      h1.innerHTML = newText;
      idx = idx === text.length - 1 ? 0 : idx + 1;
    }, 500);
  });
};

export default initHeaderAnimation;
