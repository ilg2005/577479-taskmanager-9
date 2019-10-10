import Abstract from "./abstract.js";

export default class Sort extends Abstract {
  getTemplate() {
    return `<div class="board__filter-list">
          <a href="#" data-sort="default" class="board__filter sort__button--active">SORT BY DEFAULT</a>
          <a href="#" data-sort="dateUp" class="board__filter">SORT BY DATE up</a>
          <a href="#" data-sort="dateDown" class="board__filter">SORT BY DATE down</a>
        </div>`;
  }
}
