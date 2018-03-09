(() => {
  const interval = 5; // seconds
  const startButton = document.getElementById('start-timer');
  const timeDisplay = document.getElementById('time');

  const getTimeRemaining = (endTime) => {
    const timeRemaining = endTime - (new Date()).getTime();
    return timeRemaining;
  };

  const startCountdown = () => {
    const deadline = (new Date()).getTime() + interval*1000;
    const intervalID = setInterval(() => {
      let timeRemaining = getTimeRemaining(deadline);
      let secondsRemaining = Math.floor( (timeRemaining/1000) % 60 );
      timeDisplay.innerText = secondsRemaining;

      console.log(timeRemaining)
      if (timeRemaining <= 0) {
        clearInterval(intervalID);
      }
    }, 100);
  };

  timeDisplay.innerText = interval;
  startButton.addEventListener('click', startCountdown);
})();