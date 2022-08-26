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

  disableTimeSet() {
    document.getElementById("inp-days").setAttribute("disabled", true);
    document.getElementById("inp-hours").setAttribute("disabled", true);
    document.getElementById("inp-minutes").setAttribute("disabled", true);
    document.getElementById("inp-seconds").setAttribute("disabled", true);
  }

  enableTimeSet() {
    document.getElementById("inp-days").removeAttribute("disabled");
    document.getElementById("inp-hours").removeAttribute("disabled");
    document.getElementById("inp-minutes").removeAttribute("disabled");
    document.getElementById("inp-seconds").removeAttribute("disabled");
  }

  resetInpFields() {
    document.getElementById("inp-days").value = null;
    document.getElementById("inp-hours").value = null;
    document.getElementById("inp-minutes").value = null;
    document.getElementById("inp-seconds").value = null;
  }

  showRestartBtns() {
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("resume").classList.add("hidden");
    document.getElementById("reset").classList.add("hidden");
  }

  showPauseBtn() {
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("resume").classList.remove("hidden");
    document.getElementById("reset").classList.remove("hidden");
  }

  showResumeBtn() {
    document.getElementById("pause").classList.remove("hidden");
    document.getElementById("resume").classList.add("hidden");
    document.getElementById("reset").classList.remove("hidden");
  }

  showBtnAfterStart() {
    document.getElementById("start").classList.add("hidden");
    document.getElementById("pause").classList.remove("hidden");
    document.getElementById("reset").classList.remove("hidden");
  }
}
