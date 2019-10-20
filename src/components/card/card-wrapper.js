import Abstract from "../abstract.js";

export default class CardWrapper extends Abstract {
  constructor(color, dueDate, repeatingDays, id) {
    super();
    this._color = color;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._id = id;
  }

  _checkRepeats() {
    return Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``;
  }

  _checkOverdue() {
    return (this._dueDate <= new Date() && this._dueDate !== null) ? `card--deadline` : ``;
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${this._checkRepeats()}  ${this._checkOverdue()}" data-card="${this._id}">
                <form class="card__form" method="get">
                <div class="card__inner">
                    
                </div>
                </form>
            </article>`;
  }
}
