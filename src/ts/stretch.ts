const beginTimeS = 15;
const betweenSetTimeS = 15;
const breakTimeS = 7;
const repTimeS = 30;
const maxSet = 3;
const maxRep = 5;
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
  const repElement: HTMLHeadingElement = document.querySelector("#stretch-rep");
  const setElement: HTMLHeadingElement = document.querySelector("#stretch-set");
  const timeElement: HTMLHeadingElement =
    document.querySelector("#stretch-time");
  const innerElement: HTMLDivElement = document.querySelector(
    "#stretch-inner-circle"
  );

  repElement.innerText = String(maxRep);
  setElement.innerText = String(maxSet);
  timeElement.innerText = `${repTimeS}s`;

  let isActive = false;
  let isBreak = false;
  let currentRep = 0;
  let currentSide = "R";
  let currentSet = 0;
  let currentTime = 0;
  let currentStartTime = 0;

  const updateDOM = () => {
    repElement.innerText = `${currentRep}${currentSide}`;
    setElement.innerText = String(currentSet);
    timeElement.innerText = `${currentTime}s`;
    const progress =
      50 +
      25 *
        ((isBreak ? currentTime : currentStartTime - currentTime) /
          currentStartTime);
    innerElement.style.width = `${progress}%`;
    innerElement.style.height = `${progress}%`;
  };

  const stepInterval = setInterval(() => {
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
  }, 1000);

  const start = () => {
    button.innerText = "End";
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
    button.innerText = "Start";
    isActive = false;
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
