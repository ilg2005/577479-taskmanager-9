import {getMenuMarkup} from "./components/menu.js";
import {getSearchFieldMarkup} from "./components/searchfield.js";
import {getFiltersMarkup} from "./components/filter.js";
import {getTaskboardContainerMarkup} from "./components/taskboard-container.js";
import {TASKS} from "./components/data.js";
import {FILTERS} from "./components/filters-count.js";
import TaskEdit from "./components/task-edit.js";
import Task from "./components/task.js";
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

const taskEdit = new TaskEdit(firstTask);
utils.render(tasksContainerElement, taskEdit.getElement(), `beforeend`);


renderElement(taskboardContainerElement, getLoadMoreBtnMarkup());

const tasksLoaderElement = taskboardContainerElement.querySelector(`.load-more`);

const TASKS_TO_SHOW = 8;
let restTasksArray = initialRestTasks;
const tasksLoaderElementClickHandler = () => showTasks(restTasksArray);
const showTasks = (currentTasksArray) => {
  if (currentTasksArray.length > TASKS_TO_SHOW) {
    restTasksArray = currentTasksArray.splice(TASKS_TO_SHOW);
    for (const task of currentTasksArray) {
      const taskInstance = new Task(task);
      utils.render(tasksContainerElement, taskInstance.getElement(), `beforeend`);
    }
    tasksLoaderElement.addEventListener(`click`, tasksLoaderElementClickHandler);
  } else {
    for (const task of currentTasksArray) {
      const taskInstance = new Task(task);
      utils.render(tasksContainerElement, taskInstance.getElement(), `beforeend`);
    }
    utils.hideElement(tasksLoaderElement);
    tasksLoaderElement.removeEventListener(`click`, tasksLoaderElementClickHandler);
  }
};

showTasks(restTasksArray);


