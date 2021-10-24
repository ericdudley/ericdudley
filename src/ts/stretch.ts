const beginTimeS = 15;
const betweenSetTimeS = 15;
const breakTimeS = 7;
const repTimeS = 30;
const maxSet = 3;
const maxRep = 5;
const stepDurationMs = 1000;
type Sound =
  | "begin"
  | "rep_start"
  | "rep_end"
  | "set_end"
  | "set_start"
  | "end";

type Side = "L" | "R";

const say = (sound: Sound) => {
  console.log(sound);
};

const initStretch = () => {
  const button: HTMLButtonElement = document.querySelector("#stretch-button");
  const timeElement: HTMLHeadingElement =
    document.querySelector("#stretch-time");
  const innerElement: HTMLDivElement = document.querySelector(
    "#stretch-inner-circle"
  );
  const repDashElements = document.querySelectorAll<HTMLDivElement>(
    ".stretch__rep__dashes__dash"
  );
  const setDashElements = document.querySelectorAll<HTMLDivElement>(
    ".stretch__set__dashes__dash"
  );

  timeElement.innerText = `${repTimeS}s`;

  let isActive = false;
  let isBreak = false;
  let currentRep = 0;
  let currentSide = "R";
  let currentSet = 0;
  let currentTime = 0;
  let currentStartTime = 0;
  let lastStepTimestamp = 0;

  const updateDOM = () => {
    for (let i = 0; i < repDashElements.length; i += 1) {
      if (!isActive) {
        repDashElements[i].dataset.status = "";
        repDashElements[i].innerHTML = "";
      } else {
        if (i + 1 < currentRep) {
          repDashElements[i].dataset.status = "done";
          repDashElements[i].innerHTML = "";
        } else if (i + 1 === currentRep) {
          repDashElements[i].dataset.status = "active";
          repDashElements[i].innerHTML = `<span>${currentSide}</span>`;
        } else {
          repDashElements[i].dataset.status = undefined;
          repDashElements[i].innerHTML = "";
        }
      }
    }

    for (let i = 0; i < setDashElements.length; i += 1) {
      if (!isActive) {
        setDashElements[i].dataset.status = "";
      } else {
        if (i + 1 < currentSet) {
          setDashElements[i].dataset.status = "done";
        } else if (i + 1 === currentSet) {
          setDashElements[i].dataset.status = "active";
        } else {
          setDashElements[i].dataset.status = undefined;
        }
      }
    }
    timeElement.innerText = `${currentTime}s`;
    const progress = isActive
      ? 50 +
        50 *
          ((isBreak ? currentTime : currentStartTime - currentTime) /
            currentStartTime)
      : 100;

    innerElement.style.width = `${progress}%`;
    innerElement.style.height = `${progress}%`;
  };

  const step = () => {
    if (!isActive) {
      return;
    }

    currentTime -= 1;

    if (isBreak) {
      if (currentTime === 0) {
        isBreak = false;
        currentTime = repTimeS;
        currentStartTime = repTimeS;
        say("rep_start");
      }
    } else {
      if (currentTime === 0) {
        if (currentSide === "R") {
          currentSide = "L";
          currentTime = breakTimeS;
          currentStartTime = breakTimeS;
          isBreak = true;
          say("rep_end");
        } else {
          currentRep += 1;
          currentSide = "R";

          if (currentRep === maxRep + 1) {
            currentRep = 1;
            currentSet += 1;
            currentTime = betweenSetTimeS;
            currentStartTime = betweenSetTimeS;
            isBreak = true;
            say("set_end");
          } else {
            currentTime = breakTimeS;
            currentStartTime = breakTimeS;
            isBreak = true;
            say("rep_end");
          }

          if (currentSet === maxSet + 1) {
            end();
          }
        }
      }
    }

    updateDOM();
  };

  const stepInterval = setInterval(() => {
    if (!lastStepTimestamp) {
      lastStepTimestamp = Date.now();
      step();
    } else {
      const stepCount = Math.round(
        (Date.now() - lastStepTimestamp) / stepDurationMs
      );
      console.log(stepCount);
      for (let _ = 0; _ < stepCount; _ += 1) {
        step();
      }
      lastStepTimestamp = Date.now();
    }
  }, 1000);

  const start = () => {
    button.classList.add("pause");
    repDashElements.forEach((elem) => elem.classList.remove("hidden"));
    setDashElements.forEach((elem) => elem.classList.remove("hidden"));
    isActive = true;
    currentRep = 1;
    currentSet = 1;
    currentTime = beginTimeS;
    currentStartTime = beginTimeS;
    currentSide = "R";
    isBreak = true;
    updateDOM();
    say("begin");
  };

  const end = () => {
    button.classList.remove("pause");
    repDashElements.forEach((elem) => elem.classList.add("hidden"));
    setDashElements.forEach((elem) => elem.classList.add("hidden"));
    isActive = false;
    isBreak = false;
    currentTime = repTimeS;
    currentStartTime = repTimeS;
    currentRep = maxRep;
    currentSet = maxSet;
    currentSide = "";
    updateDOM();
    say("end");
  };

  const onButtonClick = (e: MouseEvent) => {
    if (isActive) {
      end();
    } else {
      start();
    }
    e.preventDefault();
  };
  button.addEventListener("click", onButtonClick);
  button.addEventListener("touchstart", onButtonClick);
};

export default initStretch;
