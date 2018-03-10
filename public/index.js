(() => {
  const startButton = document.getElementById('start-timer');
  const mainIntervalInput = document.getElementById('main-interval-input');
  const numIntervalInput = document.getElementById('num-interval-input');
  const numIntervalDisplay = document.getElementById('num-intervals-remaining');
  const timeDisplay = document.getElementById('time');
  
  let mainInterval = 5; // seconds
  let numInterval = 2;
  
  const timer = new Timer();

  const setInitialState = () => {
    mainIntervalInput.value = mainInterval;
    numIntervalInput.value = numInterval;
    timeDisplay.innerText = mainInterval;
    numIntervalDisplay.innerText = numInterval;
  };

  const updateMainInterval = () => {
    mainInterval = mainIntervalInput.value;
    timeDisplay.innerText = mainInterval;
  };

  const updateNumInterval = () => {
    numInterval = numIntervalInput.value;
    numIntervalDisplay.innerText = numInterval;
  };

  const startCountdown = () => {
    timer.start({countdown: true, startValues: {seconds: parseInt(mainInterval)}});

    timer.addEventListener('secondsUpdated', (e) => {
        timeDisplay.innerText = timer.getTimeValues().seconds;
    });

    timer.addEventListener('targetAchieved', (e) => {
        timeDisplay.innerText = '0';
        numInterval--;
        numIntervalDisplay.innerText = numInterval;
        if (numInterval > 0) {
          timer.start({countdown: true, startValues: {seconds: parseInt(mainInterval)}});
        }
    });
  };

  setInitialState();
  startButton.addEventListener('click', startCountdown);
  mainIntervalInput.addEventListener('click', updateMainInterval);
  mainIntervalInput.addEventListener('input', updateMainInterval);
  numIntervalInput.addEventListener('click', updateNumInterval);
  numIntervalInput.addEventListener('input', updateNumInterval);
})();