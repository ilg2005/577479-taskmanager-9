import AbstractComponent from "./abstract-component";

export default class LoadMoreBtn extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

