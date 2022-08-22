export class Base {
  constructor() {}
  setContent(id, value) {
    let elem = document.getElementById(id);
    elem.innerHTML = value;
  }
}
