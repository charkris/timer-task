export class Base {
  constructor() {}

  checkDigit(val) {
    if (val < 10) {
      val = "0" + val;
    }
    return val;
  }

  setContent(id, value) {
    let elem = document.getElementById(id);
    elem.innerHTML = value;
  }
}
