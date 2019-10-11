import Abstract from "../abstract";

export default class CardColorBar extends Abstract {
  getTemplate() {
    return `<div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
             </div>`;
  }
}
