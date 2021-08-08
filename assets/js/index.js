window.addEventListener('DOMContentLoaded', () => {
    const noTransitionOnLoadElements = document.querySelectorAll(".no-transition-on-load");
    noTransitionOnLoadElements.forEach(element => element.classList.remove("no-transition-on-load"));


    new PureFullPage();

    const h1s = document.querySelectorAll('h1');
    h1s.forEach(h1 => {
        const text = h1.innerText;
        let idx = 0;
        setInterval(() => {
            idx = Math.floor(Math.random() * text.length)
            const newText = Math.random() < 0.05 ? text[idx].repeat(text.length) : text.slice(0, idx) + "&nbsp;" + text.slice(idx + 1, text.length);
            h1.innerHTML = newText;
            idx = idx === text.length - 1 ? 0 : idx + 1;
        }, 500);
    })

    const pages = document.querySelectorAll('.page');

    document.addEventListener('scroll', (e) => {
        const y = window.pageYOffset;
        const distances = Array.from(pages.values()).map(page => {
            const pageY = window.pageYOffset + page.getBoundingClientRect().top;
            return Math.abs(y - pageY);
        })

        const minDistance = Math.min(...distances);


        const minIndex = distances.indexOf(minDistance)
        console.log(minIndex, minDistance)

        const closestPage = pages[minIndex];

        if (minDistance < 200) {
            window.scrollTo({ top: window.pageYOffset + closestPage.getBoundingClientRect().top, behavior: 'smooth' })
        }
    })
});