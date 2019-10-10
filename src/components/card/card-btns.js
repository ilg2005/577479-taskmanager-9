import Abstract from "../abstract";

export default class CardBtns extends Abstract {
  getTemplate() {
    return `<div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>`;
  }
}
