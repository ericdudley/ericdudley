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
        let j = 0;
        j < text.length
        && !'abcdefghijklmnopqrstuvwxyz'.includes(text[idx].toLowerCase());
        j += 1
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

const initProjects = () => {
  const container = document.querySelector<HTMLDivElement>('.subdomains');
  const domain = document.querySelector<HTMLDivElement>('.domain > h3');
  const projects = ['stretch', 'old', 'benfords-law', '401k'];

  let mouseIsDown = false;
  let originalClientY = 0;
  let originalTop = 0;

  container?.addEventListener('mousedown', (e) => {
    originalClientY = e.clientY;
    originalTop = container.style.top ? parseInt(container.style.top, 10) : 0;
    mouseIsDown = true;
  });

  window?.addEventListener('mousemove', (e) => {
    const height = container?.getBoundingClientRect().height;
    if (mouseIsDown && container && height && domain) {
      const newTop = Math.max(
        Math.min(originalTop + (e.clientY - originalClientY), height / 2 - 18),
        -height / 2 + 18,
      );
      container.style.top = `${newTop}px`;

      const { children } = container;
      let hasActive = false;
      for (let i = 0; i < children.length; i += 1) {
        const child = children[i] as HTMLHeadingElement;
        const distance = Math.abs(
          child.getBoundingClientRect().top
          - domain?.getBoundingClientRect().top,
        );
        child.style.opacity = `${Math.max(0, 1 - Math.abs(distance / 96))}`;
        if (distance === 0) {
          child.classList.add('active');
          hasActive = true;
        } else {
          child.classList.remove('active');
        }
      }

      if (hasActive) {
        domain.classList.add('active');
      } else {
        domain.classList.remove('active');
      }
    }
  });

  window?.addEventListener('mouseup', () => {
    mouseIsDown = false;
  });

  for (let i = 0; i < projects.length; i += 1) {
    const projectElement = document.createElement('h3');
    projectElement.innerHTML = projects[i];
    container?.appendChild(projectElement);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const noTransitionOnLoadElements = document.querySelectorAll(
    '.no-transition-on-load',
  );
  noTransitionOnLoadElements.forEach((element) => element.classList.remove('no-transition-on-load'));

  initHeaderAnimation();
  initProjects();
});
