import AbstractComponent from "../abstract-component.js";

export default class CardTextarea extends AbstractComponent {
  constructor(description = `This is example of new task, you can add picture, set date and time, add tags.`) {
    super();
    this._description = description;
  }

  getTemplate() {
    return `<div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._description}</textarea>
                  </label>
                </div>`;
  }
}
