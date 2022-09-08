import { Base } from "../common/base.js";

export class Timer extends Base {
  constructor(dd, hh, mm, ss) {
    super();
    this.dd = dd;
    this.hh = hh;
    this.mm = mm;
    this.ss = ss;
  }

  getTimeInSeconds() {
    return this.dd * 86400 + this.hh * 3600 + this.mm * 60 + +this.ss;
  }

  _getTimefromSeconds(time) {
    let day = Math.trunc(time / 86400);
    let hour = Math.trunc(
      time > 86400 ? (time - day * 86400) / 3600 : time / 3600
    );
    let minute = Math.trunc(time > 3600 ? (time % 3600) / 60 : time / 60);
    let second = time % 60;

    day = this.checkDigit(day);
    hour = this.checkDigit(hour);
    minute = this.checkDigit(minute);
    second = this.checkDigit(second);

    return `                
        <span class="days" id="daysId">${day}</span> <span class="divider">:</span>
        <span class="hours" id="hoursId">${hour}</span> <span class="divider">:</span>
        <span class="minutes" id="minutesId">${minute}</span> <span class="divider">:</span>
        <span class="seconds" id="secondsId">${second}</span>`;
  }

  render(tempTime) {
    this.setContent("display-time", this._getTimefromSeconds(tempTime));
  }

  changeFields(days, hours, minutes, seconds, isDisable) {
    if (isDisable === true) {
      days.setAttribute("disabled", true);
      hours.setAttribute("disabled", true);
      minutes.setAttribute("disabled", true);
      seconds.setAttribute("disabled", true);
    } else if (isDisable === false) {
      days.removeAttribute("disabled");
      hours.removeAttribute("disabled");
      minutes.removeAttribute("disabled");
      seconds.removeAttribute("disabled");
    } else if (isDisable === null) {
      days.value = null;
      hours.value = null;
      minutes.value = null;
      seconds.value = null;
    }
  }

  displayButtons(start, pause, resume, reset, key) {
    if (key === "start") {
      start.classList.add("hidden");
      pause.classList.remove("hidden");
      reset.classList.remove("hidden");
    } else if (key === "pause") {
      pause.classList.add("hidden");
      resume.classList.remove("hidden");
      reset.classList.remove("hidden");
    } else if (key === "resume") {
      pause.classList.remove("hidden");
      resume.classList.add("hidden");
      reset.classList.remove("hidden");
    } else if (key === "reset") {
      start.classList.remove("hidden");
      pause.classList.add("hidden");
      resume.classList.add("hidden");
      reset.classList.add("hidden");
    }
  }
}
