(function () {
    var hour = document.querySelector(".hour");
    var min = document.querySelector(".minute");
    var sec = document.querySelector(".sec");
    var startBtn = document.querySelector(".start");
    var stopBtn = document.querySelector(".stop");
    var resetBtn = document.querySelector(".reset");
  
    var countdownTimer = null;
  
    // Start Timer Button - START
    startBtn.addEventListener("click", function () {
      if (hour.value == 0 && min.value == 0 && sec.value == 0) return;
  
      function startInterval() {
        startBtn.style.display = "none";
        stopBtn.style.display = "initial";
  
        countdownTimer = setInterval(function () {
          timer();
        }, 1000);
      }
      startInterval();
    });
    // Start Timer Button - END
    function timer() {
      // Formatting the time - START
      if (sec.value > 60) {
        min.value++;
        sec.value = parseInt(sec.value) - 59;
      }
 if (min.value > 60) {
        hour.value++;
        min.value = parseInt(min.value) - 60;
      }
      min.value = min.value > 60 ? 60 : min.value;
      // Formatting the time - END
  
      // Updating the Time - START
      if (hour.value == 0 && min.value == 0 && sec.value == 0) {
        hour.value = "";
        min.value = "";
        sec.value = "";
        stopInterval();
      } else if (sec.value != 0) {
        sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
      } else if (min.value != 0 && sec.value == 0) {
        sec.value = 59;
        min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`;
      } else if (hour.value != 0 && min.value == 0) {
        min.value = 60;
        hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
      }
      return;
      // Updating the Time - END
    }
  
    // Stop Interval Logic - START
    function stopInterval(state) {
      startBtn.innerHTML = state === "pause" ? "Continue" : "Start";
  
      stopBtn.style.display = "none";
      startBtn.style.display = "initial";
      clearInterval(countdownTimer);
    }
    // Stop Interval Logic - END
  
    // Stop Timer Button - START
    stopBtn.addEventListener("click", function () {
      stopInterval("pause");
    });
    // Start Timer Button - END
  
    // Reset Timer Button - START
    resetBtn.addEventListener("click", function () {
      hour.value = "";
      min.value = "";
      sec.value = "";
  
      stopInterval();
    });
    // Reset Timer Button - END
  })();
  let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
// stop watch code here 
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function stop() {
    clearInterval(tInterval);
    running = false;
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    minutesElement.innerText = '00';
    secondsElement.innerText = '00';
    millisecondsElement.innerText = '00';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesElement.innerText = pad(minutes);
    secondsElement.innerText = pad(seconds);
    millisecondsElement.innerText = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
