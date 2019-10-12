import Abstract from "../abstract";

export default class CardControl extends Abstract {
  constructor(task) {
    super();
    this._isArchive = task.isArchive;
    this._isFavorite = task.isFavorite;
  }

  getTemplate() {
    return `<div class="card__control">
                  <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `` : `card__btn--disabled`}">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}"
                  >
                    favorites
                  </button>
                </div>`;
  }
}
