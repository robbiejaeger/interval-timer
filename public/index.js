(() => {
  const startButton = document.getElementById('start');
  const pauseButton = document.getElementById('pause');
  const resetButton = document.getElementById('reset');
  const mainIntervalDurationInput = document.getElementById('main-interval-input');
  const subIntervalDurationInput = document.getElementById('sub-interval-input');
  const numIntervalInput = document.getElementById('num-interval-input');
  const numIntervalDisplay = document.getElementById('num-intervals-remaining');
  const timeDisplay = document.getElementById('time');
  
  let mainIntervalDuration = 5; // seconds
  let subIntervalDuration = 2; // seconds
  let numInterval = 2;
  let intervalCounter = numInterval * 2;
  let currentCountdownDuration = null;
  
  const timer = new Timer();

  const setInitialState = () => {
    mainIntervalDurationInput.value = mainIntervalDuration;
    subIntervalDurationInput.value = subIntervalDuration;
    timeDisplay.innerText = mainIntervalDuration;
    numIntervalInput.value = numInterval;
    numIntervalDisplay.innerText = numInterval;
  };

  const updateMainIntervalDuration = () => {
    mainIntervalDuration = mainIntervalDurationInput.value;
    timeDisplay.innerText = mainIntervalDuration;
  };

  const updateSubIntervalDuration = () => {
    subIntervalDuration = subIntervalDurationInput.value;
  };

  const updateNumInterval = () => {
    numInterval = numIntervalInput.value;
    numIntervalDisplay.innerText = numInterval;
  };

  const determineIntervalToUse = () => {
    if (intervalCounter % 2 === 0) {
      currentCountdownDuration = mainIntervalDuration;
      numInterval--;
    } else {
      currentCountdownDuration = subIntervalDuration;
    }
    intervalCounter--;
  };

  const resetCountdown = () => {
    timer.stop();
    numInterval = numIntervalInput.value;
    numIntervalDisplay.innerText = numInterval;
    timeDisplay.innerText = mainIntervalDuration;
    intervalCounter = numIntervalInput.value * 2;
  };

  const pauseCountdown = () => {
    timer.pause();
  };

  const startCountdown = () => {
    determineIntervalToUse();
    timer.start({countdown: true, startValues: {seconds: parseInt(currentCountdownDuration)}});
  };

  timer.addEventListener('secondsUpdated', () => {
    timeDisplay.innerText = timer.getTimeValues().seconds;
  });

  timer.addEventListener('targetAchieved', () => {
      numIntervalDisplay.innerText = numInterval;
      if (numInterval > 0) {
        startCountdown();
        timeDisplay.innerText = currentCountdownDuration;
      } else {
        timeDisplay.innerText = '0';
      }
  });

  setInitialState();
  startButton.addEventListener('click', startCountdown);
  pauseButton.addEventListener('click', pauseCountdown);
  resetButton.addEventListener('click', resetCountdown);
  mainIntervalDurationInput.addEventListener('click', updateMainIntervalDuration);
  mainIntervalDurationInput.addEventListener('input', updateMainIntervalDuration);
  subIntervalDurationInput.addEventListener('click', updateSubIntervalDuration);
  subIntervalDurationInput.addEventListener('input', updateSubIntervalDuration);
  numIntervalInput.addEventListener('click', updateNumInterval);
  numIntervalInput.addEventListener('input', updateNumInterval);
})();