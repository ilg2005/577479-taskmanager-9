import {getMenuMarkup} from "./components/menu.js";
import {getSearchFieldMarkup} from "./components/searchfield.js";
import {getFiltersMarkup} from "./components/filter.js";
import {getTaskboardContainerMarkup} from "./components/taskboard-container.js";
import {getCardMarkup} from "./components/card.js";
import {getLoadMoreBtnMarkup} from "./components/load-more-btn.js";
import {TASKS} from "./components/data.js";
import {FILTERS} from "./components/filters-count.js";
import {getCardEditFormMarkup} from "./components/edit-task.js";


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

const [firstTask, ...restTasks] = TASKS;

renderElement(tasksContainerElement, getCardEditFormMarkup(firstTask.color, firstTask.repeatingDays, firstTask.description, firstTask.dueDate));

for (const task of restTasks) {
  renderElement(tasksContainerElement, getCardMarkup(task.color, task.repeatingDays, task.description, task.dueDate, task.tags));
}

renderElement(taskboardContainerElement, getLoadMoreBtnMarkup());
