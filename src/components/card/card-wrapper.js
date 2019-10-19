import Abstract from "../abstract.js";

export default class CardWrapper extends Abstract {
  constructor(color, id) {
    super();
    this._color = color;
    this._id = id;
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color}" data-card="${this._id}">
                <form class="card__form" method="get">
                <div class="card__inner">
                    
                </div>
                </form>
            </article>`;
  }
}
