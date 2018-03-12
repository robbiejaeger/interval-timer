(() => {
  const startButton = document.getElementById('start-timer');
  const mainIntervalDurationInput = document.getElementById('main-interval-input');
  const numIntervalInput = document.getElementById('num-interval-input');
  const numIntervalDisplay = document.getElementById('num-intervals-remaining');
  const timeDisplay = document.getElementById('time');
  
  let mainIntervalDuration = 5; // seconds
  let numInterval = 2;
  
  const timer = new Timer();

  const setInitialState = () => {
    mainIntervalDurationInput.value = mainIntervalDuration;
    timeDisplay.innerText = mainIntervalDuration;
    numIntervalInput.value = numInterval;
    numIntervalDisplay.innerText = numInterval;
  };

  const updateMainIntervalDuration = () => {
    mainIntervalDuration = mainIntervalDurationInput.value;
    timeDisplay.innerText = mainIntervalDuration;
  };

  const updateNumInterval = () => {
    numInterval = numIntervalInput.value;
    numIntervalDisplay.innerText = numInterval;
  };

  const startCountdown = () => {
    timer.start({countdown: true, startValues: {seconds: parseInt(mainIntervalDuration)}});

    timer.addEventListener('secondsUpdated', () => {
        timeDisplay.innerText = timer.getTimeValues().seconds;
    });

    timer.addEventListener('targetAchieved', () => {
        numInterval--;
        numIntervalDisplay.innerText = numInterval;
        if (numInterval > 0) {
          timer.start({countdown: true, startValues: {seconds: parseInt(mainIntervalDuration)}});
          timeDisplay.innerText = mainIntervalDuration;
        } else {
          timeDisplay.innerText = '0';
        }
    });
  };

  setInitialState();
  startButton.addEventListener('click', startCountdown);
  mainIntervalDurationInput.addEventListener('click', updateMainIntervalDuration);
  mainIntervalDurationInput.addEventListener('input', updateMainIntervalDuration);
  numIntervalInput.addEventListener('click', updateNumInterval);
  numIntervalInput.addEventListener('input', updateNumInterval);
})();