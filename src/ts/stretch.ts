import { Howl, Howler } from "howler";
import stretch_sounds from "../audio/stretch_sounds.mp3";

const beginTimeS = 15;
const betweenSetTimeS = 15;
const breakTimeS = 7;
const repTimeS = 8;
const maxSet = 3;
const maxRep = 5;
const stepDurationMs = 1000;
type Sound =
  | "session_started"
  | "begin"
  | "stop_switch_sides"
  | "stop_rep_number"
  | "completed"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "stop_set_number"
  | "starting_set_number"
  | "in"
  | "seconds"
  | "session_paused"
  | "session_resumed"
  | "session_ended";

type Side = "L" | "R";

const initStretch = () => {
  const title: HTMLButtonElement = document.querySelector("#stretch-title");

  const button: HTMLButtonElement = document.querySelector("#stretch-button");
  const timeElement: HTMLHeadingElement =
    document.querySelector("#stretch-time");
  const innerElement: HTMLDivElement = document.querySelector(
    "#stretch-inner-circle"
  );
  const outerElement: HTMLDivElement = document.querySelector(
    "#stretch-outer-circle"
  );
  const repDashElements = document.querySelectorAll<HTMLDivElement>(
    ".stretch__rep__dashes__dash"
  );
  const setDashElements = document.querySelectorAll<HTMLDivElement>(
    ".stretch__set__dashes__dash"
  );

  const soundTimes: Record<Sound, [number, number]> = {
    "1": [23847, 406],
    "2": [25066, 464],
    "3": [26215, 430],
    "4": [27365, 499],
    "5": [28514, 499],
    "6": [29536, 650],
    "7": [30604, 592],
    "8": [31777, 348],
    "9": [32891, 557],
    "10": [33913, 476],
    session_started: [337, 3471],
    begin: [5968, 476],
    stop_switch_sides: [7605, 1462],
    stop_rep_number: [10310, 1567],
    completed: [13340, 662],
    stop_set_number: [15035, 1550],
    starting_set_number: [18170, 1521],
    in: [20619, 453],
    seconds: [22338, 545],
    session_paused: [35840, 1161],
    session_resumed: [38208, 1103],
    session_ended: [40623, 1150],
  };
  const soundPromises = {};

  const howl = new Howl({
    src: [stretch_sounds],
    sprite: soundTimes,
    onend: (soundId) => {
      if (soundPromises[soundId]) {
        soundPromises[soundId].res();
        soundPromises[soundId] = undefined;
      }
    },
  });

  const promisePlay = (sound: Sound): Promise<void> => {
    return new Promise((res, rej) => {
      const soundId = howl.play(sound);
      soundPromises[soundId] = { res, rej };
    });
  };

  const say = (sounds: Sound[]) => {
    if (sounds.length === 0) {
      return;
    }
    const currentSound = sounds[0];
    promisePlay(currentSound).then(() => {
      say(sounds.slice(1));
    });
  };

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
        say(["begin"]);
      }
    } else {
      if (currentTime === 0) {
        if (currentSide === "R") {
          currentSide = "L";
          currentTime = breakTimeS;
          currentStartTime = breakTimeS;
          isBreak = true;
          say(["stop_switch_sides"]);
        } else {
          currentRep += 1;
          currentSide = "R";

          if (currentRep === maxRep + 1) {
            currentRep = 1;
            currentSet += 1;
            currentTime = betweenSetTimeS;
            currentStartTime = betweenSetTimeS;
            isBreak = true;
            say([
              "stop_set_number",
              String(currentSet - 1) as Sound,
              "completed",
              "starting_set_number",
              String(currentSet) as Sound,
              "in",
              "10",
              "seconds",
            ]);
          } else {
            currentTime = breakTimeS;
            currentStartTime = breakTimeS;
            isBreak = true;
            say([
              "stop_rep_number",
              String(currentRep - 1) as Sound,
              "completed",
            ]);
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
      for (let _ = 0; _ < stepCount; _ += 1) {
        step();
      }
      lastStepTimestamp = Date.now();
    }
  }, 1000);

  const start = () => {
    button.classList.add("pause");
    title.classList.add("hidden");
    outerElement.dataset.status = "active";
    say(["session_started"]);
    setTimeout(() => {
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
    }, 1000);
  };

  const end = () => {
    button.classList.remove("pause");
    title.classList.remove("hidden");

    outerElement.dataset.status = "";
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
    howl.stop();
    say(["session_ended"]);
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
