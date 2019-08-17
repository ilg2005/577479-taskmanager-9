import {getMenuMarkup} from "./components/menu.js";
import {getSearchFieldMarkup} from "./components/searchfield.js";
import {getFiltersMarkup} from "./components/filter.js";
import {getTaskboardContainerMarkup} from "./components/taskboard-container.js";
import {getCardEditFormMarkup} from "./components/card-edit-form.js";
import {getCardMarkup} from "./components/card.js";
import {getLoadMoreBtnMarkup} from "./components/load-more-btn.js";
import {TASKS} from "./components/data.js";
import {FILTERS} from "./components/filters-count.js";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 0; i < renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const mainElement = document.querySelector(`.main`);
const menuContainerElement = document.querySelector(`.main__control`);

renderElement(menuContainerElement, getMenuMarkup());
renderElement(mainElement, getSearchFieldMarkup());
renderElement(mainElement, getFiltersMarkup(FILTERS));
renderElement(mainElement, getTaskboardContainerMarkup());

const taskboardContainerElement = document.querySelector(`.board`);
const tasksContainerElement = taskboardContainerElement.querySelector(`.board__tasks`);

renderElement(tasksContainerElement, getCardEditFormMarkup());

for (const task of TASKS) {
  renderElement(tasksContainerElement, getCardMarkup(task.color, task.repeatingDays, task.description, task.dueDate, task.tags));
}

renderElement(taskboardContainerElement, getLoadMoreBtnMarkup());
