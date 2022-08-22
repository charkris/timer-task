import { Timer } from "./modules/home.js";

let btnStart = document.getElementById("start");
let btnPause = document.getElementById("pause");
let btnResume = document.getElementById("resume");
let btnReset = document.getElementById("reset");
let inpDays = document.getElementById("inp-days");
let inpHrs = document.getElementById("inp-hours");
let inpMnts = document.getElementById("inp-minutes");
let inpScnds = document.getElementById("inp-seconds");

let days, hrs, mnts, scnds, timeInSeconds, myTimerId;

btnStart.addEventListener("click", () => {
  if (myTimerId) {
    clearInterval(myTimerId);
  }
  // store input values
  days = inpDays.value;
  hrs = inpHrs.value;
  mnts = inpMnts.value;
  scnds = inpScnds.value;

  // reset input fields
  inpDays.value = null;
  inpHrs.value = null;
  inpMnts.value = null;
  inpScnds.value = null;

  console.log("aaaaaa");

  let timer = new Timer(days, hrs, mnts, scnds);
  timeInSeconds = timer.getTimeInSeconds();

  // Start Timer
  myTimerId = setInterval(() => {
    if (timeInSeconds > 0) {
      timer.disableTimeSet();
      timer.showBtnAfterStart();
      timeInSeconds--;
      timer.render(timeInSeconds);
    } else {
      clearInterval(myTimerId);
      timer.enableTimeSet();
      timer.showRestartBtns();
    }
  }, 1000);

  // Pause Timer
  btnPause.addEventListener("click", () => {
    clearInterval(myTimerId);
    timer.showPauseBtn();
  });

  // Resume Timer
  btnResume.addEventListener("click", () => {
    if (myTimerId) {
      clearInterval(myTimerId);
    }
    myTimerId = setInterval(() => {
      if (timeInSeconds >= 0) {
        timer.render(timeInSeconds);
        timeInSeconds--;
      } else {
        clearInterval(myTimerId);
      }
    }, 1000);

    timer.showResumeBtn();
  });

  // Reset Timer
  btnReset.addEventListener("click", () => {
    clearInterval(myTimerId);
    timer.render(0);
    timer.enableTimeSet();
    timer.showRestartBtns();
  });
});
