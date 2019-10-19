import Abstract from "../abstract";
import {utils} from "../utils";
import flatpickr from "flatpickr";

export default class CardDates extends Abstract {
  constructor(dueDate, repeatingDays) {
    super();
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._toggleDateRepeatStatus();
  }

  _toggleDateRepeatStatus() {
    const dateToggleElement = this.getElement().querySelector(`.card__date-deadline-toggle`);
    const dateStatusElement = this.getElement().querySelector(`.card__date-status`);
    const repeatToggleElement = this.getElement().querySelector(`.card__repeat-toggle`);
    const repeatStatusElement = this.getElement().querySelector(`.card__repeat-status`);
    const cardDateElement = this.getElement().querySelector(`.card__date`);

    const deadlineFieldElement = this.getElement().querySelector(`.card__date-deadline`);
    const repeatFieldElement = this.getElement().querySelector(`.card__repeat-days`);

    if (dateStatusElement.innerHTML === `no`) {
      deadlineFieldElement.classList.add(`hide`);
    }

    if (repeatStatusElement.innerHTML === `no`) {
      repeatFieldElement.classList.add(`hide`);
    }

    const currentDeadline = cardDateElement.value;
    const dateToggleElementClickHandler = () => {
      deadlineFieldElement.classList.toggle(`hide`);
      dateStatusElement.innerHTML = (dateStatusElement.innerHTML === `no`) ? `yes` : `no`;
      if (dateStatusElement.innerHTML === `yes`) {
        repeatFieldElement.classList.add(`hide`);
        repeatStatusElement.innerHTML = `no`;
      }
      this._dueDate = (dateStatusElement.innerHTML === `no`) ? null : currentDeadline;
      this.getElement().querySelector(`.timestamp`).value = (dateStatusElement.innerHTML === `no`) ? null : currentDeadline;
      this.getElement().querySelector(`.card__date`).value = (dateStatusElement.innerHTML === `no`) ? null : currentDeadline;
      this.getElement().classList.remove(`card--deadline`);
    };

    const repeatToggleElementClickHandler = () => {
      repeatFieldElement.classList.toggle(`hide`);
      repeatStatusElement.innerHTML = (repeatStatusElement.innerHTML === `no`) ? `yes` : `no`;
      if (repeatStatusElement.innerHTML === `yes`) {
        deadlineFieldElement.classList.add(`hide`);
        dateStatusElement.innerHTML = `no`;
        Object.keys(this._repeatingDays).map((day) => {
          if (this._repeatingDays[day]) {
            repeatFieldElement.querySelector(`#repeat-${day}-4`).setAttribute(`checked`, `checked`);
          }
        });
        this.getElement().classList.add(`card--repeat`);
      } else {
        repeatFieldElement.querySelectorAll(`input`).forEach((input)=> {
          input.removeAttribute(`checked`);
        });
        this.getElement().classList.remove(`card--repeat`);
      }
    };

    const cardDateElementClickHandler = () => {
      flatpickr(cardDateElement, {
        altInput: true,
        allowInput: true,
        altFormat: `j F`,
        defaultDate: this._dueDate,
      });

      const cardDateElementChangeHandler = () => {
        this.getElement().classList.remove(`card--deadline`);
        if (new Date(cardDateElement.value) <= new Date()) {
          this.getElement().classList.add(`card--deadline`);
        }
        this.getElement().querySelector(`.timestamp`).value = cardDateElement.value;
      };

      cardDateElement.addEventListener(`change`, cardDateElementChangeHandler);
    };

    dateToggleElement.addEventListener(`click`, dateToggleElementClickHandler);
    repeatToggleElement.addEventListener(`click`, repeatToggleElementClickHandler);
    cardDateElement.addEventListener(`click`, cardDateElementClickHandler);
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
