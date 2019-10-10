import AbstractComponent from "../abstract-component.js";

export default class CardControl extends AbstractComponent {
  getTemplate() {
    return `
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--archive card__btn--disabled">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>`;
  }
}
