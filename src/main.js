import {getMenuMarkup} from "./components/menu.js";
import {getSearchFieldMarkup} from "./components/searchfield.js";
import {getFiltersMarkup} from "./components/filter.js";
import {getTaskboardContainerMarkup} from "./components/taskboard-container.js";
import {getCardEditFormMarkup} from "./components/card-edit-form.js";
import {getCardMarkup} from "./components/card.js";
import {getLoadMoreBtnMarkup} from "./components/load-more-btn.js";
import {getData} from "./components/data.js";

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 0; i < renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const mainElement = document.querySelector(`.main`);
const menuContainerElement = document.querySelector(`.main__control`);

renderElement(menuContainerElement, getMenuMarkup());
renderElement(mainElement, getSearchFieldMarkup());
renderElement(mainElement, getFiltersMarkup());
renderElement(mainElement, getTaskboardContainerMarkup());

const taskboardContainerElement = document.querySelector(`.board`);
const tasksContainerElement = taskboardContainerElement.querySelector(`.board__tasks`);

renderElement(tasksContainerElement, getCardEditFormMarkup());

const TASK_COUNT_TO_RENDER = 8;

const TASKS = [];
for (let i = 0; i < TASK_COUNT_TO_RENDER; i++) {
  let task = getData();
  TASKS.push(task);
  renderElement(tasksContainerElement, getCardMarkup(task.color, task.description, task.dueDate, task.tags));
}

renderElement(taskboardContainerElement, getLoadMoreBtnMarkup());
