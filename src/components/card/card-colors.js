import Abstract from "../abstract.js";
import {utils} from "../utils.js";

export default class CardColors extends Abstract {
  constructor(task) {
    super();
    this._color = task.color;
  }

  getTemplate() {
    return `<div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    ${utils.COLORS.map((colorToRender) => `
                      <input
                        type="radio"
                        id="color-${colorToRender}-4"
                        class="card__color-input card__color-input--${colorToRender} visually-hidden"
                        name="color"
                        value=${colorToRender}
                        ${colorToRender === this._color ? `checked` : ``}
                      />
                      <label
                        for="color-${colorToRender}-4"
                        class="card__color card__color--${colorToRender}"
                        >black</label
                      >`).join(``)}
                    </div>
               </div>`;
  }
}
