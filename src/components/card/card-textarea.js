import Abstract from "../abstract";

export default class CardTextarea extends Abstract {
  constructor(description) {
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
