import Abstract from "../abstract.js";

export default class CardWrapper extends Abstract {

  getTemplate() {
    return `<article class="card card--edit card--black">
                <form class="card__form" method="get">
                <div class="card__inner">
                    
                </div>
                </form>
            </article>`;
  }
}
