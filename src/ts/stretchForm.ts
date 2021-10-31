import { loadOptions, saveOptions } from './stretchConfig';

export const initializeStretchForm = (
  container: HTMLDivElement,
  onClose: () => void,
) => {
  let options = loadOptions();
  let openTimeout;

  const open = () => {
    if (openTimeout) {
      return;
    }
    openTimeout = setTimeout(() => {
      updateDOM();
      openTimeout = null;
    }, 250);
  };

  const close = () => {
    clearTimeout(openTimeout);
    openTimeout = null;
    saveOptions(options);
    container.innerHTML = '';
  };

  const updateOptions = () => {
    options = loadOptions();
  };

  const updateDOM = () => {
    updateOptions();
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.innerText = 'Options';
    container.appendChild(title);

    const { sets } = options.routines[0];
    for (let i = 0; i < sets.length; i += 1) {
      const form = document.createElement('div');
      form.classList.add('stretch-options-set-form');

      const setTitle = document.createElement('h3');
      setTitle.innerText = `Set ${i + 1}`;
      container.appendChild(setTitle);

      const repsLabel = document.createElement('label');
      repsLabel.innerText = 'Reps';
      form.appendChild(repsLabel);
      const reps = document.createElement('input');
      reps.type = 'number';
      reps.value = sets[i].reps.toString();
      reps.addEventListener('change', () => {
        sets[i].reps = parseInt(reps.value, 10);
        saveOptions(options);
      });
      form.appendChild(reps);

      const repsDurationLabel = document.createElement('label');
      repsDurationLabel.innerText = 'Rep Duration';
      form.appendChild(repsDurationLabel);
      const repDuration = document.createElement('input');
      repDuration.type = 'number';
      repDuration.value = sets[i].repDuration.toString();
      repDuration.addEventListener('change', () => {
        options.routines[0].sets[i].repDuration = parseInt(
          repDuration.value,
          10,
        );
        saveOptions(options);
      });
      form.appendChild(repDuration);

      const switchSidesLabel = document.createElement('label');
      switchSidesLabel.innerText = 'Switch Sides';
      form.appendChild(switchSidesLabel);
      const switchSides = document.createElement('input');
      switchSides.type = 'checkbox';
      switchSides.checked = sets[i].switchSides;
      switchSides.addEventListener('change', () => {
        sets[i].switchSides = switchSides.checked;
        saveOptions(options);
      });
      form.appendChild(switchSides);

      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove Set';
      removeButton.addEventListener('click', () => {
        sets.splice(i, 1);
        saveOptions(options);
        updateDOM();
      });
      form.appendChild(removeButton);

      container.appendChild(form);
    }

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', () => {
      onClose();
    });
    container.appendChild(closeButton);

    const newButton = document.createElement('button');
    newButton.innerText = 'Add set';
    newButton.addEventListener('click', addSet);
    container.appendChild(newButton);
  };

  const addSet = () => {
    updateOptions();
    options.routines[0].sets.push({
      reps: 5,
      repDuration: 30,
      switchSides: true,
    });
    saveOptions(options);
    updateDOM();
  };

  return { openStretchForm: open, closeStretchForm: close };
};
