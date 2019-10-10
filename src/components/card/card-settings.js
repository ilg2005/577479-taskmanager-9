import AbstractComponent from "../abstract-component.js";
import {utils} from "../utils.js";

export default class CardSettings extends AbstractComponent {
  constructor(dueDate = ``, repeatingDays = {}, tags = ``, color = `black`) {
    super();
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
  }

  getTemplate() {
    return `<div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
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
                            ${this._dueDate ?
    `value="${this._dueDate.getDate()} ${utils.MONTHS[this._dueDate.getMonth()]}"` : ``}/>
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
                    </div>
                  <div class="card__hashtag">
                      <div class="card__hashtag-list">
                      ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value=${tag}
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #${tag}
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`)
      .join(``)}
                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    ${utils.COLORS.map((colorToRender) => `
                      <input
                        type="radio"
                        id="color-${colorToRender}-4"
                        class="card__color-input card__color-input--${colorToRender} visually-hidden"
                        name="color"
                        value=${colorToRender}
                        ${colorToRender === this._color ? `checked` : ``}
                      />
                      <label
                        for="color-${colorToRender}-4"
                        class="card__color card__color--${colorToRender}"
                        >black</label
                      >`).join(``)}
                    </div>
                  </div>
                </div>
`;
  }
}
