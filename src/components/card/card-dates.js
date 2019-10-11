import Abstract from "../abstract.js";
import {utils} from "../utils.js";

export default class CardDates extends Abstract {
  constructor(dueDate = ``, repeatingDays = {}) {
    super();
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
  }

  getTemplate() {
    return `<div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                        <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            ${this._dueDate ? `value="${this._dueDate.getDate()} ${utils.MONTHS[this._dueDate.getMonth()]}"` : ``}/>
                          <input
                            class="timestamp"
                            type="hidden"
                            placeholder=""
                            name="timestamp"
                            value="${this._dueDate}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                        ${Object.keys(this._repeatingDays).map((day) => `
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${day}-4"
                            name="repeat"
                            value=${day}
                            ${this._repeatingDays[day] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-${day}-4"
                            >${day}</label
                          >`).join(``)}
                        </div>
                      </fieldset>
                    </div>`;
  }
}
