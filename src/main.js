import {getMenuMarkup} from "./components/menu.js";
import {getSearchFieldMarkup} from "./components/searchfield.js";
import {getFiltersMarkup} from "./components/filter.js";
import {getTaskboardContainerMarkup} from "./components/taskboard-container.js";
import {TASKS} from "./components/data.js";
import {FILTERS} from "./components/filters-count.js";
import {getCardEditFormMarkup} from "./components/edit-task.js";
import {getCardMarkup} from "./components/card.js";
import {getLoadMoreBtnMarkup} from "./components/load-more-btn.js";
import {utils} from "./components/utils.js";

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

const [firstTask, ...initialRestTasks] = TASKS;

renderElement(tasksContainerElement, getCardEditFormMarkup(firstTask.color, firstTask.repeatingDays, firstTask.description, firstTask.dueDate, firstTask.tags));
renderElement(taskboardContainerElement, getLoadMoreBtnMarkup());

const tasksLoaderElement = taskboardContainerElement.querySelector(`.load-more`);

const TASKS_TO_SHOW = 8;
let restTasksArray = initialRestTasks;
const tasksLoaderElementClickHandler = () => showTasks(restTasksArray);
const showTasks = (currentTasksArray) => {
  if (currentTasksArray.length > TASKS_TO_SHOW) {
    restTasksArray = currentTasksArray.splice(TASKS_TO_SHOW);
    for (const task of currentTasksArray) {
      renderElement(tasksContainerElement, getCardMarkup(task.color, task.repeatingDays, task.description, task.dueDate, task.tags));
    }
    tasksLoaderElement.addEventListener(`click`, tasksLoaderElementClickHandler);
  } else {
    for (const task of currentTasksArray) {
      renderElement(tasksContainerElement, getCardMarkup(task.color, task.repeatingDays, task.description, task.dueDate, task.tags));
    }
    utils.hideElement(tasksLoaderElement);
    tasksLoaderElement.removeEventListener(`click`, tasksLoaderElementClickHandler);
  }
};

showTasks(restTasksArray);


