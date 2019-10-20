import Abstract from "../abstract";

export default class CardControl extends Abstract {
  constructor(isArchive, isFavorite, mode) {
    super();
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
    this._mode = mode;
    this._toggleArchived();
    this._toggleFavorites();
  }

  _toggleArchived() {
    const archiveBtnElement = this.getElement().querySelector(`.card__btn--archive`);
    const archiveBtnElementClickHandler = () => {
      archiveBtnElement.classList.toggle(`card__btn--disabled`);
      this._isArchive = (!archiveBtnElement.classList.contains(`card__btn--disabled`));
    };
    archiveBtnElement.addEventListener(`click`, archiveBtnElementClickHandler);
  }

  _toggleFavorites() {
    const favoritesBtnElement = this.getElement().querySelector(`.card__btn--favorites`);
    const favoritesBtnElementClickHandler = () => {
      favoritesBtnElement.classList.toggle(`card__btn--disabled`);
      this._isFavorite = (!favoritesBtnElement.classList.contains(`card__btn--disabled`));
    };
    favoritesBtnElement.addEventListener(`click`, favoritesBtnElementClickHandler);
  }

  getTemplate() {
    return `<div class="card__control">
${this._mode !== `edit` ?
    `<button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>` : ``}
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
