import Abstract from "./abstract.js";
import CardControl from "./card/card-control.js";
import CardColorBar from "./card/card-color-bar.js";
import CardTextarea from "./card/card-textarea.js";
import CardSettings from "./card/card-settings.js";
import CardBtns from "./card/card-btns.js";

export default class TaskAdd extends Abstract {
  constructor() {
    super();
    this._cardControl = new CardControl();
    this._cardColorBar = new CardColorBar();
    this._cardTextarea = new CardTextarea();
    this._cardSettings = new CardSettings();
    this._cardBtns = new CardBtns();
  }

  getTemplate() {
    return `<article class="card card--edit card--black">
            <form class="card__form" method="get">
              <div class="card__inner">
              ${this._cardControl.getTemplate()}
              ${this._cardColorBar.getTemplate()}
              ${this._cardTextarea.getTemplate()}
              ${this._cardSettings.getTemplate()}
              ${this._cardBtns.getTemplate()}
              </div>
            </form>
          </article>`;
  }
}
