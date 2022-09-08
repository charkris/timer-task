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
  // store input values
  days = inpDays.value;
  hrs = inpHrs.value;
  mnts = inpMnts.value;
  scnds = inpScnds.value;

  let timer = new Timer(days, hrs, mnts, scnds);
  timeInSeconds = timer.getTimeInSeconds();

  //reset input fields
  timer.changeFields(inpDays, inpHrs, inpMnts, inpScnds, null);

  // Start Timer
  myTimerId = setInterval(() => {
    if (timeInSeconds > 0) {
      // disable time input fields
      timer.changeFields(inpDays, inpHrs, inpMnts, inpScnds, true);
      // buttons appearance after start
      timer.displayButtons(btnStart, btnPause, btnResume, btnReset, "start");
      timeInSeconds--;
      timer.render(timeInSeconds);
    } else {
      clearInterval(myTimerId);
      timer.changeFields(inpDays, inpHrs, inpMnts, inpScnds, false);
      timer.displayButtons(btnStart, btnPause, btnResume, btnReset, "reset");
    }
  }, 1000);

  // Pause Timer
  btnPause.addEventListener("click", () => {
    clearInterval(myTimerId);
    timer.displayButtons(btnStart, btnPause, btnResume, btnReset, "pause");
  });

  // Resume Timer
  btnResume.addEventListener("click", () => {
    if (myTimerId) {
      clearInterval(myTimerId);
    }
    myTimerId = setInterval(() => {
      if (timeInSeconds > 0) {
        timeInSeconds--;
        timer.render(timeInSeconds);
      } else {
        clearInterval(myTimerId);
      }
    }, 1000);

    timer.displayButtons(btnStart, btnPause, btnResume, btnReset, "resume");
  });

  // Reset Timer
  btnReset.addEventListener("click", () => {
    clearInterval(myTimerId);
    timer.render(0);
    timer.changeFields(inpDays, inpHrs, inpMnts, inpScnds, false);
    timer.displayButtons(btnStart, btnPause, btnResume, btnReset, "reset");
  });
});
