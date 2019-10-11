import Abstract from "../abstract.js";

export default class CardWrapper extends Abstract {
  constructor(task = []) {
    super();
    this._task = task;
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._task.color}">
                <form class="card__form" method="get">
                <div class="card__inner">
                    
                </div>
                </form>
            </article>`;
  }
}
