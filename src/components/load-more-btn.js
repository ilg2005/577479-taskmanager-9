import {utils} from "./utils";

export default class LoadMoreBtn {
  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

