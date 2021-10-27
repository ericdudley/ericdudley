import { Howl } from 'howler';
import stretchSoundsPath from '../audio/stretch_sounds.mp3';

const beginTimeS = 15;
const betweenSetTimeS = 15;
const breakTimeS = 7;
const repTimeS = 30;
const maxSet = 3;
const maxRep = 5;
const stepDurationMs = 1000;
type Sound =
  | 'session_started'
  | 'begin'
  | 'stop_switch_sides'
  | 'stop_rep_number'
  | 'completed'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'stop_set_number'
  | 'starting_set_number'
  | 'in'
  | 'seconds'
  | 'session_paused'
  | 'session_resumed'
  | 'session_ended'
  | 'dont_give_up'
  | 'youre_doing_a_great_job';

type Side = 'L' | 'R';

const initStretch = () => {
  const title: HTMLButtonElement = document.querySelector('#stretch-title');

  const button: HTMLButtonElement = document.querySelector('#stretch-button');
  const stopButton: HTMLButtonElement = document.querySelector(
    '#stretch-stop-button',
  );
  const optionsButton: HTMLButtonElement = document.querySelector(
    '#stretch-options-button',
  );
  const timeElement: HTMLHeadingElement = document.querySelector('#stretch-time');
  const innerElement: HTMLDivElement = document.querySelector(
    '#stretch-inner-circle',
  );
  const outerElement: HTMLDivElement = document.querySelector(
    '#stretch-outer-circle',
  );
  const repDashElements = document.querySelectorAll<HTMLDivElement>(
    '.stretch__rep__dashes__dash',
  );
  const setDashElements = document.querySelectorAll<HTMLDivElement>(
    '.stretch__set__dashes__dash',
  );

  const soundTimes: Record<Sound, [number, number]> = {
    1: [23847, 406],
    2: [25066, 464],
    3: [26215, 430],
    4: [27365, 499],
    5: [28514, 499],
    6: [29536, 650],
    7: [30604, 592],
    8: [31777, 348],
    9: [32891, 557],
    10: [33913, 476],
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
    dont_give_up: [43247, 975],
    youre_doing_a_great_job: [44536, 1254],
  };
  const positiveSounds: Sound[] = ['dont_give_up', 'youre_doing_a_great_job'];
  const soundPromises = {};

  const howl = new Howl({
    src: [stretchSoundsPath],
    sprite: soundTimes,
    onend: (soundId) => {
      if (soundPromises[soundId]) {
        soundPromises[soundId].res();
        soundPromises[soundId] = undefined;
      }
    },
  });

  const promisePlay = (sound: Sound): Promise<void> => new Promise((res, rej) => {
    howl.stop();
    const soundId = howl.play(sound);
    soundPromises[soundId] = { res, rej };
  });

  const say = (sounds: Sound[], isNestedCall = false) => {
    if (sounds.length === 0) {
      return;
    }
    if (!isNestedCall && Math.random() < 0.05) {
      sounds.push(
        positiveSounds[Math.floor(Math.random() * positiveSounds.length)],
      );
    }
    const currentSound = sounds[0];
    promisePlay(currentSound).then(() => {
      say(sounds.slice(1), true);
    });
  };

  timeElement.innerText = `${repTimeS}s`;

  let isActive = false;
  let isPaused = false;
  let isBreak = false;
  let isOptions = false;
  let currentRep = 0;
  let currentSide: Side = 'R';
  let currentSet = 0;
  let currentTime = 0;
  let currentStartTime = 0;
  let lastStepTimestamp = 0;
  let startTimeout;

  const updateDOM = () => {
    for (let i = 0; i < repDashElements.length; i += 1) {
      if (!isActive) {
        repDashElements[i].dataset.status = '';
        repDashElements[i].innerHTML = '';
      } else if (i + 1 < currentRep) {
        repDashElements[i].dataset.status = 'done';
        repDashElements[i].innerHTML = '';
      } else if (i + 1 === currentRep) {
        repDashElements[i].dataset.status = 'active';
        repDashElements[i].innerHTML = `<span>${currentSide}</span>`;
      } else {
        repDashElements[i].dataset.status = undefined;
        repDashElements[i].innerHTML = '';
      }
    }

    for (let i = 0; i < setDashElements.length; i += 1) {
      if (!isActive) {
        setDashElements[i].dataset.status = '';
      } else if (i + 1 < currentSet) {
        setDashElements[i].dataset.status = 'done';
      } else if (i + 1 === currentSet) {
        setDashElements[i].dataset.status = 'active';
      } else {
        setDashElements[i].dataset.status = undefined;
      }
    }
    timeElement.innerText = `${currentTime}s`;
    const progress = isActive
      ? 50
        + 50
          * ((isBreak ? currentTime : currentStartTime - currentTime)
            / currentStartTime)
      : 100;

    innerElement.style.width = `${progress}%`;
    innerElement.style.height = `${progress}%`;
  };

  const start = () => {
    if (startTimeout) {
      return;
    }
    title.classList.add('hidden');
    outerElement.dataset.status = 'active';
    button.classList.add('pause');
    say(['session_started']);
    startTimeout = setTimeout(() => {
      repDashElements.forEach((elem) => elem.classList.remove('hidden'));
      setDashElements.forEach((elem) => elem.classList.remove('hidden'));
      isActive = true;
      isPaused = false;
      currentRep = 1;
      currentSet = 1;
      currentTime = beginTimeS;
      currentStartTime = beginTimeS;
      currentSide = 'R';
      isBreak = true;
      updateDOM();
    }, 1000);
  };

  const pause = () => {
    button.classList.remove('pause');
    stopButton.classList.add('active');

    say(['session_paused']);
    isPaused = true;
  };

  const resume = () => {
    button.classList.add('pause');
    stopButton.classList.remove('active');
    say(['session_resumed']);
    isPaused = false;
  };

  const end = () => {
    clearTimeout(startTimeout);
    startTimeout = undefined;
    button.classList.remove('pause');
    title.classList.remove('hidden');
    stopButton.classList.remove('active');

    outerElement.dataset.status = '';
    repDashElements.forEach((elem) => elem.classList.add('hidden'));
    setDashElements.forEach((elem) => elem.classList.add('hidden'));
    isActive = false;
    isBreak = false;
    currentTime = repTimeS;
    currentStartTime = repTimeS;
    currentRep = maxRep;
    currentSet = maxSet;
    currentSide = 'R';
    updateDOM();
    say(['session_ended']);
  };

  const step = () => {
    if (!isActive || isPaused) {
      return;
    }

    currentTime -= 1;

    if (isBreak) {
      if (currentTime === 0) {
        isBreak = false;
        currentTime = repTimeS;
        currentStartTime = repTimeS;
        say(['begin']);
      }
    } else if (currentTime === 0) {
      if (currentSide === 'R') {
        currentSide = 'L';
        currentTime = breakTimeS;
        currentStartTime = breakTimeS;
        isBreak = true;
        say(['stop_switch_sides']);
      } else {
        currentRep += 1;
        currentSide = 'R';

        if (currentRep === maxRep + 1) {
          currentRep = 1;
          currentSet += 1;
          currentTime = betweenSetTimeS;
          currentStartTime = betweenSetTimeS;
          isBreak = true;
          say([
            'stop_set_number',
            String(currentSet - 1) as Sound,
            'completed',
            'starting_set_number',
            String(currentSet) as Sound,
            'in',
            '10',
            'seconds',
          ]);
        } else {
          currentTime = breakTimeS;
          currentStartTime = breakTimeS;
          isBreak = true;
          say([
            'stop_rep_number',
            String(currentRep - 1) as Sound,
            'completed',
          ]);
        }

        if (currentSet === maxSet + 1) {
          end();
        }
      }
    }

    updateDOM();
  };

  setInterval(() => {
    if (!lastStepTimestamp) {
      lastStepTimestamp = Date.now();
      step();
    } else {
      const stepCount = Math.round(
        (Date.now() - lastStepTimestamp) / stepDurationMs,
      );
      for (let _ = 0; _ < stepCount; _ += 1) {
        step();
      }
      lastStepTimestamp = Date.now();
    }
  }, 1000);

  const onButtonClick = (e: MouseEvent) => {
    if (isActive) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      start();
    }
    e.preventDefault();
  };

  const onStopButtonClick = (e: MouseEvent) => {
    end();
    e.preventDefault();
  };

  const onOptionsButtonClick = (e: MouseEvent) => {
    if (isOptions) {
      isOptions = false;
      innerElement.classList.remove('expanded');
      button.classList.remove('hidden');
      innerElement.innerHTML = '';
    } else {
      isOptions = true;
      innerElement.classList.add('expanded');
      button.classList.add('hidden');
      innerElement.innerHTML = `
        <div>
          <div>
            <h3>Set 1</h3>
            <input type="number"></input>
            <input type="number"></input>
            <input type="number"></input>
          </div>
          <div>
            <h3>Set 2</h3>
            <input type="number"></input>
            <input type="number"></input>
            <input type="number"></input>
          </div>
          <div>
            <h3>Set 3</h3>
            <input type="number"></input>
            <input type="number"></input>
            <input type="number"></input>
          </div>
        </div>
      `;
    }

    e.preventDefault();
  };

  button.addEventListener('click', onButtonClick);
  button.addEventListener('touchstart', onButtonClick);
  stopButton.addEventListener('click', onStopButtonClick);
  stopButton.addEventListener('touchstart', onStopButtonClick);
  optionsButton.addEventListener('click', onOptionsButtonClick);
  optionsButton.addEventListener('touchstart', onOptionsButtonClick);
};

export default initStretch;
